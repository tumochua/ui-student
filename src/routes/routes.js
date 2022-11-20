import config from '@/config';

import Home from '@/pages/Home/index';
import Login from '@/pages/Login/index';
import Register from '@/pages/Register/index';
import Profile from '@/pages/Profile/index';
// import LeanRedux from '@/pages/LeanRedux/index';
// import LeanReactContext from '@/pages/LeanReactContext/index';
console.log('check config', config);
// Public routes
const publicRoutes = [
    { path: config.routes.home, component: Home },
    { path: config.routes.login, component: Login },
    { path: config.routes.register, component: Register },
    { path: config.routes.profile, component: Profile },
    // { path: '/leanRedux', component: LeanRedux },
    // { path: '/leanReactContext', component: LeanReactContext },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
