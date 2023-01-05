import config from '@/config';

import Home from '@/pages/Home/index';
import Login from '@/pages/Login/index';
import Register from '@/pages/Register/index';
import Profile from '@/pages/Profile/index';
import Notification from '@/pages/Notification';
import Post from '@/pages/Post';
import Blog from '@/pages/WriteBlog';
import DetailPost from '@/pages/Post/DetailPost';
import Share from '@/pages/Share';

// import HeaderProfile from '@/layouts/components/HeaderProfile';
import DefaultHeaderProfile from '@/layouts/components/HeaderProfileOnly';
import EditUser from '@/pages/Profile/Edit/EditUser';

import PersonalInfo from '@/pages/PersonalInfo';
import ManagePosts from '@/pages/ManagePosts';
import FamilyInfo from '@/pages/FamilyInfo';
import ProctorDetails from '@/pages/ProctorDetails';
import HostelDetails from '@/pages/HostelDetails';
import EditPosts from '@/pages/ManagePosts/Edit/EditPosts';
import Approve from '@/pages/Approve';
import Teacher from '@/pages/Teacher';

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
        layout: DefaultHeaderProfile,
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
    { path: config.routes.editUser, component: EditUser, layout: DefaultHeaderProfile },
    { path: config.routes.profilePersonalInfo, component: PersonalInfo, layout: DefaultHeaderProfile },
    { path: config.routes.managePosts, component: ManagePosts, layout: DefaultHeaderProfile },
    { path: config.routes.profileFamilyInfo, component: FamilyInfo, layout: DefaultHeaderProfile },
    { path: config.routes.profileProctorDetails, component: ProctorDetails, layout: DefaultHeaderProfile },
    { path: config.routes.profileHostelDetails, component: HostelDetails, layout: DefaultHeaderProfile },
    { path: config.routes.blog, component: Blog, layout: DefaultHeaderProfile },
    { path: config.routes.detailPost, component: DetailPost },
    { path: config.routes.editPosts, component: EditPosts },
    { path: config.routes.approve, component: Approve, layout: DefaultHeaderProfile, isRole: true },
    { path: config.routes.teacher, component: Teacher, layout: DefaultHeaderProfile, isTeacher: true },
];

export { publicRoutes, privateRoutes };
