import { useState, useEffect, memo } from 'react';
import { useTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
///component
import InformationStudent from './InformationStudent/InformationStudent';
import MyButton from '@/components/Button/MyButton';

import { apiGetProfileUser } from '@/services/apis';
import { useCheckToken } from '@/use/CheckToken';
import config from '@/config';
import style from './Profile.module.scss';

function Profile() {
    // console.log('re-render profile');
    const { t } = useTranslation();

    const navigate = useNavigate();
    const [userInfor, setUserInfor] = useState(null);

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

    const handleRedirectEditUser = () => {
        // console.log('userInfor', userInfor);
        if (userInfor) {
            const userId = userInfor.data.id;
            // navigate(`/${config.routes.editUser}/${userId}`);
            navigate(`/eidt-user/${userId}`);
        }
    };

    return (
        <>
            <div className={style.profileWapper}>
                <div className={style.profileHeader}>
                    <span className={style.profileEdit} title="Bạn cần sửa thông tin" onClick={handleRedirectEditUser}>
                        {/* <i className="fa-solid fa-pen"></i> */}
                        <MyButton success medium>
                            {t('Profile.edit')}
                        </MyButton>
                    </span>
                </div>
                <InformationStudent />
            </div>
        </>
    );
}
const mapStateToProps = (state) => ({
    userRedux: state.users.user,
});

export default connect(mapStateToProps, {})(memo(Profile));
