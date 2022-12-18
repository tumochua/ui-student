import { useState, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useLocation } from 'react-router-dom';
import style from './HeaderProFile.module.scss';

import config from '@/config';

import Language from '@/pages/Profile/Language';
import MyButton from '@/components/Button';
function HeaderProFile() {
    const { t, i18n } = useTranslation();
    const navigate = useNavigate();
    const location = useLocation();
    const path = location.pathname;

    const [isModalLanguage, setIsModalLanguage] = useState(false);
    // eslint-disable-next-line no-unused-vars
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

    const tabButtom = [
        {
            id: 1,
            name: t('Profile.Headers.TabButton.personalInfo'),
            active: path === config.routes.profilePersonalInfo,
            router: config.routes.profilePersonalInfo,
        },
        {
            id: 2,
            name: t('Profile.Headers.TabButton.managePosts'),
            active: path === config.routes.profileEducationalInfo,
            router: config.routes.profileEducationalInfo,
        },
        {
            id: 3,
            name: t('Profile.Headers.TabButton.familyInfo'),
            active: path === config.routes.profileFamilyInfo,
            router: config.routes.profileFamilyInfo,
        },
        {
            id: 4,
            name: t('Profile.Headers.TabButton.proctorDetails'),
            active: path === config.routes.profileProctorDetails,
            router: config.routes.profileProctorDetails,
        },
        {
            id: 5,
            name: t('Profile.Headers.TabButton.hostelDetails'),
            active: path === config.routes.profileHostelDetails,
            router: config.routes.profileHostelDetails,
        },
        {
            id: 6,
            name: t('Profile.Headers.TabButton.blog'),
            active: path === config.routes.blog,
            router: config.routes.blog,
        },
    ];

    const handleChangeLanguage = useCallback(
        (language) => {
            i18n.changeLanguage(language.value);

            setIsModalLanguage(false);
        },
        [i18n],
        // [changeLanguage],
    );
    const handleMouseEnter = useCallback(() => {
        setIsModalLanguage(true);
    }, []);
    const handleMouseLeave = useCallback(() => {
        setIsModalLanguage(false);
    }, []);

    const handleChangeTab = useCallback(
        (router, id) => {
            navigate(router);
            tabButtom.forEach((tab) => {
                if (tab.id === id) {
                    tab.active = true;
                } else {
                    tab.active = false;
                }
            });
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [tabButtom],
    );

    return (
        <div className={style.container}>
            <div className={style.content}>
                <div
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
                </div>
                <div className={style.tabBtn}>
                    {tabButtom &&
                        tabButtom.map((tab) => {
                            return (
                                <MyButton
                                    key={tab.id}
                                    success={tab.active}
                                    large
                                    hanldeClick={() => handleChangeTab(tab.router, tab.id)}
                                >
                                    {tab.name}
                                </MyButton>
                            );
                        })}
                </div>
            </div>
        </div>
    );
}

export default HeaderProFile;
