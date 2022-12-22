import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import classNames from 'classnames';
import style from './Menus.module.scss';
function Menus({ position, menus, isMenuPosts, postId, onChangeItemMenu }) {
    const { t } = useTranslation();
    const menusClassess = classNames(style.baseMenu, {
        [style.topRight]: position === 'top-right',
    });
    return (
        <>
            {isMenuPosts && (
                <ul className={menusClassess}>
                    {menus &&
                        menus.map((itemMenu) => {
                            return (
                                <li
                                    key={itemMenu.id}
                                    className={style.itemMenu}
                                    onClick={(event) => onChangeItemMenu(itemMenu.value, postId, event)}
                                >
                                    <i className={itemMenu.icon && itemMenu.icon}></i>
                                    <span>{t(`${itemMenu.text}`)}</span>
                                </li>
                            );
                        })}
                </ul>
            )}
        </>
    );
}

// export default Menus;
export default memo(Menus);
