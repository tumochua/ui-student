import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import style from './Post.module.scss';
import { apiGetListPosts } from '@/services/apis';
import { handleConvertRimestampToDate } from '@/use/Date';

import config from '@/config';
import MyButton from '@/components/Button/MyButton';
import MyInput from '@/components/Input/MyInput';

function Post() {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const [posts, setPosts] = useState(null);
    const [seachPosts, setSeachPosts] = useState('');
    const [tabTypePosts, setTabTypePosts] = useState([
        {
            id: 1,
            medium: true,
            active: false,
            name: t('Blog.learn'),
        },
        {
            id: 2,
            medium: true,
            active: false,
            name: t('Blog.entertainment'),
        },
        {
            id: 3,
            medium: true,
            active: false,
            name: t('Blog.sporting'),
        },
        {
            id: 4,
            medium: true,
            active: false,
            name: t('Blog.q&a'),
        },
        {
            id: 5,
            medium: true,
            active: false,
            name: t('Blog.other'),
        },
    ]);
    useEffect(() => {
        (async () => {
            const response = await apiGetListPosts();
            // console.log('response', response.data.posts);
            // console.log('response', response.data.posts[0].userData);
            if (response.data.statusCode === 2) {
                setPosts(response.data.posts.reverse());
            }
        })();
    }, []);

    const handleDetailPost = (id) => {
        // console.log('posts', id);
        navigate(config.routes.detailPost, { state: { id: id } });
        // navigate(`/detail-post/${id}`);
    };
    const handleOnchangeSeach = (data) => {
        setSeachPosts(data.value);
    };
    const handleChangeTypeSeach = (id) => {
        const newState = tabTypePosts.map((tab) => {
            if (tab.id === id) {
                return {
                    ...tab,
                    active: true,
                };
            } else {
                return {
                    ...tab,
                    active: false,
                };
            }
        });
        setTabTypePosts(newState);
    };

    return (
        <>
            <div className={style.headers}>
                <h1> {t('Blog.featuredPosts')}</h1>
                <div className={style.seachCtn}>
                    <MyInput
                        name="seachPosts"
                        handleOnchange={handleOnchangeSeach}
                        value={seachPosts}
                        placeholder="seach posts"
                    ></MyInput>
                    <i className={`fa-solid fa-magnifying-glass ${style.icon}`}></i>
                </div>
            </div>
            <div className={style.tabCtn}>
                {tabTypePosts &&
                    tabTypePosts.map((tab) => {
                        return (
                            <MyButton
                                medium={tab.medium}
                                key={tab.id}
                                success={tab.active ? true : false}
                                hanldeClick={() => handleChangeTypeSeach(tab.id)}
                            >
                                {tab.name}
                            </MyButton>
                        );
                    })}
            </div>
            <div className={style.container}>
                {posts &&
                    posts.map((post) => {
                        return (
                            <div className={style.postCards} key={post.id} onClick={() => handleDetailPost(post.id)}>
                                <div className={style.postCardImage}>
                                    <img
                                        // src="https://www.salonlfc.com/wp-content/uploads/2018/01/image-not-found-1-scaled-1150x647.png"
                                        src={
                                            post.image
                                                ? post.image
                                                : 'https://www.salonlfc.com/wp-content/uploads/2018/01/image-not-found-1-scaled-1150x647.png'
                                        }
                                        alt="not found"
                                        className={style.image}
                                    />
                                </div>
                                <div className={style.title}>{post.title}</div>
                                <div className={style.cardInfor}>
                                    <img src={post.userData.image} alt="avatar" className={style.avatar} />
                                    <div>{post.userData.fullName}</div>
                                    <span>{handleConvertRimestampToDate(post.date, new Date())}</span>
                                    {/* <span>{console.log(handleConvertRimestampToDate(post.date, new Date()))}</span> */}
                                </div>
                            </div>
                        );
                    })}
            </div>
        </>
    );
}

export default Post;
