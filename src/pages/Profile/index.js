import { useEffect } from 'react';
import { getTest } from '../../services/apis';

function Profile() {
    useEffect(() => {
        callApiTest();
    }, []);

    const callApiTest = async () => {
        const data = await getTest();
        console.log('check data', data);
    };

    return <div>Profile</div>;
}

export default Profile;
