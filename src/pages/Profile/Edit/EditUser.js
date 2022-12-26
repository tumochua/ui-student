import { memo, useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import classNames from 'classnames';

import style from './EditUser.module.scss';

import MyButton from '@/components/Button/MyButton';
import FormInput from '@/components/FormInput';
import Modal from '@/components/Modal';

import { handleGender } from '@/use/Gender';
import { handleImageBase64 } from '@/use/ConvertBase64';
import { apiGetProfileUser, handleApiEditUser } from '@/services/apis';
import MySelect from '@/components/Selects/MySelect';
import { optionClass } from '@/Data';
function EditUser() {
    const { t, i18n } = useTranslation();
    const [valueInput, setValueInput] = useState({
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
    // const [family, setFamily] = useState({
    //     userDad: '',
    //     userMother: '',
    //     mobileContact: '',
    // });
    const [apiGenderData, setApiGenderData] = useState(null);

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

    const [avatarPreview, setAvatarPreview] = useState(null);
    // const [preview, setPreview] = useState(
    //     'https://previews.123rf.com/images/scrap4vec/scrap4vec2005/scrap4vec200500184/148077898-logo-design-of-student-child-or-people-with-book-template-in-creative-shape-isolate-vector-illustrat.jpg',
    // );
    const [preview, setPreview] = useState(null);
    const [isShowModal, setIsShowMdal] = useState(false);

    const classModal = classNames({
        [style.previewImages]: isShowModal,
        [style.images]: true,
    });
    const handleEditUser = async (e) => {
        e.preventDefault();
        // console.log(valueInput);
        // console.log(family);
        const response = await handleApiEditUser(valueInput);
        console.log(response);
        // await handleApiCreateFamily(family);
    };

    useEffect(() => {
        if (apiGenderData) {
            // console.log(i18n.language);
            handleGender(apiGenderData, i18n.language);
            // const result = handleGender(apiGenderData, i18n.language);
            // console.log(result);
            // if (result) {
            //     setValueInput((prevState) => {
            //         return {
            //             ...prevState,
            //             gender: result,
            //         };
            //     });
            // }
        }
    }, [apiGenderData, i18n.language]);

    useEffect(() => {
        (async () => {
            const response = await apiGetProfileUser();
            if (response.data.statusCode === 2) {
                // console.log(response.data.data);
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
                } = response.data.data;
                // console.log(dob);
                // console.log(address, dob, fullName, email, genderId, image, mobile);
                setApiGenderData({ valueEn, valueVi });
                setValueInput((prevState) => {
                    return {
                        ...prevState,
                        userName: fullName,
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
                    };
                });
                // setFamily((prevState) => {
                //     return {
                //         ...prevState,
                //         userDad: fullNameFather,
                //         userMother: fullNameMommy,
                //     };
                // });
            }
        })();
    }, []);

    useEffect(() => {
        if (avatarPreview) {
            const objectUrl = URL.createObjectURL(avatarPreview);
            setPreview(objectUrl);
            return () => URL.revokeObjectURL(objectUrl);
        }
    }, [avatarPreview]);
    useEffect(() => {
        if (valueInput.avatar) {
            fetch(valueInput.avatar)
                .then((res) => res.blob())
                .then((blob) => {
                    const objectUrl = URL.createObjectURL(blob);
                    setPreview(objectUrl);
                    return () => URL.revokeObjectURL(objectUrl);
                });
            // .then((objectUrl) => console.log(objectUrl));
            // const promise = new Promise(async (resolve, reject) => {
            //     try {
            //         await resolve(valueInput.avatar);
            //     } catch (error) {
            //         reject(error);
            //     }
            // });
            // console.log(promise);
        }
    }, [valueInput.avatar]);

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

    const handlePreviewModalImage = (e) => {
        e.stopPropagation();
        setIsShowMdal(true);
    };
    const handleShowHideModal = () => {
        setIsShowMdal(false);
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
        // console.log(className);
        setValueInput((prevState) => {
            return {
                ...prevState,
                className: className,
            };
        });
    };

    return (
        <>
            <div className={style.formEditWapper}>
                <form>
                    <div className={style.formGroup}>
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
                            value={valueInput.mobile}
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
                            value={valueInput.birthday}
                        ></FormInput>
                        <MySelect
                            options={optionGender}
                            label={t('Profile.gender')}
                            value={valueInput.gender}
                            onChanType={handleChangeGender}
                            height
                            width
                        ></MySelect>
                        <MySelect
                            options={optionClass}
                            label={t('Profile.class')}
                            value={valueInput.className}
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
                            {console.log(preview)}
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
        </>
    );
}

export default memo(EditUser);
