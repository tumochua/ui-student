import { useTranslation } from 'react-i18next';
import classNames from 'classnames';

import style from './InformationStudent.module.scss';
import Input from '@/components/Input';

function InformationStudent(userInfor) {
    // console.log('user', userInfor);
    const { t } = useTranslation();
    const classess = classNames('fa-solid fa-cloud-arrow-down', {
        [style.iconFile]: true,
    });
    return (
        <div className={style.inforWapper}>
            <div className={style.inforLeft}>
                <table>
                    <tbody>
                        <tr>
                            <th>{t('Profile.name')}</th>
                            <th>Ngày Tháng Năm Sinh</th>
                            <th>Country</th>
                        </tr>
                        <tr>
                            <th>Company</th>
                            <th>Contact</th>
                            <th>Country</th>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div className={style.inforRightWapper}>
                <div className={style.inforRight}>
                    <Input type="file" boder={false} opacity={false} />
                    <i className={classess}></i>
                </div>
            </div>
        </div>
    );
}

export default InformationStudent;
