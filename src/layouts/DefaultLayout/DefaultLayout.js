import style from './DefaultLayout.module.scss';

import Header from '@/layouts/components/Header';
import Sidebar from '../components/Sidebar';

function DefaultLayout({ children }) {
    return (
        <div className={style.defaultWapper}>
            <Header />
            <div className={style.bodyWapper}>
                <Sidebar />
                <div>{children}</div>
            </div>
        </div>
    );
}

export default DefaultLayout;
