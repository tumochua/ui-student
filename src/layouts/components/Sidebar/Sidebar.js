import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { privateRoutes } from '@/routes';
import style from './Sidebar.module.scss';
import './Sidebar.module.scss';
function Sidebar() {
    const { t } = useTranslation();
    return (
        <div>
            <ul className={style.navbarList}>
                {privateRoutes.map((router, index) => {
                    // const path = router.path.indexOf('/:id') > 1 ? `${router.path}/${id}` : `${router.path}`;
                    // console.log('path', path);
                    return (
                        <NavLink to={router.path} key={index} className={`${style.navbarIitem}`}>
                            <li className={style.navbarLi}>
                                <i className={router.icon} style={{ fontSize: '18px' }}></i>
                                <span className={style.navlinkName}>{router.nameVi}</span>
                            </li>
                        </NavLink>
                    );
                })}
            </ul>
        </div>
    );
}

export default Sidebar;
