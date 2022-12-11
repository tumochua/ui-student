const routes = {
    home: '/',
    login: '/login',
    register: '/register',
    translate: '/translate',

    /// profile
    profilePersonalInfo: '/profile/personalinfo',
    profileEducationalInfo: '/profile/educationalinfo',
    profileFamilyInfo: '/profile/familyinfo',
    profileProctorDetails: '/profile/proctordetails',
    profileHostelDetails: '/profile/hosteldetails',
    blog: '/blog',

    editUser: '/eidt-user/:id',
    notification: '/notification',
    share: '/share',
    post: '/post',

    /// not found
    notFound: '*',
};

export default routes;
