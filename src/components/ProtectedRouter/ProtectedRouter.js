import { Outlet, Navigate } from 'react-router-dom';
import config from '@/config';
import Cookies from 'js-cookie';
function ProtectedRouter() {
    const accessToken = Cookies.get('accessToken');
    const refreshToken = Cookies.get('refreshToken');
    const isLogin = !accessToken || refreshToken;
    return isLogin ? <Outlet /> : <Navigate to={config.routes.login} />;
}

export default ProtectedRouter;
