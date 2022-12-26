import { useEffect } from 'react';
// import io from 'socket.io-client';
// const socket = io(process.env.REACT_APP_BACKEND_URL);
// import style from './Notification.module.scss';

function Notification() {
    useEffect(() => {
        // socket.on('servePosts', (ags) => {
        //     console.log(ags);
        // });
        // socket.on('disconnect', () => {
        //     console.log('User has disconnect!!');
        // });
        // socket.emit('postsNotification', 'test postsNotification');
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return <h1>hello Notification</h1>;
}

export default Notification;
