import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useContextStore } from '@/context';

import style from './FamilyInfo.module.scss';
import { useChangeLanguageFamilyInfo } from '@/use/Languages';
function FamilyInfo() {
    const { t, i18n } = useTranslation();
    const [state] = useContextStore();
    // console.log('state', state);

    const [genderFather, setGenderFather] = useState(null);
    const [genderMommy, setGenderMommy] = useState(null);
    useEffect(() => {
        if (state.userInfor) {
            // eslint-disable-next-line react-hooks/rules-of-hooks
            const result = useChangeLanguageFamilyInfo(i18n.language, state.userInfor.data.parentData);
            // console.log(result);
            setGenderFather(result.valueFather);
            setGenderMommy(result.valueMommy);
        }
    }, [i18n.language, state]);

    return (
        <div className={style.container}>
            <table>
                <tbody>
                    <tr>
                        <th>{t('Profile.FamilyInfo.contactEmail')}</th>
                        <th>{state.userInfor && state.userInfor.data.parentData.email}</th>
                    </tr>
                    <tr>
                        <th>{t('Profile.FamilyInfo.contactPhone')}</th>
                        <th>{state.userInfor && state.userInfor.data.parentData.mobile}</th>
                    </tr>
                    <tr>
                        <th>{t('Profile.FamilyInfo.fullNameFather')}</th>
                        <th>{state.userInfor && state.userInfor.data.parentData.fullNameFather}</th>
                    </tr>
                    <tr>
                        <th>{t('Profile.FamilyInfo.genderFather')}</th>
                        <th>{state.userInfor && genderFather}</th>
                    </tr>
                    <tr>
                        <th>{t('Profile.FamilyInfo.addressFather')}</th>
                        <th>{state.userInfor && state.userInfor.data.parentData.addressFather}</th>
                    </tr>
                    <tr>
                        <th>{t('Profile.FamilyInfo.fullNameMommy')}</th>
                        <th>{state.userInfor && state.userInfor.data.parentData.fullNameMommy}</th>
                    </tr>
                    <tr>
                        <th>{t('Profile.FamilyInfo.genderMommy')}</th>
                        <th>{state.userInfor && genderMommy}</th>
                    </tr>
                    <tr>
                        <th>{t('Profile.FamilyInfo.addressMommy')}</th>
                        <th>{state.userInfor && state.userInfor.data.parentData.addressMommy}</th>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}

export default FamilyInfo;
