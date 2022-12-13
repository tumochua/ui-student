import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import style from './Post.module.scss';
import { apiGetListPosts } from '@/services/apis';
import { handleConvertRimestampToDate } from '@/use/Date';

import config from '@/config';

function Post() {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const [posts, setPosts] = useState(null);
    // const [currentDate, setCurrentDate] = useState(null);
    // const timestamp = 1670909981387;
    // const timestamp = new Date().getTime();
    // const timestamp = 1670905635151;
    // const date = new Date(timestamp);

    // console.log(date);
    // handleConvertRimestampToDate(timestamp, new Date());

    // const currentDay = handleConvertRimestampToDate(timestamp, new Date());
    // console.log('currentDay', currentDay);
    useEffect(() => {
        (async () => {
            const response = await apiGetListPosts();
            // console.log('response', response.data.posts);
            // console.log('response', response.data.posts[0].postData);
            if (response.data.statusCode === 2) {
                setPosts(response.data);
            }
        })();
    }, []);

    const handleDetailPost = (id) => {
        // console.log('posts', id);
        navigate(config.routes.detailPost, { state: { id: id } });
        // navigate(`/detail-post/${id}`);
    };

    return (
        <>
            <h1> {t('Blog.featuredPosts')}</h1>
            <div className={style.container}>
                {posts &&
                    posts.posts.map((post) => {
                        // console.log('post', post.date);
                        return (
                            <div className={style.postCards} key={post.id} onClick={() => handleDetailPost(post.id)}>
                                <div className={style.postCardImage}>
                                    <img
                                        src="https://www.w3schools.com/css/img_5terre_wide.jpg"
                                        alt=""
                                        className={style.image}
                                    />
                                </div>
                                <div className={style.title}>{post.title}</div>
                                <div className={style.cardInfor}>
                                    <img src={post.postData.image} alt="avatar" className={style.avatar} />
                                    <div>{post.postData.fullName}</div>
                                    {/* <span>{console.log(handleConvertRimestampToDate(post.date, new Date()))}</span> */}
                                    <span>{handleConvertRimestampToDate(post.date, new Date())}</span>
                                </div>
                            </div>
                        );
                    })}
            </div>

            {/* {posts && <div dangerouslySetInnerHTML={{ __html: `${posts.posts[0].contentHTML}` }}></div>} */}
        </>
    );
}

export default Post;
