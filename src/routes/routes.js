import Home from '@/pages/Home/index';
import Login from '@/pages/Login/index';
import Profile from '@/pages/Profile/index';
import LeanRedux from '@/pages/LeanRedux/index';
import LeanReactContext from '@/pages/LeanReactContext/index';

// Public routes
const publicRoutes = [
    { path: '/', component: Home },
    { path: '/login', component: Login },
    { path: '/profile', component: Profile },
    { path: '/leanRedux', component: LeanRedux },
    { path: '/leanReactContext', component: LeanReactContext },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
