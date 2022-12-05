import { useState, useEffect, useCallback, memo } from 'react';
import { useTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
///component
import InformationStudent from './InformationStudent/InformationStudent';
import Language from './Language';
import MyButton from '@/components/Button/MyButton';

import { apiGetProfileUser } from '@/services/apis';
import { useCheckToken } from '@/use/CheckToken';
import config from '@/config';
import style from './Profile.module.scss';

function Profile() {
    // console.log('re-render profile');
    const { t, i18n } = useTranslation();

    const navigate = useNavigate();
    const [isModalLanguage, setIsModalLanguage] = useState(false);
    const [userInfor, setUserInfor] = useState(null);
    const [inputFile, setInputFile] = useState(null);
    // eslint-disable-next-line no-unused-vars
    const [preview, setPreview] = useState(null);

    const [languages, setLanguages] = useState([
        {
            id: 1,
            name: t('Languages.vi'),
            value: 'vi',
        },
        {
            id: 2,
            name: t('Languages.en'),
            value: 'en',
        },
    ]);
    useEffect(() => {
        const fetchApiUserInfor = async () => {
            const reponse = await apiGetProfileUser();
            // console.log('reponse', reponse);
            if (reponse.data.statusCode === 2) {
                setUserInfor(reponse.data);
                // console.log('useInfor', useInfor);
            }
            // eslint-disable-next-line react-hooks/rules-of-hooks
            const result = useCheckToken(reponse);
            if (result) {
                return navigate(config.routes.login);
            }
        };
        fetchApiUserInfor();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (inputFile) {
            const objectUrl = URL.createObjectURL(inputFile);
            setPreview(objectUrl);
            return () => URL.revokeObjectURL(objectUrl);
        }
    }, [inputFile]);
    useEffect(() => {
        setLanguages([
            {
                id: 1,
                name: t('Languages.vi'),
                value: 'vi',
            },
            {
                id: 2,
                name: t('Languages.en'),
                value: 'en',
            },
        ]);
    }, [t]);
    const handleMouseEnter = useCallback(() => {
        setIsModalLanguage(true);
    }, []);

    const handleMouseLeave = useCallback(() => {
        setIsModalLanguage(false);
    }, []);

    const handleChangeLanguage = useCallback(
        (language) => {
            i18n.changeLanguage(language.value);

            setIsModalLanguage(false);
        },
        [i18n],
        // [changeLanguage],
    );

    const handleOnchangeInput = useCallback((data) => {
        setInputFile(data.value);
    }, []);

    const handleRedirectEditUser = () => {
        if (userInfor) {
            const userId = userInfor.data.id;
            // navigate(`/${config.routes.editUser}/${userId}`);
            navigate(`/eidt-user/${userId}`);
        }
    };

    return (
        <div className={style.profileWapper}>
            <div className={style.profileHeader}>
                <span
                    className={style.languageWapper}
                    onMouseEnter={() => handleMouseEnter()}
                    onMouseLeave={() => handleMouseLeave()}
                >
                    {t('Profile.language')}
                    {isModalLanguage && (
                        <Language
                            isModalLanguage={isModalLanguage}
                            languages={languages}
                            onChanLanguage={handleChangeLanguage}
                        />
                    )}
                </span>
                <span className={style.profileEdit} title="Bạn cần sửa thông tin" onClick={handleRedirectEditUser}>
                    {/* <i className="fa-solid fa-pen"></i> */}
                    <MyButton success medium>
                        {t('Profile.edit')}
                    </MyButton>
                </span>
            </div>
            <InformationStudent onchangeInput={handleOnchangeInput} userInfor={userInfor} />
        </div>
    );
}
const mapStateToProps = (state) => ({
    userRedux: state.users.user,
});

export default connect(mapStateToProps, {})(memo(Profile));
