import { connect } from 'react-redux';

import { useEffect } from 'react';
import { apiGetProfileUser } from '../../services/apis';

function Profile({ userRedux }) {
    useEffect(() => {
        callApiTest();
    }, []);

    useEffect(() => {
        console.log('userRedux', userRedux);
    }, [userRedux]);

    const callApiTest = async () => {
        await apiGetProfileUser();
    };

    return <div>Profile</div>;
}
const mapStateToProps = (state) => ({
    userRedux: state.users.user,
});
export default connect(mapStateToProps, {})(Profile);
