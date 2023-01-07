import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import style from './ManagePosts.module.scss';
import config from '@/config';
import { apiGetAllPostsByUser, apiDeletePosts } from '@/services/apis';
import Menus from '@/components/Menus';
import { MENUS } from '@/Data';
function ManagePosts() {
    const navigate = useNavigate();
    const [postsUser, setPostsUser] = useState(null);
    const [isMenu, setisMenu] = useState(null);
    const [postsData, setPostsData] = useState(null);
    const [isCallApi, setIsCallApi] = useState(false);
    const wrapperRef = useRef(null);
    useEffect(() => {
        (async () => {
            const response = await apiGetAllPostsByUser();
            if (response.data.statusCode) {
                setPostsUser(response.data);
            }
        })();
    }, [isCallApi]);
    useEffect(() => {
        if (postsUser) {
            // console.log(postsUser);
        }
    }, [postsUser]);
    useEffect(() => {
        document.addEventListener('click', handleClickOutside);
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, []);

    useEffect(() => {
        if (postsData) {
            if (postsData.type === 'edit') {
                navigate(`/edit-posts/${postsData.postId}`, { state: { id: postsData.postId } });
            }
            if (postsData.type === 'delete') {
                (async () => {
                    const response = await apiDeletePosts(postsData);
                    // console.log(response.data);
                    if (response.data.statusCode === 2) {
                        setIsCallApi(!isCallApi);
                    }
                })();
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isCallApi, postsData]);

    const handleClickOutside = () => {
        setisMenu(false);
        // setisMenu(!isMenu);
    };

    const handleDetailPosts = (postsId) => {
        navigate(config.routes.detailPost, { state: { id: postsId } });
    };

    const handleChangeMenu = (id, event) => {
        event.stopPropagation();
        setisMenu(id);
        if (isMenu) {
            setisMenu(false);
        }
    };

    const handleChangeItemMenu = (type, postId) => {
        setPostsData({
            type,
            postId,
        });
    };

    return (
        <>
            {postsUser &&
                postsUser.data.map((posts) => {
                    return (
                        <div key={posts.id} className={style.cardPosts}>
                            <div
                                onClick={(event) => handleChangeMenu(posts.id, event)}
                                className={style.options}
                                ref={wrapperRef}
                            >
                                <i className={`fa-solid fa-ellipsis ${style.iconOptions}`}></i>
                                {/* {JSON.stringify(isMenu)} */}
                                <Menus
                                    position="top-right"
                                    menus={MENUS}
                                    isMenu={isMenu === posts.id ? true : false}
                                    postId={posts.id}
                                    onChangeItemMenu={handleChangeItemMenu}
                                ></Menus>
                            </div>
                            <div className={style.cardBody}>
                                <div className={style.postsLeft}>
                                    <h2 className={style.title} onClick={() => handleDetailPosts(posts.id)}>
                                        {posts.title}
                                    </h2>
                                    <div
                                        className={style.description}
                                        dangerouslySetInnerHTML={{ __html: `${posts.contentHTML}` }}
                                    ></div>
                                </div>
                                <div className={style.postsRight}>
                                    <img
                                        onClick={() => handleDetailPosts(posts.id)}
                                        className={style.postsImage}
                                        src={
                                            posts.image
                                                ? posts.image
                                                : 'https://www.salonlfc.com/wp-content/uploads/2018/01/image-not-found-1-scaled-1150x647.png'
                                        }
                                        alt=""
                                        width={100}
                                        height={100}
                                    />
                                </div>
                            </div>
                        </div>
                    );
                })}
        </>
    );
}

export default ManagePosts;
