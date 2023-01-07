import { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { useTranslation } from 'react-i18next';
import io from 'socket.io-client';
import { useNavigate, useLocation } from 'react-router-dom';
import style from './Header.module.scss';
///  apiGetListNotification, apiCleanNotification
import { apiGetProfileUser, apiGetListNotification, apiCleanNotification } from '@/services/apis';
import { useContextStore } from '@/context';
// import images from '@/assets/images';
import Modal from '@/components/Modal';
import MyButton from '@/components/Button/MyButton';
import config from '@/config';
function Header() {
    const socket = io(process.env.REACT_APP_BACKEND_URL);
    const { t, i18n } = useTranslation();
    const navigate = useNavigate();
    const location = useLocation();
    const [state] = useContextStore();
    const [name, setName] = useState(null);
    const [userInfo, setUserInfor] = useState(null);
    const [avatar, setAvatar] = useState(null);
    const [role, setRole] = useState(null);
    const [language, setLanguage] = useState(null);
    const [notificationData, setNotificationData] = useState(null);
    const [isModalNotification, setIsModalNotification] = useState(false);
    const [sizeNotification, setSizeNotification] = useState(null);
    const [isReRender, setIsReRender] = useState(false);
    const [width, setWidth] = useState(window.innerWidth);
    const [isIconTalet, setIsIconTablet] = useState(false);
    const [isNavBar, setIsNavBar] = useState(false);
    const [roleId, setRoleId] = useState(null);

    const path = location.pathname;
    const tabButtom = [
        {
            id: 1,
            name: t('Profile.Headers.TabButton.personalInfo'),
            active: path === config.routes.profilePersonalInfo,
            router: config.routes.profilePersonalInfo,
            isAdmin: true,
            icon: 'fa-solid fa-user',
        },
        {
            id: 2,
            name: t('Profile.Headers.TabButton.managePosts'),
            active: path === config.routes.managePosts,
            router: config.routes.managePosts,
            isAdmin: true,
        },
        {
            id: 3,
            name: t('Profile.Headers.TabButton.familyInfo'),
            active: path === config.routes.profileFamilyInfo,
            router: config.routes.profileFamilyInfo,
            isAdmin: true,
            icon: 'fa-solid fa-family',
        },
        // {
        //     id: 4,
        //     name: t('Profile.Headers.TabButton.proctorDetails'),
        //     active: path === config.routes.profileProctorDetails,
        //     router: config.routes.profileProctorDetails,
        //     isAdmin: true,
        // },
        // {
        //     id: 5,
        //     name: t('Profile.Headers.TabButton.hostelDetails'),
        //     active: path === config.routes.profileHostelDetails,
        //     router: config.routes.profileHostelDetails,
        //     isAdmin: true,
        // },
        {
            id: 6,
            name: t('Profile.Headers.TabButton.blog'),
            active: path === config.routes.blog,
            router: config.routes.blog,
            isAdmin: true,
        },
        {
            id: 7,
            name: t('Profile.Headers.TabButton.approve'),
            active: path === config.routes.approve,
            router: config.routes.approve,
            isAdmin: roleId === 'R5' || roleId === 'R4' || roleId === 'R3',
        },
        {
            id: 8,
            name: 'Teacher',
            active: path === config.routes.teacher,
            router: config.routes.teacher,
            isAdmin: roleId === 'R5' || roleId === 'R4' || roleId === 'R3' || roleId === 'R2',
        },
        {
            id: 10,
            name: t('Profile.Headers.TabButton.edit'),
            active: path === config.routes.editUser,
            router: config.routes.editUser,
            isAdmin: true,
        },
        // {
        //     id: 11,
        //     name: 'Trang Chủ',
        //     active: path === config.routes.editUser,
        //     router: config.routes.editUser,
        //     isAdmin: roleId === 'R5' || roleId === 'R4' || roleId === 'R3' || roleId === 'R2',
        // },
        {
            id: 12,
            name: 'Thông Báo',
            active: path === config.routes.notification,
            router: config.routes.notification,
            isAdmin: true,
        },
        {
            id: 13,
            name: 'Bài Viết',
            active: path === `/post/page=1`,
            router: `/post/page=1`,
            isAdmin: true,
        },
    ];

    useEffect(() => {
        if (state.userInfor && state.userInfor.data) {
            setRoleId(state.userInfor.data.roleId);
        }
    }, [roleId, state]);
    useEffect(() => {
        if (width < 1023) {
            setIsIconTablet(true);
        } else {
            setIsIconTablet(false);
        }

        const handleResize = () => {
            // console.log('change', window.innerWidth);
            setWidth(window.innerWidth);
            if (width < 1023) {
                setIsIconTablet(true);
            } else {
                setIsIconTablet(false);
            }
        };

        window.addEventListener('resize', handleResize);

        return () => {
            return window.removeEventListener('resize', handleResize);
        };
    }, [width]);
    useEffect(() => {
        if (userInfo) {
            // console.log(userInfo);
            setName(userInfo.fullName);
            setAvatar(userInfo.image);
            setLanguage(i18n.language);
            // setUserId(userInfo.id);
        }
    }, [i18n.language, name, userInfo]);

    useEffect(() => {
        (async () => {
            // console.log(isReRender);
            const response = await apiGetListNotification();
            // console.log(response.data);
            if (response.data.statusCode === 2) {
                setNotificationData(response.data.data);
                setSizeNotification(response.data.sizeNotification);
            }
        })();
    }, [isReRender]);

    useEffect(() => {
        socket.on('resCreateMesPosts', (arg) => {
            setIsReRender(!isReRender);
        });
        socket.on('resApprovedPosts', (arg) => {
            setIsReRender(!isReRender);
        });
        socket.on('resDeleteNotificationPosts', () => {
            setIsReRender(!isReRender);
        });

        socket.on('resNotificationLike', (arg) => {
            // console.log('re-render');
            setIsReRender(!isReRender);
        });
        socket.on('resNotificationComment', (arg) => {
            setIsReRender(!isReRender);
        });
        socket.on('resNotificationLikeComment', (arg) => {
            // console.log(arg);
            setIsReRender(!isReRender);
        });
        // socket.on('resDeleteNotificationPosts',() )
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (language) {
            language === 'vi' ? setRole(userInfo.roleData.valueVi) : setRole(userInfo.roleData.valueEn);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [language]);

    useEffect(() => {
        if (userInfo) {
            // console.log(userInfo);
        }
    }, [userInfo]);

    useEffect(() => {
        (async () => {
            const response = await apiGetProfileUser();
            if (response.data.statusCode === 2) {
                setUserInfor(response.data.data);
            }
        })();
    }, []);
    useEffect(() => {
        document.addEventListener('click', handleClickOutside);
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, []);

    const handleIsModalNotification = (event) => {
        event.stopPropagation();
        setIsModalNotification(!isModalNotification);
        (async () => {
            const response = await apiCleanNotification();
            if (response.data.statusCode === 2) {
                // socket.emit('readPostsNotifications');
                setIsReRender(!isReRender);
            }
        })();
    };

    const handleClickOutside = () => {
        setIsModalNotification(false);
    };

    // const handleNotificationDetaiPost = (postsId, statusId) => {
    //     if (statusId === 'T1') {
    //         // console.log(postsId);
    //         navigate(config.routes.detailPost, { state: { id: postsId } });
    //     }
    // };

    const handleSeeAllNotification = () => {
        navigate(config.routes.notification);
    };
    const handleShowNavBar = () => {
        setIsNavBar(!isNavBar);
    };

    const handleCloseModal = (type) => {
        if (type === 'outside') {
            setIsNavBar(false);
        }
    };
    const handleCloseModalInside = (event) => {
        event.stopPropagation();
    };
    const handleNavBar = (router, id) => {
        // console.log(router, id);
        navigate(router);
        setIsNavBar(false);
    };

    return (
        <div className={style.headerWapper}>
            {isIconTalet && (
                <div>
                    <span onClick={handleShowNavBar}>
                        <i className={`fa-solid fa-bars ${style.iconBars}`}></i>
                    </span>
                    {isNavBar && (
                        <div className={style.container} onClick={() => handleCloseModal('outside')}>
                            <div className={style.content} onClick={handleCloseModalInside}>
                                <span onClick={handleShowNavBar}>
                                    <i className={`fa-solid fa-xmark ${style.iconClose}`}></i>
                                </span>
                                <div className={style.body}>
                                    <div className={style.userWapper}>
                                        <span>
                                            {avatar ? (
                                                <img src={avatar} alt="avatar" className={style.avatar} />
                                            ) : (
                                                <img
                                                    src="https://as2.ftcdn.net/v2/jpg/03/32/59/65/1000_F_332596535_lAdLhf6KzbW6PWXBWeIFTovTii1drkbT.jpg"
                                                    alt="avatar"
                                                    className={style.avatar}
                                                />
                                            )}
                                        </span>
                                        <div className={style.users}>
                                            <span className={style.fullName}>{name}</span>
                                            <span>{role}</span>
                                        </div>
                                    </div>
                                    <div className={style.navWapper}>
                                        <ul className={style.navLists}>
                                            {tabButtom &&
                                                tabButtom.map((tab) => {
                                                    return (
                                                        <li key={tab.id} className={style.navItem}>
                                                            {tab.isAdmin && (
                                                                <div
                                                                    // hanldeClick={() => handleChangeTab(tab.router, tab.id)}
                                                                    className={`${style.item} ${
                                                                        tab.active ? style.active : ''
                                                                    }`}
                                                                    onClick={() => handleNavBar(tab.router, tab.id)}
                                                                >
                                                                    {tab.name}
                                                                </div>
                                                            )}
                                                        </li>
                                                    );
                                                })}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            )}
            <div className={style.headerLeft}>
                <img
                    src="https://previews.123rf.com/images/scrap4vec/scrap4vec2005/scrap4vec200500184/148077898-logo-design-of-student-child-or-people-with-book-template-in-creative-shape-isolate-vector-illustrat.jpg"
                    alt="abc"
                    className={style.logo}
                />
                <h3>{t('Headers.studentPortal')}</h3>
            </div>
            <div className={style.userInfor}>
                <div className={style.containerBell} onClick={handleIsModalNotification}>
                    <i className={`fa-regular fa-bell ${style.iconBell}`}></i>
                    <div className={style.modalWapperNotification}>
                        {/* showModal={isModalNotification} */}
                        <Modal position="topCenter" showModal={isModalNotification}>
                            <h1>{t('Notification.notification')}</h1>
                            <ul className={style.moDalContent}>
                                {notificationData &&
                                    notificationData.length > 0 &&
                                    notificationData.map((item, index) => {
                                        if (index >= 4) {
                                            return null;
                                        }
                                        return (
                                            <li key={item.id} className={style.itemNotification}>
                                                <div
                                                    className={style.notificationContent}
                                                    // onClick={handleNotificationDetaiPost(item.id, item.statusId)}
                                                >
                                                    <span>
                                                        {avatar ? (
                                                            <img src={avatar} alt="avatar" className={style.avatar} />
                                                        ) : (
                                                            <img
                                                                src="https://as2.ftcdn.net/v2/jpg/03/32/59/65/1000_F_332596535_lAdLhf6KzbW6PWXBWeIFTovTii1drkbT.jpg"
                                                                alt="avatar"
                                                                className={style.avatar}
                                                                // width={100}
                                                                // height={100}
                                                            />
                                                        )}
                                                    </span>
                                                    <div>
                                                        <h4>{item.description}</h4>
                                                        <span>{item.title}</span>
                                                    </div>
                                                </div>
                                            </li>
                                        );
                                    })}
                            </ul>
                            <div className={style.bottom}>
                                <MyButton border hanldeClick={handleSeeAllNotification}>
                                    {t('Notification.seeAll')}
                                </MyButton>
                            </div>
                        </Modal>
                    </div>
                    {sizeNotification && <span className={style.sizeNotification}>{sizeNotification}</span>}
                </div>
                {/* {avatar && <img src={avatar} alt="avatar" className={style.avatar} />} */}
                <div className={style.userWapper}>
                    <span>
                        {avatar ? (
                            <img src={avatar} alt="avatar" className={style.avatar} />
                        ) : (
                            <img
                                src="https://as2.ftcdn.net/v2/jpg/03/32/59/65/1000_F_332596535_lAdLhf6KzbW6PWXBWeIFTovTii1drkbT.jpg"
                                alt="avatar"
                                className={style.avatar}
                            />
                        )}
                    </span>
                    <div className={style.users}>
                        <span> {name}</span>
                        <span>{role}</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

const mapStateToProps = (state) => ({
    userRedux: state.users.user,
});

export default connect(mapStateToProps, {})(Header);
