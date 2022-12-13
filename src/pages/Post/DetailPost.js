import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import style from './DetailPost.module.scss';

import { apiGetDetailPost } from '@/services/apis';
function DetailPost() {
    const { state } = useLocation();
    const postId = state.id;
    const [postDetail, setDetaiPost] = useState(null);

    useEffect(() => {
        (async () => {
            const response = await apiGetDetailPost(postId);
            // console.log('response', response.data);
            setDetaiPost(response.data);
        })();
    }, [postId]);

    return (
        <div className={style.container}>
            {postDetail && (
                <div className={style.header}>
                    <div className={style.inforWapper}>
                        <div className={style.inforLeft}>
                            <img src={postDetail.post.postData.image} alt="avatart" className={style.avatar} />
                            <div className={style.infor}>
                                <span>{postDetail.post.postData.fullName} </span>
                                <span>Time</span>
                            </div>
                        </div>
                    </div>
                    <div className={style.inforRight}>
                        <i className={`${style.iconHeart} fa-regular fa-heart`}></i>
                        <i className={`${style.iconComment} fa-regular fa-comment`}></i>
                    </div>
                </div>
            )}
            {postDetail && <div dangerouslySetInnerHTML={{ __html: `${postDetail.post.contentHTML}` }}></div>}
        </div>
    );
}

export default DetailPost;
