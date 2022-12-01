import { connect } from 'react-redux';
import { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { apiGetProfileUser } from '@/services/apis';
// import { useCheckToken } from '@/use/CheckToken';
// import config from '@/config';
import style from './Profile.module.scss';

///component
import InformationStudent from './InformationStudent/InformationStudent';
import Language from './Language';

function Profile({ userRedux }) {
    const [isModalLanguage, setIsModalLanguage] = useState(true);
    // const navigate = useNavigate();
    // const [userInfor, setUserInfor] = useState(null);
    // useEffect(() => {
    //     (async () => {
    //         const reponse = await apiGetProfileUser();
    //         setUserInfor(reponse.data);
    //         // eslint-disable-next-line react-hooks/rules-of-hooks
    //         const result = useCheckToken(reponse);
    //         if (result) {
    //             return navigate(config.routes.login);
    //         }
    //     })();
    //     // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, []);
    const handleMouseEnter = () => {
        // setIsModalLanguage(true);
    };
    const handleMouseLeave = () => {
        // setIsModalLanguage(false);
    };
    return (
        <div className={style.profileWapper}>
            <span className={style.languageWapper} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                Ngôn ngữ
                <Language isModalLanguage={isModalLanguage} />
            </span>
            <InformationStudent />
        </div>
    );
}
const mapStateToProps = (state) => ({
    userRedux: state.users.user,
});
export default connect(mapStateToProps, {})(Profile);
