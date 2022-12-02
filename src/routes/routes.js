import config from '@/config';

import Home from '@/pages/Home/index';
import Login from '@/pages/Login/index';
import Register from '@/pages/Register/index';
import Profile from '@/pages/Profile/index';
import Notification from '@/pages/Notification';
import Post from '@/pages/Post';
import Share from '@/pages/Share';

import NotFound from '@/pages/NotFound';

// import LeanRedux from '@/pages/LeanRedux/index';
import LeanReactContext from '@/pages/LeanReactContext/index';
const publicRoutes = [
    { path: config.routes.home, component: Home, layout: null },
    { path: config.routes.login, component: Login, layout: null },
    { path: config.routes.register, component: Register, layout: null },

    { path: config.routes.notFound, component: NotFound, layout: null },
    // { path: '/leanRedux', component: LeanRedux },
    { path: '/leanReactContext', component: LeanReactContext },
];

const privateRoutes = [
    {
        id: 1,
        path: config.routes.profile,
        component: Profile,
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
        path: config.routes.post,
        component: Post,
        icon: 'fa-solid fa-blog',
        name: 'Navbar.post',
    },
    // { path: config.routes.login, component: Login, layout: null },
];

export { publicRoutes, privateRoutes };
