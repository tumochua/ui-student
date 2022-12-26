import { useState, useEffect, useMemo, memo } from 'react';
import { useTranslation } from 'react-i18next';

import style from './PersonalInfo.module.scss';

import { useContextStore } from '@/context';

import { useChangeLanguageRole, useChangeLanguageGender } from '../../use/Languages';
// import io from 'socket.io-client';
// const socket = io(process.env.REACT_APP_BACKEND_URL);
function PersonalInfo() {
    const [state] = useContextStore();
    // console.log('state', state);
    const { t, i18n } = useTranslation();
    const [avatar, setAvatar] = useState(null);
    const [statecurrentYear, setCurrentYear] = useState(null);
    // eslint-disable-next-line no-unused-vars
    const [currentLanguage, setCurrentLanguage] = useState(() => {
        return i18n.language;
    });
    const [gender, setGender] = useState(null);
    const [role, setRole] = useState(null);

    useMemo(() => {
        if (state.userInfor && state.userInfor.data) {
            // console.log(state.userInfor);
            const stateImg = state.userInfor.data.image;
            setAvatar(stateImg);
        }
    }, [state]);
    useEffect(() => {
        // socket.on('connection', () => {
        //     console.log('change');
        // });
        if (state.userInfor && state.userInfor.data) {
            const stateAgeCopy = state.userInfor.data.dob;
            const result = new Date(stateAgeCopy).getFullYear();
            const currentYear = new Date().getFullYear();
            const sumAge = currentYear - result;
            setCurrentYear(sumAge);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [state.userInfor]);
    useEffect(() => {
        setCurrentLanguage(i18n.language);
        if (state.userInfor && state.userInfor.data) {
            // eslint-disable-next-line react-hooks/rules-of-hooks
            const role = useChangeLanguageRole(i18n.language, state);
            if (role) {
                setRole(role.value);
            }
            // eslint-disable-next-line react-hooks/rules-of-hooks
            const gender = useChangeLanguageGender(i18n.language, state);
            // console.log('gender', gender);
            if (gender) {
                setGender(gender.value);
            }
        }
    }, [i18n.language, state]);

    return (
        <div className={style.container}>
            <div className={style.containerLeft}>
                <table>
                    <tbody>
                        <tr>
                            <th>{t('Profile.codeSv')}</th>
                            <th>{state.userInfor && state.userInfor.data && state.userInfor.data.id}</th>
                        </tr>
                        <tr>
                            <th>{t('Profile.class')}</th>
                            <th>
                                {state.userInfor &&
                                    state.userInfor.data &&
                                    state.userInfor.data.classData &&
                                    state.userInfor.data.classData.className}
                            </th>
                        </tr>
                        <tr>
                            <th>{t('Profile.role')}</th>
                            <th>{role}</th>
                        </tr>
                        <tr>
                            <th>{t('Profile.fullName')}</th>
                            <th>{state.userInfor && state.userInfor.data && state.userInfor.data.fullName}</th>
                        </tr>
                        <tr>
                            <th>{t('Profile.gender')}</th>
                            <th>{gender}</th>
                        </tr>
                        <tr>
                            <th>Email</th>
                            <th>{state.userInfor && state.userInfor.data && state.userInfor.data.email}</th>
                        </tr>
                        <tr>
                            <th>{t('Profile.phoneNumber')}</th>
                            <th>
                                {(state.userInfor && state.userInfor.data && state.userInfor.data.mobile) ||
                                    t('Profile.null')}
                            </th>
                        </tr>
                        <tr>
                            <th>{t('Profile.address')}</th>
                            <th>{state.userInfor && state.userInfor.data && state.userInfor.data.address}</th>
                        </tr>
                        <tr>
                            <th>{t('Profile.dateBirth')}</th>
                            <th>
                                {state.userInfor && state.userInfor.data && state.userInfor.data.dob} {t('Profile.age')}{' '}
                                : {statecurrentYear}
                            </th>
                        </tr>

                        <tr>
                            <th>{t('Profile.nationality')}</th>
                            <th>Việt Nam</th>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div className={style.containerRight}>
                {avatar && <img src={`${avatar}`} alt="avatar" className={style.avatar} />}
            </div>
        </div>
    );
}

export default memo(PersonalInfo);
