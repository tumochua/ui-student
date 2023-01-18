import { useEffect, useMemo, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import classNames from 'classnames';
import style from './ManageEditUsers.module.scss';
import { apiManageGetUserById, apiManageEditUser } from '@/services/apis';
import FormInput from '@/components/FormInput';
import MyButton from '@/components/Button/MyButton';
import MySelect from '@/components/Selects/MySelect';
import { optionClass, ROLEDATA } from '@/Data';
import Modal from '@/components/Modal';
import { handleImageBase64 } from '@/use/ConvertBase64';
import { handleGender } from '@/use/Gender';

function ManageEditUsers() {
    const { t, i18n } = useTranslation();
    const routerData = useLocation();
    const [userIdRouter, setUserIdRouter] = useState(null);
    const [valueInput, setValueInput] = useState({
        roleId: '',
        userId: '',
        userName: '',
        email: '',
        birthday: '',
        avatar: '',
        avatarPreview: '',
        address: '',
        mobile: '',
        gender: '',
        className: '',
        userDad: '',
        userMother: '',
        mobileContact: '',
    });
    const [isShowModal, setIsShowMdal] = useState(false);
    const [preview, setPreview] = useState(null);
    const classModal = classNames({
        [style.previewImages]: isShowModal,
        [style.images]: true,
    });
    const [apiGenderData, setApiGenderData] = useState(null);
    const [avatarPreview, setAvatarPreview] = useState(null);
    const optionGender = [
        {
            id: 1,
            value: 'M',
            name: t('Profile.male'),
        },
        {
            id: 2,
            value: 'F',
            name: t('Profile.female'),
        },
        {
            id: 3,
            value: 'O',
            name: t('Profile.other'),
            // selected: true,
        },
    ];
    // const [userIdRouter, setUserIdRouter] = useState(routerData.state?.id);

    useEffect(() => {
        if (userIdRouter) {
            (async () => {
                const response = await apiManageGetUserById(userIdRouter);
                const {
                    address,
                    dob,
                    fullName,
                    email,
                    genderData: { valueEn, valueVi, KeyMap },
                    image,
                    mobile,
                    classId,
                    parentData: { fullNameFather, fullNameMommy, ...rest },
                    roleId,
                } = response.data.data;
                setApiGenderData({ valueEn, valueVi });
                // console.log(response.data.data);
                setValueInput((prevState) => {
                    return {
                        ...prevState,
                        userName: fullName,
                        userId: userIdRouter,
                        email: email,
                        birthday: dob,
                        avatar: image,
                        mobile: mobile,
                        address: address,
                        gender: KeyMap,
                        className: classId,
                        userDad: fullNameFather,
                        userMother: fullNameMommy,
                        mobileContact: rest.mobile,
                        roleId: roleId,
                    };
                });
            })();
        }
    }, [userIdRouter]);
    useEffect(() => {
        if (valueInput) {
            // console.log(valueInput);
        }
    });
    useEffect(() => {
        if (avatarPreview) {
            const objectUrl = URL.createObjectURL(avatarPreview);
            setPreview(objectUrl);
            return () => URL.revokeObjectURL(objectUrl);
        }
    }, [avatarPreview]);
    useEffect(() => {
        if (apiGenderData) {
            handleGender(apiGenderData, i18n.language);
        }
    }, [apiGenderData, i18n.language]);

    useMemo(() => {
        if (routerData) {
            setUserIdRouter(routerData.state?.id);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userIdRouter]);

    const handleOnChangeInput = async (data) => {
        setValueInput({ ...valueInput, [data.name]: data.value });
        // setFamily({ ...family, [data.name]: data.value });
        if (data.name === 'avatar') {
            setAvatarPreview(data.value);
            const file = data.value;
            const base64 = await handleImageBase64.getBase64(file);
            setValueInput({ ...valueInput, [data.name]: base64 });
        }
    };

    const handleChangeGender = (gender) => {
        setValueInput((prevState) => {
            return {
                ...prevState,
                gender: gender,
            };
        });
    };

    const handleOnchangeClass = (className) => {
        setValueInput((prevState) => {
            return {
                ...prevState,
                className: className,
            };
        });
    };

    const handleChangeRole = (roleId) => {
        setValueInput((prevState) => {
            return {
                ...prevState,
                roleId: roleId,
            };
        });
    };

    const handleShowHideModal = () => {
        setIsShowMdal(false);
    };
    const handlePreviewModalImage = (e) => {
        e.stopPropagation();
        setIsShowMdal(true);
    };
    const handleEditUser = () => {
        (async () => {
            const response = await apiManageEditUser(valueInput);
            console.log(response);
        })();
    };
    return (
        <div className={style.formEditWapper}>
            <form>
                <div className={style.formGroup}>
                    <MySelect
                        options={ROLEDATA}
                        label={t('Profile.gender')}
                        value={valueInput.roleId || ''}
                        onChanType={handleChangeRole}
                        height
                        width
                    ></MySelect>
                    <FormInput
                        label="Full Name"
                        placeholder="Full Name.."
                        value={valueInput.userName || ''}
                        name="userName"
                        onChangeInput={handleOnChangeInput}
                    ></FormInput>

                    <FormInput
                        type="email"
                        label="Email"
                        value={valueInput.email || ''}
                        name="email"
                        onChangeInput={handleOnChangeInput}
                        placeholder="Email..."
                    ></FormInput>
                    <FormInput
                        label="Address"
                        value={valueInput.address || ''}
                        name="address"
                        onChangeInput={handleOnChangeInput}
                        placeholder="Address..."
                    ></FormInput>
                    <FormInput
                        label="Mobile"
                        name="mobile"
                        value={valueInput.mobile | ''}
                        onChangeInput={handleOnChangeInput}
                        placeholder="mobile"
                        type="number"
                    ></FormInput>
                    <FormInput
                        label="Birthday"
                        name="birthday"
                        onChangeInput={handleOnChangeInput}
                        placeholder="birthday"
                        type="date"
                        value={valueInput.birthday || ''}
                    ></FormInput>
                    <MySelect
                        options={optionGender}
                        label={t('Profile.gender')}
                        value={valueInput.gender || ''}
                        onChanType={handleChangeGender}
                        height
                        width
                    ></MySelect>
                    <MySelect
                        options={optionClass}
                        label={t('Profile.class')}
                        value={valueInput.className || ''}
                        onChanType={handleOnchangeClass}
                        height
                        width
                    ></MySelect>
                    <FormInput
                        label="Avatar"
                        name="avatar"
                        onChangeInput={handleOnChangeInput}
                        placeholder="avatar"
                        type="file"
                    ></FormInput>
                    {/* {console.log(isShowModal)} */}
                    <Modal showModal={preview ? true : ''} onShowHideModal={handleShowHideModal}>
                        {/* {console.log(preview)} */}
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
                </div>
            </form>
            <form>
                <h1>{t('Profile.Headers.TabButton.familyInfo')}</h1>
                <div className={style.formGroup}>
                    <FormInput
                        label={t('Profile.FamilyInfo.fullNameFather')}
                        placeholder={t('Profile.FamilyInfo.fullNameFather')}
                        value={valueInput.userDad || ''}
                        name="userDad"
                        onChangeInput={handleOnChangeInput}
                    ></FormInput>
                    <FormInput
                        label={t('Profile.FamilyInfo.fullNameMommy')}
                        placeholder={t('Profile.FamilyInfo.fullNameMommy')}
                        value={valueInput.userMother || ''}
                        name="userMother"
                        onChangeInput={handleOnChangeInput}
                    ></FormInput>
                    <FormInput
                        label={t('Profile.FamilyInfo.contactPhone')}
                        placeholder={t('Profile.FamilyInfo.contactPhone')}
                        value={valueInput.mobileContact || ''}
                        name="mobileContact"
                        onChangeInput={handleOnChangeInput}
                        type="number"
                    ></FormInput>
                </div>
            </form>
            <MyButton hanldeClick={handleEditUser} success medium>
                {t('Profile.edit')}
            </MyButton>
        </div>
    );
}

export default ManageEditUsers;
