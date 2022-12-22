const routes = {
    home: '/',
    login: '/login',
    register: '/register',
    translate: '/translate',

    /// profile
    profilePersonalInfo: '/profile/personalinfo',
    profileEducationalInfo: '/profile/managePosts',
    profileFamilyInfo: '/profile/familyinfo',
    profileProctorDetails: '/profile/proctordetails',
    profileHostelDetails: '/profile/hosteldetails',
    blog: '/new-blog',
    detailPost: '/detail-post',
    approve: '/profile/approve',
    teacher: '/teacher',
    // detailPost: '/detail-post/:id',

    // editUser: '/eidt-user/:id',
    editUser: '/eidt-user',
    notification: '/notification',
    share: '/share',
    post: '/post/page:id',
    editPosts: '/edit-posts/:id',

    /// not found
    notFound: '*',
};

export default routes;
