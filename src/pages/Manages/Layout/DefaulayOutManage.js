import Header from '@/layouts/components/Header';
import Sidebar from '@/layouts/components/Sidebar';
import HeaderManage from './Header';
// import ProfileWapper from '@/pages/Profile/ProfileWapper';
import style from './DefaulayOutManage.module.scss';
function DefaulayOutManage({ children }) {
    return (
        <div className={style.layoutWapper}>
            <Header />
            <div className={style.container}>
                <div className={style.sidebar}>
                    <Sidebar />
                </div>
                <div className={style.content}>
                    <HeaderManage />
                    {children}
                </div>
            </div>
        </div>
    );
}

export default DefaulayOutManage;
