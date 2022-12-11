import { useEffect } from 'react';

import { useTranslation } from 'react-i18next';
// import { getListUsers } from '../../services/apis';

import style from './Home.module.scss';

function Home() {
    const { t } = useTranslation();
    useEffect(() => {
        (async () => {
            // const response = await getListUsers();
            // console.log('response', response);
        })();
    }, []);

    return <h1 className={style.home}>{t('Home.home')}</h1>;
}

export default Home;
