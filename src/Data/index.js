import config from '@/config';

export const MENUS = [
    {
        id: 1,
        value: 'edit',
        text: 'Blog.edit',
        icon: 'fa-solid fa-pen',
    },
    {
        id: 2,
        value: 'delete',
        text: 'Blog.delete',
        icon: 'fa-solid fa-trash',
    },
];

export const optionGender = [
    {
        id: 1,
        value: 'M',
        name: 'Profile.male',
    },
    {
        id: 2,
        value: 'F',
        name: 'Profile.female',
    },
    {
        id: 3,
        value: 'O',
        name: 'Profile.other',
        // selected: true,
    },
];

export const optionClass = [
    {
        id: 1,
        name: 'BK06-K14',
        value: 'BK06',
    },
    {
        id: 2,
        name: 'BK07-K14',
        value: 'BK07',
    },
    {
        id: 3,
        name: 'BK08-K14',
        value: 'BK08',
    },
];

export const HEADERMANAGE = [
    {
        id: 1,
        name: 'Student',
        router: config.routes.manageStudent,
    },
    {
        id: 2,
        name: 'Posts',
        router: config.routes.managePost,
    },
    {
        id: 3,
        name: 'Teach',
        router: config.routes.manageTeach,
    },
    {
        id: 4,
        name: 'System',
        router: config.routes.manageSystem,
    },
];

export const COURSE = [
    {
        id: 1,
        name: '',
    },
];
