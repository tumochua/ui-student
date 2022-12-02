import { memo } from 'react';
import classNames from 'classnames';
import { useTranslation } from 'react-i18next';

import style from './InformationStudent.module.scss';
import Input from '@/components/Input';
function InformationStudent({ onchangeInput }) {
    // console.log('re-render InformationStudent');
    const { t } = useTranslation();
    // console.log('inputFile', inputFile);
    // console.log('userInfor', userInfor);
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
                            <th>{t('Profile.dateBirth')}</th>
                            <th>{t('Profile.address')}</th>
                            {/* <th>Company</th>
                            <th>Contact</th>
                            <th>Country</th> */}
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
                    <Input type="file" boder={false} opacity={false} name="inputFile" handleOnchange={onchangeInput} />
                    <i className={classess}></i>
                    tumochua
                </div>
            </div>
        </div>
    );
}

export default memo(InformationStudent);
// export default InformationStudent;
// const mapStateToProps = (state) => ({
//     language: state.language.language,
// });
// export default connect(mapStateToProps, {})(InformationStudent);
