import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import style from './HeaderManage.module.scss';
import { HEADERMANAGE } from '@/Data';
///useLocation
function HeaderManage() {
    const location = useLocation();
    const navigate = useNavigate();
    const routerPath = location.pathname;
    const [isSideBar, setIsSideBar] = useState(false);

    const handleChangeTab = (router) => {
        navigate(router);
        setIsSideBar(false);
    };
    const handleSideBarAdmin = () => {
        setIsSideBar(!isSideBar);
    };
    const handleClose = () => {
        setIsSideBar(false);
    };

    return (
        <div className={style.container}>
            <span onClick={handleSideBarAdmin}>{<i className={`fa-solid fa-bars ${style.iconBars}`}></i>}</span>
            {isSideBar && (
                <div className={style.body}>
                    <div className={style.bodyWapper}>
                        <div className={style.iconCloseWapper}>
                            <i className={`fa-solid fa-xmark ${style.iconClose}`} onClick={handleClose}></i>
                        </div>
                        <ul className={style.content}>
                            {HEADERMANAGE &&
                                HEADERMANAGE.map((item) => {
                                    return (
                                        <li
                                            key={item.id}
                                            className={`${style.itemWapper} ${
                                                item.router === routerPath ? style.active : ''
                                            }`}
                                            onClick={() => handleChangeTab(item.router)}
                                        >
                                            <div className={style.item}>
                                                <span>
                                                    <i className={`${item.icon} ${style.icon}`}></i>
                                                </span>
                                                <span>{item.name}</span>
                                            </div>
                                        </li>
                                    );
                                })}
                        </ul>
                    </div>
                </div>
            )}
        </div>
    );
}

export default HeaderManage;
