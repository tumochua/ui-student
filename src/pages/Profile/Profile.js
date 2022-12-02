import { useState, useEffect, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { apiGetProfileUser } from '@/services/apis';
import { useCheckToken } from '@/use/CheckToken';
import config from '@/config';
import style from './Profile.module.scss';

///component
import InformationStudent from './InformationStudent/InformationStudent';
import Language from './Language';
/// redux
import { changeLanguage } from '@/store/actions/LanguageActions';

function Profile({ changeLanguage }) {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const [isModalLanguage, setIsModalLanguage] = useState(false);
    const [useInfor, setUseInfor] = useState(null);
    const [inputFile, setInputFile] = useState(null);
    const [preview, setPreview] = useState(null);

    // eslint-disable-next-line no-unused-vars
    const [language, setLanguage] = useState([
        {
            id: 1,
            name: 'Tiếng Việt',
            value: 'vi',
        },
        {
            id: 2,
            name: 'Tiếng anh',
            value: 'en',
        },
    ]);

    useEffect(() => {
        const fetchApiUserInfor = async () => {
            const reponse = await apiGetProfileUser();
            if (reponse.data.statusCode === 2) {
                setUseInfor(reponse.data);
                // console.log('useInfor', useInfor);
            }
            // eslint-disable-next-line react-hooks/rules-of-hooks
            const result = useCheckToken(reponse);
            if (result) {
                return navigate(config.routes.login);
            }
        };
        fetchApiUserInfor();
    }, [navigate]);

    useEffect(() => {
        if (inputFile) {
            const objectUrl = URL.createObjectURL(inputFile);
            setPreview(objectUrl);
            return () => URL.revokeObjectURL(objectUrl);
        }
    }, [inputFile]);

    const handleMouseEnter = useCallback(() => {
        setIsModalLanguage(true);
    }, []);

    const handleMouseLeave = useCallback(() => {
        setIsModalLanguage(false);
    }, []);

    const handleChangeLanguage = useCallback(
        (language) => {
            changeLanguage(language);
            setIsModalLanguage(false);
        },
        [changeLanguage],
    );
    const handleOnchangeInput = useCallback((data) => {
        setInputFile(data.value);
    }, []);
    return (
        <div className={style.profileWapper}>
            {inputFile && <img src={preview} alt="preview" />}
            <span
                className={style.languageWapper}
                onMouseEnter={() => handleMouseEnter()}
                onMouseLeave={() => handleMouseLeave()}
            >
                {/* ngôn ngữ */}
                {t('Profile.language')}
                {isModalLanguage && (
                    <Language
                        isModalLanguage={isModalLanguage}
                        language={language}
                        onChanLanguage={handleChangeLanguage}
                    />
                )}
            </span>
            <InformationStudent useInfor={useInfor} onchangeInput={handleOnchangeInput} />
            {/* {
                useInfor && <InformationStudent onchangeInput={handleOnchangeInput} />
            } */}
        </div>
    );
}
const mapStateToProps = (state) => ({
    userRedux: state.users.user,
});

export default connect(mapStateToProps, { changeLanguage })(Profile);
