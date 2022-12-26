import { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { useTranslation } from 'react-i18next';
import io from 'socket.io-client';
import { useNavigate } from 'react-router-dom';
import style from './Header.module.scss';
import { apiGetProfileUser, apiGetListNotification, apiCleanNotification } from '@/services/apis';
// import images from '@/assets/images';
import Modal from '@/components/Modal';
import config from '@/config';
function Header() {
    const socket = io(process.env.REACT_APP_BACKEND_URL);
    const { t, i18n } = useTranslation();
    const navigate = useNavigate();
    const [name, setName] = useState(null);
    const [userInfo, setUserInfor] = useState(null);
    const [avatar, setAvatar] = useState(null);
    const [role, setRole] = useState(null);
    const [language, setLanguage] = useState(null);
    // eslint-disable-next-line no-unused-vars
    // const [notificationData, setNotificationData] = useState([
    //     {
    //         id: 1,
    //         des: ' Chào mừng Tú Nguyễn Văn đã gia nhập F8. Hãy luôn đam mê, kiên trì và theo đuổi mục tiêu tới cùng bạn nhé ❤️',
    //     },
    //     {
    //         id: 2,
    //         des: ' Chào mừng Tú Nguyễn Văn đã gia nhập F8. Hãy luôn đam mê, kiên trì và theo đuổi mục tiêu tới cùng bạn nhé ❤️',
    //     },
    //     {
    //         id: 3,
    //         des: ' Chào mừng Tú Nguyễn Văn đã gia nhập F8. Hãy luôn đam mê, kiên trì và theo đuổi mục tiêu tới cùng bạn nhé ❤️',
    //     },
    //     {
    //         id: 4,
    //         des: ' Chào mừng Tú Nguyễn Văn đã gia nhập F8. Hãy luôn đam mê, kiên trì và theo đuổi mục tiêu tới cùng bạn nhé ❤️',
    //     },
    //     {
    //         id: 5,
    //         des: ' Chào mừng Tú Nguyễn Văn đã gia nhập F8. Hãy luôn đam mê, kiên trì và theo đuổi mục tiêu tới cùng bạn nhé ❤️',
    //     },
    // ]);
    const [notificationData, setNotificationData] = useState(null);
    const [isModalNotification, setIsModalNotification] = useState(false);
    const [sizeNotification, setSizeNotification] = useState({
        size: null,
    });
    const [isReRender, setIsReRender] = useState(false);
    // const [isRead, setIsRead] = useState(false);

    useEffect(() => {
        if (userInfo) {
            // console.log(userInfo);
            setName(userInfo.fullName);
            setAvatar(userInfo.image);
            setLanguage(i18n.language);
        }
    }, [i18n.language, name, userInfo]);

    useEffect(() => {
        (async () => {
            const response = await apiGetListNotification();
            // console.log(response.data);
            if (response.data.statusCode) {
                setNotificationData(response.data.data);
            }
        })();
    }, [isReRender]);

    useEffect(() => {
        if (notificationData) {
            // console.log(notificationData);
            const newNotificationData = notificationData.filter((element) => {
                return element.readId === 'D0';
            });
            // console.log(newNotificationData);
            // console.log(sizeNotification);
            if (newNotificationData.length > 0) {
                setSizeNotification((prevState) => {
                    return { ...prevState, size: newNotificationData.length };
                });
            } else {
                setSizeNotification(null);
            }
        }
    }, [notificationData]);

    useEffect(() => {
        socket.on('resCreateMesPosts', (arg) => {
            // console.log('resCreateMesPosts');
            // const newArg = [arg];
            // console.log(newArg);
            setIsReRender(!isReRender);
        });
        socket.on('resApprovedPosts', (arg) => {
            setIsReRender(!isReRender);
            // console.log('resApprovedPosts');
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (language) {
            language === 'vi' ? setRole(userInfo.roleData.valueVi) : setRole(userInfo.roleData.valueEn);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [language]);

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

    return (
        <div className={style.headerWapper}>
            <div className={style.headerLeft}>
                <img
                    src="https://previews.123rf.com/images/scrap4vec/scrap4vec2005/scrap4vec200500184/148077898-logo-design-of-student-child-or-people-with-book-template-in-creative-shape-isolate-vector-illustrat.jpg"
                    alt="abc"
                    className={style.logo}
                />
                {/* <img src={images.logo} alt="cao đẳng bách khoa" className={style.logo} /> */}
                <h3>{t('Headers.studentPortal')}</h3>
            </div>
            <div className={style.userInfor}>
                <div className={style.containerBell} onClick={handleIsModalNotification}>
                    <i className={`fa-regular fa-bell ${style.iconBell}`}></i>
                    <Modal position="topCenter" showModal={isModalNotification}>
                        <h1>{t('Notification.notification')}</h1>
                        <ul className={style.moDalContent}>
                            {notificationData &&
                                notificationData.map((item) => {
                                    return (
                                        <li key={item.id} className={style.itemNotification}>
                                            <div
                                                className={style.notificationContent}
                                                // onClick={handleNotificationDetaiPost(item.id, item.statusId)}
                                            >
                                                <span>
                                                    {avatar && (
                                                        <img src={avatar} alt="avatar" className={style.avatar} />
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
                    </Modal>
                    {sizeNotification && sizeNotification.size > 0 && (
                        <span className={style.sizeNotification}>{sizeNotification.size}</span>
                    )}
                </div>
                {avatar && <img src={avatar} alt="avatar" className={style.avatar} />}
                <div className={style.users}>
                    <span> {name}</span>
                    <span>{role}</span>
                </div>
            </div>
        </div>
    );
}

const mapStateToProps = (state) => ({
    userRedux: state.users.user,
});

export default connect(mapStateToProps, {})(Header);
