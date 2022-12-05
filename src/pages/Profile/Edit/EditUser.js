import { memo, useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import classNames from 'classnames';

import style from './EditUser.module.scss';

import MyButton from '@/components/Button/MyButton';
import FormInput from '@/components/FormInput';
import Modal from '@/components/Modal';

import { useCheckForm } from '@/use/Forms';
import { handleImageBase64 } from '@/use/ConvertBase64';
import { handleApiEditUser } from '@/services/apis';

function EditUser() {
    const { t } = useTranslation();

    const [valueInput, setValueInput] = useState({
        userName: '',
        email: '',
        birthday: '',
        avatar: '',
        avatarPreview: '',
        address: '',
    });
    const [avatarPreview, setAvatarPreview] = useState(null);
    // const [preview, setPreview] = useState(
    //     'https://previews.123rf.com/images/scrap4vec/scrap4vec2005/scrap4vec200500184/148077898-logo-design-of-student-child-or-people-with-book-template-in-creative-shape-isolate-vector-illustrat.jpg',
    // );
    const [preview, setPreview] = useState(null);
    const [isShowModal, setIsShowMdal] = useState(false);

    const requires = [
        {
            id: 1,
            name: 'email',
            require: true,
            length: 6,
            value: valueInput.email.trim(),
        },
        {
            id: 2,
            name: 'userName',
            require: true,
            length: 6,
            value: valueInput.userName.trim(),
        },
        {
            id: 3,
            name: 'avatar',
            require: true,
            length: 6,
            value: valueInput.avatar,
        },
        {
            id: 4,
            name: 'birthday',
            require: true,
            length: 6,
            value: valueInput.birthday,
        },
        {
            id: 5,
            name: 'address',
            require: true,
            length: 6,
            value: valueInput.address,
        },
    ];

    const [errors, setErrors] = useState({
        email: '',
        userName: '',
        avatar: '',
        address: '',
    });
    const [success, setSuccess] = useState(false);
    const [resultValidate, setResultValidate] = useState(null);
    const classModal = classNames({
        [style.previewImages]: isShowModal,
        [style.images]: true,
    });
    const handleEditUser = (e) => {
        e.preventDefault();
        // eslint-disable-next-line react-hooks/rules-of-hooks
        setResultValidate(useCheckForm(requires));
    };
    useEffect(() => {
        if (resultValidate) {
            resultValidate.forEach((element) => {
                /// có lối
                if (element) {
                    if (element.errorMessage) {
                        console.log('set state error');
                        // console.log('element', Object.values(element));
                        setErrors((errors) => ({ ...errors, [element.name]: element.errorMessage }));
                    }
                }
            });
        }
        if (resultValidate) {
            const error = resultValidate.every(checkError);
            function checkError(element) {
                return element.errorMessage.length === 0;
            }
            console.log('set state success', error);
            setSuccess(error);
        }
    }, [resultValidate]);
    useEffect(() => {
        if (success) {
            try {
                (async () => {
                    // console.log('valueInput', valueInput);
                    const response = await handleApiEditUser(valueInput);
                    console.log('response', response);
                })();
            } catch (error) {
                console.log(error);
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [success]);

    useEffect(() => {
        if (avatarPreview) {
            const objectUrl = URL.createObjectURL(avatarPreview);
            setPreview(objectUrl);
            return () => URL.revokeObjectURL(objectUrl);
        }
    }, [avatarPreview]);

    const handleOnChangeInput = async (data) => {
        setValueInput({ ...valueInput, [data.name]: data.value });
        setErrors((errors) => ({ ...errors, [data.name]: '' }));
        if (data.name === 'avatar') {
            setAvatarPreview(data.value);
            const file = data.value;
            const base64 = await handleImageBase64.getBase64(file);
            setValueInput({ ...valueInput, [data.name]: base64 });
        }
    };

    const handlePreviewModalImage = (e) => {
        e.stopPropagation();
        setIsShowMdal(true);
    };
    const handleShowHideModal = () => {
        setIsShowMdal(false);
    };

    return (
        <>
            <div className={style.formEditWapper}>
                <form>
                    <div className={style.formGroup}>
                        <FormInput
                            label="Full Name"
                            placeholder="Full Name.."
                            value={valueInput.userName}
                            name="userName"
                            onChangeInput={handleOnChangeInput}
                            errorMessage={errors.userName}
                            invalid={errors.userName}
                        ></FormInput>
                        <FormInput
                            type="email"
                            label="Email"
                            value={valueInput.email}
                            name="email"
                            onChangeInput={handleOnChangeInput}
                            placeholder="Email..."
                            errorMessage={errors.email}
                            invalid={errors.email}
                        ></FormInput>
                        <FormInput
                            label="Address"
                            value={valueInput.address}
                            name="address"
                            onChangeInput={handleOnChangeInput}
                            placeholder="Address..."
                            errorMessage={errors.address}
                            invalid={errors.address}
                        ></FormInput>
                        <FormInput
                            label="Birthday"
                            name="birthday"
                            onChangeInput={handleOnChangeInput}
                            placeholder="birthday"
                            type="date"
                            errorMessage={errors.birthday}
                            invalid={errors.birthday}
                        ></FormInput>
                        <FormInput
                            label="Avatar"
                            name="avatar"
                            onChangeInput={handleOnChangeInput}
                            placeholder="avatar"
                            type="file"
                            errorMessage={errors.avatar}
                            invalid={errors.avatar}
                        ></FormInput>
                        {true && (
                            <Modal isShowModal={isShowModal} onShowHideModal={handleShowHideModal}>
                                {preview && (
                                    <img
                                        className={classModal}
                                        src={preview}
                                        alt="preview"
                                        width={100}
                                        height={100}
                                        onClick={handlePreviewModalImage}
                                    />
                                )}
                            </Modal>
                        )}
                    </div>
                    <MyButton hanldeClick={handleEditUser} success medium>
                        {t('Profile.edit')}
                    </MyButton>
                </form>
            </div>
        </>
    );
}

export default memo(EditUser);
