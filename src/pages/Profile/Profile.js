import { connect } from 'react-redux';
import { useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { apiGetProfileUser } from '../../services/apis';
// import { useCheckToken } from '@/use/CheckToken';
// import config from '@/config';
import style from './Profile.module.scss';

function Profile(userRedux) {
    // const navigate = useNavigate();
    // useEffect(() => {
    //     (async () => {
    //         const reponse = await apiGetProfileUser();
    //         console.log('response', reponse);
    //         // eslint-disable-next-line react-hooks/rules-of-hooks
    //         const result = useCheckToken(reponse);
    //         if (result) {
    //             return navigate(config.routes.login);
    //         }
    //     })();
    //     // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, []);
    useEffect(() => {
        // console.log('userRedux', userRedux);
    }, [userRedux]);
    return <div className={style.profileWapper}>Profile</div>;
}
const mapStateToProps = (state) => ({
    userRedux: state.users.user,
});
export default connect(mapStateToProps, {})(Profile);

// const navigate = useNavigate();
// let { id } = useParams();
// useEffect(() => {
//     (async () => {
//         const reponse = await apiGetProfileUser(id);
//         console.log('response', reponse);
//         // eslint-disable-next-line react-hooks/rules-of-hooks
//         const result = useCheckToken(reponse);
//         if (result) {
//             return navigate(config.routes.login);
//         }
//     })();
//     // eslint-disable-next-line react-hooks/exhaustive-deps
// }, []);
