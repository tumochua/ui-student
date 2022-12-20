import { useState, useEffect, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useLocation } from 'react-router-dom';
import style from './HeaderProFile.module.scss';
import { useContextStore } from '@/context';

import config from '@/config';

import Language from '@/pages/Profile/Language';
import MyButton from '@/components/Button';
function HeaderProFile() {
    const [state] = useContextStore();
    // console.log('state', state);
    const { t, i18n } = useTranslation();
    const navigate = useNavigate();
    const location = useLocation();
    const path = location.pathname;
    const [role, setRole] = useState(null);

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
            isAdmin: true,
        },
        {
            id: 2,
            name: t('Profile.Headers.TabButton.managePosts'),
            active: path === config.routes.profileEducationalInfo,
            router: config.routes.profileEducationalInfo,
            isAdmin: true,
        },
        {
            id: 3,
            name: t('Profile.Headers.TabButton.familyInfo'),
            active: path === config.routes.profileFamilyInfo,
            router: config.routes.profileFamilyInfo,
            isAdmin: true,
        },
        {
            id: 4,
            name: t('Profile.Headers.TabButton.proctorDetails'),
            active: path === config.routes.profileProctorDetails,
            router: config.routes.profileProctorDetails,
            isAdmin: true,
        },
        {
            id: 5,
            name: t('Profile.Headers.TabButton.hostelDetails'),
            active: path === config.routes.profileHostelDetails,
            router: config.routes.profileHostelDetails,
            isAdmin: true,
        },
        {
            id: 6,
            name: t('Profile.Headers.TabButton.blog'),
            active: path === config.routes.blog,
            router: config.routes.blog,
            isAdmin: true,
        },
        {
            id: 7,
            name: t('Profile.Headers.TabButton.approve'),
            active: path === config.routes.approve,
            router: config.routes.approve,
            isAdmin: role === 'R5' || role === 'R4' || role === 'R3',
        },
        {
            id: 8,
            name: 'Teacher',
            active: path === config.routes.teacher,
            router: config.routes.teacher,
            isAdmin: role === 'R5' || role === 'R4' || role === 'R3' || role === 'R2',
        },
    ];

    useEffect(() => {
        if (state.userInfor) {
            setRole(state.userInfor.data.roleId);
        }
    }, [role, state]);

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
                <ul className={style.tabBtn}>
                    {tabButtom &&
                        tabButtom.map((tab) => {
                            return (
                                <li key={tab.id}>
                                    {tab.isAdmin && (
                                        <MyButton
                                            // key={tab.id}
                                            success={tab.active}
                                            large
                                            hanldeClick={() => handleChangeTab(tab.router, tab.id)}
                                        >
                                            {tab.name}
                                        </MyButton>
                                    )}
                                </li>
                            );
                        })}
                </ul>
            </div>
        </div>
    );
}

export default HeaderProFile;
