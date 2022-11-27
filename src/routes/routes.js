import config from '@/config';

import Home from '@/pages/Home/index';
import Login from '@/pages/Login/index';
import Register from '@/pages/Register/index';
import Profile from '@/pages/Profile/index';
import NotFound from '@/pages/NotFound';
import LeanRedux from '@/pages/LeanRedux/index';
// import LeanReactContext from '@/pages/LeanReactContext/index';
// Public routes
const publicRoutes = [
    { path: config.routes.home, component: Home, layout: null },
    { path: config.routes.login, component: Login, layout: null },
    { path: config.routes.register, component: Register, layout: null },
    { path: config.routes.profile, component: Profile },
    { path: config.routes.notFound, component: NotFound, layout: null },
    { path: '/leanRedux', component: LeanRedux },
    // { path: '/leanReactContext', component: LeanReactContext },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
