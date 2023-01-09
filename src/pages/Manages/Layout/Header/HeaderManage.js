import { useNavigate, useLocation } from 'react-router-dom';
import MyButton from '@/components/Button/MyButton';
import style from './HeaderManage.module.scss';
import { HEADERMANAGE } from '@/Data';
function HeaderManage() {
    const location = useLocation();
    const navigate = useNavigate();
    const routerPath = location.pathname;

    const handleChangeTab = (router) => {
        navigate(router);
    };

    return (
        <div className={style.container}>
            <ul className={style.content}>
                {HEADERMANAGE &&
                    HEADERMANAGE.map((item) => {
                        return (
                            <li key={item.id}>
                                <span>
                                    <MyButton
                                        medium
                                        hanldeClick={() => handleChangeTab(item.router)}
                                        success={routerPath === item.router}
                                    >
                                        {item.name}
                                    </MyButton>
                                </span>
                            </li>
                        );
                    })}
            </ul>
        </div>
    );
}

export default HeaderManage;
