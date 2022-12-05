import { memo } from 'react';
// import classNames from 'classnames';
import { useTranslation } from 'react-i18next';

import style from './InformationStudent.module.scss';
function InformationStudent({ userInfor, onchangeInput }) {
    // console.log('re-render InformationStudent');
    const { t } = useTranslation();
    // console.log('useInfor', userInfor);
    // const classess = classNames('fa-solid fa-cloud-arrow-down', {
    //     [style.iconFile]: true,
    // });
    return (
        <div className={style.inforWapper}>
            <div className={style.inforLeft}>
                <table>
                    <tbody>
                        <tr>
                            <th>{t('Profile.fullName')}</th>
                            <th>{t('Profile.codeSv')}</th>
                            <th>{t('Profile.address')}</th>
                            <th>{t('Profile.class')}</th>
                        </tr>
                        {userInfor && (
                            <tr>
                                <th>{userInfor.data.fullName}</th>
                                <th>
                                    {userInfor.data.id ? userInfor.data.id : t('Profile.InformationStudent.notFound')}
                                </th>
                                <th>
                                    {userInfor.data.class
                                        ? userInfor.data.class
                                        : t('Profile.InformationStudent.notFound')}
                                </th>
                                <th>
                                    {userInfor.data.address
                                        ? userInfor.data.address
                                        : t('Profile.InformationStudent.notFound')}
                                </th>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
            {/* <div className={style.inforRightWapper}>
                <div className={style.inforRight}>
                    <Input type="file" boder={false} opacity={false} name="inputFile" handleOnchange={onchangeInput} />
                    <i className={classess}></i>
                </div>
            </div> */}
        </div>
    );
}
export default memo(InformationStudent);
