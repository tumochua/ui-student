import { useEffect } from 'react';

// import { getListUsers } from '../../services/apis';

import style from './Home.module.scss';

function Home() {
    useEffect(() => {
        (async () => {
            // const response = await getListUsers();
            // console.log('response', response);
        })();
    }, []);

    return <h1 className={style.home}>Home Page</h1>;
}

export default Home;
