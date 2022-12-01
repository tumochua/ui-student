import config from '@/config';

import Home from '@/pages/Home/index';
import Login from '@/pages/Login/index';
import Register from '@/pages/Register/index';
import Profile from '@/pages/Profile/index';
import Notification from '@/pages/Notification';
import Post from '@/pages/Post';
import Share from '@/pages/Share';

import Translate from '@/translate';

import NotFound from '@/pages/NotFound';

// import en from '../translate/en/translation.json';
// import vi from '../translate/vi/translation.json';

// import LeanRedux from '@/pages/LeanRedux/index';
// import LeanReactContext from '@/pages/LeanReactContext/index';
// Public routes

const publicRoutes = [
    { path: config.routes.home, component: Home, layout: null },
    { path: config.routes.login, component: Login, layout: null },
    { path: config.routes.register, component: Register, layout: null },
    { path: config.routes.translate, component: Translate, layout: null },

    { path: config.routes.notFound, component: NotFound, layout: null },
    // { path: '/leanRedux', component: LeanRedux },
    // { path: '/leanReactContext', component: LeanReactContext },
];

const privateRoutes = [
    { path: config.routes.profile, component: Profile, nameEn: 'Home', nameVi: 'Trang chủ', icon: 'fa-solid fa-house' },
    {
        path: config.routes.notification,
        component: Notification,
        nameEn: 'Notification',
        nameVi: 'Thông báo',
        icon: 'fa-solid fa-bell',
    },
    {
        path: config.routes.share,
        component: Share,
        nameEn: 'Share',
        nameVi: 'Chia sẻ thông tin',
        icon: 'fa-solid fa-share-nodes',
    },
    { path: config.routes.post, component: Post, nameEn: 'Post', nameVi: 'Viết bài', icon: 'fa-solid fa-blog' },
    // { path: config.routes.login, component: Login, layout: null },
];

export { publicRoutes, privateRoutes };
