import Home from '@/pages/Home/index';
import Profile from '@/pages/Profile/index';

// Public routes
const publicRoutes = [
    { path: '/', component: Home },
    { path: '/profile', component: Profile },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
