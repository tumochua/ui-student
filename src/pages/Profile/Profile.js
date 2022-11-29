import { connect } from 'react-redux';
// import { useEffect } from 'react';
// import { useNavigate, useParams } from 'react-router-dom';
// import { apiGetProfileUser } from '../../services/apis';
// import { useCheckToken } from '@/use/CheckToken';
// // import style from './Profile.module.scss';
// import config from '@/config';

function Profile() {
    return <div>Profile</div>;
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
