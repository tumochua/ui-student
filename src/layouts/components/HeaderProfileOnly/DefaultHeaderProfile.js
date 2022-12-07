import Header from '../Header/Header';
import Sidebar from '../Sidebar';
import ProfileWapper from '@/pages/Profile/ProfileWapper';
import style from './HeaderProfile.module.scss';

function DefaultHeaderProfile({ children }) {
    return (
        <div className={style.layoutWapper}>
            <Header />
            <div className={style.container}>
                <div className={style.sidebar}>
                    <Sidebar />
                </div>
                <div className={style.content}>
                    <ProfileWapper>{children}</ProfileWapper>
                </div>
            </div>
        </div>
    );
}

export default DefaultHeaderProfile;
