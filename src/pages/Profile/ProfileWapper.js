import { useEffect } from 'react';

import HeaderProFile from '@/layouts/components/HeaderProfileOnly/HeaderProFile/HeaderProFile';

import { useContextStore, userAction } from '@/context';

import { apiGetProfileUser } from '@/services/apis';

function ProfileWapper({ children }) {
    // eslint-disable-next-line no-unused-vars
    const [state, dispatch] = useContextStore();
    useEffect(() => {
        (async () => {
            try {
                const response = await apiGetProfileUser();
                if (response.data.statusCode === 2) {
                    dispatch(userAction.getUserInfor(response.data));
                }
            } catch (error) {
                console.log(error);
            }
        })();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div>
            <HeaderProFile />
            <div>{children}</div>
        </div>
    );
}

export default ProfileWapper;
