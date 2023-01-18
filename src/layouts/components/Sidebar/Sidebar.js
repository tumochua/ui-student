import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import { NavLink } from 'react-router-dom';
// import Profile from '@/pages/Profile/index';
import PersonalInfo from '@/pages/PersonalInfo';
import Notification from '@/pages/Notification';
import Post from '@/pages/Post';
import Share from '@/pages/Share';
import ManagePosts from '@/pages/ManagePosts';

import config from '@/config';
import style from './Sidebar.module.scss';
import './Sidebar.module.scss';
import { useContextStore } from '@/context';
function Sidebar() {
    const [state] = useContextStore();
    const { t } = useTranslation();
    const [role, setRole] = useState(null);
    const privateRoutes = [
        {
            id: 1,
            path: config.routes.profilePersonalInfo,
            component: PersonalInfo,
            // icon: 'fa-solid fa-house',
            name: 'Navbar.home',
            isAdmin: true,
        },
        {
            id: 2,
            path: config.routes.notification,
            component: Notification,
            // icon: 'fa-solid fa-bell',
            name: 'Navbar.notification',
            isAdmin: true,
        },
        {
            id: 3,
            path: config.routes.share,
            component: Share,
            // icon: 'fa-solid fa-share-nodes',
            name: 'Navbar.share',
            isAdmin: true,
        },
        {
            id: 4,
            // path: `${config.routes.post}`,
            path: `/post/page=1`,
            component: Post,
            // icon: 'fa-solid fa-blog',
            name: 'Navbar.post',
            isAdmin: true,
        },
        {
            id: 5,
            name: t('Profile.Headers.TabButton.managePosts'),
            // active: path === config.routes.managePosts,
            path: config.routes.managePosts,
            isAdmin: true,
            component: ManagePosts,
        },
        {
            id: 7,
            name: t('Profile.Headers.TabButton.approve'),
            // active: path === config.routes.approve,
            path: config.routes.approve,
            isAdmin: role === 'R5' || role === 'R4' || role === 'R3',
        },
        {
            id: 8,
            name: 'Quản Lý',
            // active: path === config.routes.approve,
            path: config.routes.manageStudent,
            isAdmin: role === 'R5' || role === 'R4' || role === 'R3',
        },
    ];

    useEffect(() => {
        if (state.userInfor && state.userInfor.data) {
            setRole(state.userInfor.data.roleId);
            // console.log(role);
        }
    }, [role, state]);
    return (
        <div>
            <ul className={style.navbarList}>
                {privateRoutes.map((router, index) => {
                    if (router.isAdmin === false) {
                        return null;
                    }
                    return (
                        <NavLink to={router.path} key={index} className={`${style.navbarIitem}`}>
                            <li className={style.navbarLi}>
                                {/* <i className={router.icon} style={{ fontSize: '18px' }}></i> */}
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
