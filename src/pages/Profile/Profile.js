import { connect } from 'react-redux';
import { useState, useEffect, useCallback } from 'react';
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

function Profile({ userRedux, changeLanguage }) {
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
    const [isModalLanguage, setIsModalLanguage] = useState(false);
    const navigate = useNavigate();
    const [userInfor, setUserInfor] = useState(null);
    const [inputFile, setInputFile] = useState(null);
    const [preview, setPreview] = useState(null);
    useEffect(() => {
        (async () => {
            const reponse = await apiGetProfileUser();
            setUserInfor(reponse.data);
            // eslint-disable-next-line react-hooks/rules-of-hooks
            const result = useCheckToken(reponse);
            if (result) {
                return navigate(config.routes.login);
            }
        })();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    useEffect(() => {
        if (!inputFile) {
            setPreview(undefined);
            return;
        }
        const objectUrl = URL.createObjectURL(inputFile);
        setPreview(objectUrl);
        return () => URL.revokeObjectURL(objectUrl);
    }, [inputFile]);
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

    // const handleOnchangeInput = (data) => {
    //     setInputFile(data.value);
    // };

    const handleMouseEnter = useCallback(() => {
        setIsModalLanguage(true);
    }, []);

    const handleMouseLeave = useCallback(() => {
        setIsModalLanguage(false);
    }, []);

    return (
        <div className={style.profileWapper}>
            {inputFile && <img src={preview} alt="preview" />}
            <span
                className={style.languageWapper}
                onMouseEnter={() => handleMouseEnter()}
                onMouseLeave={() => handleMouseLeave()}
            >
                Ngôn ngữ
                {/* <i class="fa-solid fa-caret-down"></i> */}
                <Language isModalLanguage={isModalLanguage} language={language} onChanLanguage={handleChangeLanguage} />
            </span>
            <InformationStudent userInfor={userInfor} onchangeInput={handleOnchangeInput} />
        </div>
    );
}
const mapStateToProps = (state) => ({
    userRedux: state.users.user,
});

export default connect(mapStateToProps, { changeLanguage })(Profile);
