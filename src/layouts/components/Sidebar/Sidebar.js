import { useTranslation } from 'react-i18next';

import { NavLink } from 'react-router-dom';
// import Profile from '@/pages/Profile/index';
import PersonalInfo from '@/pages/PersonalInfo';
import Notification from '@/pages/Notification';
import Post from '@/pages/Post';
import Share from '@/pages/Share';
import config from '@/config';
import style from './Sidebar.module.scss';
import './Sidebar.module.scss';
function Sidebar() {
    const { t } = useTranslation();
    const privateRoutes = [
        {
            id: 1,
            path: config.routes.profilePersonalInfo,
            component: PersonalInfo,
            icon: 'fa-solid fa-house',
            name: 'Navbar.home',
        },
        {
            id: 2,
            path: config.routes.notification,
            component: Notification,
            icon: 'fa-solid fa-bell',
            name: 'Navbar.notification',
        },
        {
            id: 3,
            path: config.routes.share,
            component: Share,
            icon: 'fa-solid fa-share-nodes',
            name: 'Navbar.share',
        },
        {
            id: 4,
            // path: `${config.routes.post}`,
            path: `/post/page=1`,
            component: Post,
            icon: 'fa-solid fa-blog',
            name: 'Navbar.post',
        },
    ];
    return (
        <div>
            <ul className={style.navbarList}>
                {privateRoutes.map((router, index) => {
                    return (
                        <NavLink to={router.path} key={index} className={`${style.navbarIitem}`}>
                            <li className={style.navbarLi}>
                                <i className={router.icon} style={{ fontSize: '18px' }}></i>
                                <span className={style.navlinkName}>{t(`${router.name}`)}</span>
                            </li>
                        </NavLink>
                    );
                })}
            </ul>
        </div>
    );
}

export default Sidebar;
