import { useState, useEffect, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import style from './DetailPost.module.scss';
import { handleConvertRimestampToDate } from '@/use/Date';
import { apiGetDetailPost, apiLikePost } from '@/services/apis';
function DetailPost() {
    const routerData = useLocation();
    const postId = routerData.state.id;
    const [postDetail, setDetaiPost] = useState(null);
    const [sizeLike, setSizeLike] = useState(null);
    const [sumLike, setSumLike] = useState(null);
    const [isCallApi, setIsCallApi] = useState(false);
    const [isUserLikePosts, setIsUserLikePosts] = useState(false);
    const [idUserStore, setIsUserStore] = useState(null);
    useEffect(() => {
        (async () => {
            const response = await apiGetDetailPost(postId);
            console.log('response', response.data);
            if (response) {
                setDetaiPost(response.data);
                setSizeLike(response.data.post.likeData);
            }
        })();
    }, [postId, isCallApi]);

    const handleLike = async (id) => {
        await apiLikePost({
            postId: id,
            name: 'like',
        });
        setIsCallApi(!isCallApi);
    };
    useMemo(() => {
        const userLocalStorage = JSON.parse(localStorage.getItem('user'));
        if (userLocalStorage) {
            setIsUserStore(userLocalStorage.data.user.id);
            if (sizeLike && idUserStore) {
                // console.log(sizeLike);
                // console.log(idUserStore);
                const result = sizeLike.some((element) => {
                    return element.userId === idUserStore;
                });
                // console.log(result);
                if (result) {
                    setIsUserLikePosts(true);
                } else {
                    setIsUserLikePosts(false);
                }
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [idUserStore, sizeLike, isUserLikePosts]);

    useEffect(() => {
        // console.log(sizeLike);
        if (sizeLike) {
            const coppyLike = [];
            sizeLike.forEach((element) => {
                coppyLike.push(element.size);
            });
            // console.log('coppyLike', coppyLike);

            const sum = coppyLike.reduce(handleSumLike, 0);

            function handleSumLike(accumulator, item) {
                return accumulator + item;
            }
            setSumLike(sum);
        }
    }, [sizeLike, idUserStore]);

    return (
        <div className={style.container}>
            {postDetail && (
                <div className={style.header}>
                    <div className={style.inforWapper}>
                        <div className={style.inforLeft}>
                            <img src={postDetail.post.userData.image} alt="avatart" className={style.avatar} />
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
                                    isUserLikePosts ? ` fa-solid fa-heart ${style.like}` : 'fa-regular fa-heart'
                                    // isUserLikePosts ? `fa-solid fa-heart ${style.like}` : 'fa-regular fa-heart'
                                }`}
                            ></i>
                            <span>{sumLike && sumLike}</span>
                            {/* {JSON.stringify(isUserLikePosts)} */}
                        </div>
                        <div>
                            <i className={`${style.iconComment} fa-regular fa-comment`}></i>
                        </div>
                    </div>
                </div>
            )}
            {postDetail && <div dangerouslySetInnerHTML={{ __html: `${postDetail.post.contentHTML}` }}></div>}
        </div>
    );
}

export default DetailPost;
