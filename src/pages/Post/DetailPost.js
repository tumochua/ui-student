import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import style from './DetailPost.module.scss';
import { handleConvertRimestampToDate } from '@/use/Date';
//apiLikePost
import { useTranslation } from 'react-i18next';
import { apiGetDetailPost, apiLikePost, apiGetProfileUser } from '@/services/apis';
import io from 'socket.io-client';
import Comments from './Comments';
function DetailPost() {
    const socket = io(process.env.REACT_APP_BACKEND_URL);
    const { t } = useTranslation();
    const routerData = useLocation();
    const postId = routerData.state.id;
    const [postDetail, setDetaiPost] = useState(null);
    // eslint-disable-next-line no-unused-vars
    const [isCallApi, setIsCallApi] = useState(false);
    const [isLikePost, setIsLikePost] = useState(false);
    const [userId, setUserId] = useState(null);
    const [sizeLike, setSizeLike] = useState(null);
    const [dataPostId, setDataPostId] = useState(null);
    const [userData, setUserData] = useState(null);
    const [userInfo, setUserInfor] = useState(null);
    const [isComments, setIsComments] = useState(false);
    const [userName, setUserName] = useState(null);
    // const [userIdCreatePost,setuserDataUserIdCreatePost] = useState(null)
    useEffect(() => {
        (async () => {
            const response = await apiGetProfileUser();
            // console.log(response.data.data);
            if (response.data.statusCode === 2) {
                setUserInfor(response.data.data);
                setUserName(response.data.data.fullName);
            }
        })();
    }, []);
    useEffect(() => {
        (async () => {
            const response = await apiGetDetailPost(postId);
            // console.log('response', response.data);
            if (response) {
                setDetaiPost(response.data);
                setDataPostId(response.data.post.id);
                setUserData(response.data.post.userData);
                setSizeLike(response.data.post.likeData);
                // setUserIdCreatePost(response.data.post.userData)
            }
        })();
    }, [postId, isCallApi]);
    useEffect(() => {
        const userLocalStorage = JSON.parse(localStorage.getItem('user'));
        // console.log(userLocalStorage.data.user);
        if (userLocalStorage.data && userLocalStorage.data.user && userLocalStorage.data.user.id) {
            const userId = userLocalStorage.data.user.id;
            setUserId(userId);
        }
    }, []);

    useEffect(() => {
        if (userId && sizeLike && dataPostId) {
            // console.log(sizeLike, dataPostId);
            // /every
            const result = sizeLike.some((like) => {
                return like.userId === userId && like.postId === dataPostId;
            });
            if (result) {
                setIsLikePost(true);
                // setIsCallApi(!isCallApi);
            } else {
                setIsLikePost(false);
            }
        }
    }, [userId, sizeLike, dataPostId]);

    const handleLike = async (id) => {
        // console.log('change');

        // console.log('id', id);
        const response = await apiLikePost({
            postId: id,
            name: 'like',
        });
        // console.log(response);
        if (response.data.statusCode === 3) {
            setIsLikePost(false);
        } else {
            setIsLikePost(true);
            if (userData && userInfo) {
                socket.emit('notificationLikePost', {
                    userIdCreatePost: userData.id,
                    userIdLikePost: userInfo.id,
                    postId: id,
                    description: `${t('Notification.likePost')}`,
                    userName: userInfo.fullName || null,
                    typeId: 'LN',
                    readId: 'D0',
                    statusId: 'T1',
                });
            }
        }
        setIsCallApi(!isCallApi);
    };

    const handlCommentsPost = () => {
        setIsComments(true);
        // setIsAminationHide(true);
    };
    const handleCloseComment = () => {
        setIsComments(false);
        // setIsAminationHide(false);
        // setIsAminationHide(true);
        // console.log('change');
    };
    // console.log(isAminationHide);

    return (
        <>
            {
                <Comments
                    onClose={handleCloseComment}
                    isComments={isComments}
                    postId={dataPostId}
                    userId={userId}
                    userIdCreatePost={userData && userData.id}
                    userName={userName}
                ></Comments>
            }
            <div className={style.container}>
                {postDetail && (
                    <div className={style.header}>
                        <div className={style.inforWapper}>
                            <div className={style.inforLeft}>
                                {/* {console.log(postDetail.post.userData.image)} */}
                                {postDetail.post.userData.image ? (
                                    <img src={postDetail.post.userData.image} alt="avatart" className={style.avatar} />
                                ) : (
                                    <img
                                        src="https://as2.ftcdn.net/v2/jpg/03/32/59/65/1000_F_332596535_lAdLhf6KzbW6PWXBWeIFTovTii1drkbT.jpg"
                                        alt="avatar"
                                        className={style.avatar}
                                    />
                                )}
                                <div className={style.infor}>
                                    <span>{postDetail.post.userData.fullName} </span>
                                    <span>{handleConvertRimestampToDate(postDetail.post.date, new Date())}</span>
                                </div>
                            </div>
                        </div>
                        <div className={style.inforRight}>
                            {/* fa-solid fa-heart */}
                            {/* fa-regular fa-heart */}
                            <div onClick={() => handleLike(postDetail.post.id)} className={style.likes}>
                                <i
                                    className={`${style.iconHeart}  ${
                                        isLikePost ? ` fa-solid fa-heart ${style.like}` : 'fa-regular fa-heart'
                                        // isLikePost ? `fa-solid fa-heart ${style.like}` : 'fa-regular fa-heart'
                                    }`}
                                ></i>
                                {/* <i className={`${style.iconHeart} fa-regular fa-heart`}></i> */}
                                <span>{sizeLike && sizeLike.length}</span>
                                {/* {JSON.stringify(isUserLikePosts)} */}
                            </div>
                            <div onClick={handlCommentsPost}>
                                <i className={`${style.iconComment} fa-regular fa-comment`}></i>
                            </div>
                        </div>
                    </div>
                )}
                {postDetail && <div dangerouslySetInnerHTML={{ __html: `${postDetail.post.contentHTML}` }}></div>}
            </div>
        </>
    );
}

export default DetailPost;
