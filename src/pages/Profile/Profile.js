import { connect } from 'react-redux';
// import { useNavigate, useParams } from 'react-router-dom';
// import { useEffect } from 'react';
// import { apiGetProfileUser } from '../../services/apis';
// import { useCheckToken } from '@/use/CheckToken';
// // import style from './Profile.module.scss';
// import config from '@/config';

function Profile() {
    // // const navigate = useNavigate();
    // useEffect(() => {
    //     // (async () => {
    //     //     const reponse = await apiGetProfileUser();
    //     //     // eslint-disable-next-line react-hooks/rules-of-hooks
    //     //     const result = useCheckToken(reponse);
    //     //     console.log('result', result);
    //     //     if (result) {
    //     //         return navigate(config.routes.login);
    //     //     }
    //     // })();
    //     // console.log('userRedux', userRedux);
    //     // eslint-disable-next-line react-hooks/exhaustive-deps
    //     console.log('change');
    // }, []);

    return <div>Profile</div>;
}
const mapStateToProps = (state) => ({
    userRedux: state.users.user,
});
export default connect(mapStateToProps, {})(Profile);
// export default Profile;
