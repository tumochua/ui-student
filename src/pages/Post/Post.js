import { useState, useEffect, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';
import style from './Post.module.scss';
import { apiGetListPosts, apiSearchPosts } from '@/services/apis';
import { handleConvertRimestampToDate } from '@/use/Date';

import config from '@/config';
import MyButton from '@/components/Button/MyButton';
import MyInput from '@/components/Input/MyInput';

import useDebounce from '@/hooks';

function Post() {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const params = useParams();
    const [posts, setPosts] = useState(null);
    const [searchPosts, setSearchPosts] = useState('');

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
            name: t('Blog.feedback'),
        },
        {
            id: 6,
            medium: true,
            active: false,
            name: t('Blog.other'),
        },
    ]);
    let [currentPage, setCurrentPage] = useState(params.id.replace('=', ''));
    const [isPagePrevious, setIsPagePrevious] = useState(false);
    const [isFinalPage, setIsFinalPage] = useState(false);
    const [pagings, setPaging] = useState([
        {
            id: 1,
            value: 1,
            active: true,
        },
        {
            id: 2,
            value: 2,
            active: false,
        },
        {
            id: 3,
            value: 3,
            active: false,
        },
        {
            id: 4,
            value: 4,
            active: false,
        },
        // {
        //     id: 5,
        //     value: 5,
        //     active: false,
        // },
        // {
        //     id: 6,
        //     value: 6,
        //     active: false,
        // },
        // {
        //     id: 7,
        //     value: 7,
        //     active: false,
        // },
        // {
        //     id: 8,
        //     value: 8,
        //     active: false,
        // },
        // {
        //     id: 9,
        //     value: 9,
        //     active: false,
        // },
        // {
        //     id: 10,
        //     value: 10,
        //     active: false,
        // },
        // {
        //     id: 11,
        //     value: 11,
        //     active: false,
        // },
        // {
        //     id: 12,
        //     value: 12,
        //     active: false,
        // },
        // {
        //     id: 13,
        //     value: 13,
        //     active: false,
        // },
        // {
        //     id: 14,
        //     value: 14,
        //     active: false,
        // },
    ]);
    // const prevPage = useRef(currentPage);

    const debouncedValue = useDebounce(searchPosts, 500);
    useEffect(() => {
        if (debouncedValue) {
            (async () => {
                // await apiSearchPosts(debouncedValue);
                const response = await apiSearchPosts(debouncedValue);
                if (response.data.statusCode === 2) {
                    // console.log(response.data.data);
                    setPosts(response.data.data);
                }
            })();
        }
    }, [debouncedValue]);

    useEffect(() => {
        (async () => {
            const response = await apiGetListPosts(currentPage);
            // console.log('response', response.data);
            // console.log('response', response.data.posts[0].userData);
            if (response.data.statusCode === 2) {
                setPosts(response.data.posts);
            }
        })();
    }, [currentPage]);
    useEffect(() => {
        // console.log(currentPage);
        if (currentPage > 1) {
            setIsPagePrevious(false);
        }
        if (currentPage <= 1) {
            setIsPagePrevious(true);
            navigate(`/post/page=${1}`);
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentPage]);
    useEffect(() => {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        useChangeActive();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // useEffect(() => {
    //     // console.log('re-render');
    //     prevPage.current = currentPage;
    //     // console.log(prevPage.current);
    //     // console.log(currentPage);
    // }, [currentPage]);
    useEffect(() => {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        useCheckPagefinal();
        // eslint-disable-next-line react-hooks/rules-of-hooks
        useChangeActive();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentPage]);

    const handleDetailPost = (id) => {
        // console.log('posts', id);
        navigate(config.routes.detailPost, { state: { id: id } });
        // navigate(`/detail-post/${id}`);
    };
    const handleOnchangeSeach = (data) => {
        setSearchPosts(data.value);
    };
    const handleChangeTypeSeach = async (id, typeValue) => {
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
        // let typeValue = typeValue;
        const response = await apiSearchPosts('', typeValue);
        if (response.data.statusCode === 2) {
            console.log(response.data.data);
            // console.log(posts);
            setPosts(response.data.data);
        }
    };

    const handleChangePage = useCallback(
        (currentPage) => {
            setCurrentPage(currentPage);
            navigate(`/post/page=${currentPage}`);
            const newState = pagings.map((page) => {
                if (page.id === currentPage) {
                    return {
                        ...page,
                        active: true,
                    };
                } else {
                    return {
                        ...page,
                        active: false,
                    };
                }
            });
            setPaging(newState);
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [currentPage],
    );
    const handleChangePrevious = () => {
        if (currentPage) {
            setCurrentPage(--currentPage);
            navigate(`/post/page=${currentPage}`);
        }
    };
    const handleChangeNext = () => {
        if (currentPage) {
            setCurrentPage(++currentPage);
            navigate(`/post/page=${currentPage}`);
        }
    };

    const useChangeActive = () => {
        const newState = pagings.map((page) => {
            if (page.id === +currentPage) {
                return {
                    ...page,
                    active: true,
                };
            } else {
                return {
                    ...page,
                    active: false,
                };
            }
        });
        setPaging(newState);
    };
    const useCheckPagefinal = () => {
        const lengPage = pagings.length;
        if (lengPage === +currentPage) {
            setIsFinalPage(true);
        } else {
            setIsFinalPage(false);
        }
        // console.log(currentPage);
    };

    // console.log(prevPage.current);
    // console.log(currentPage);

    return (
        <>
            <div className={style.headers}>
                <h1> {t('Blog.featuredPosts')}</h1>
                <div className={style.seachCtn}>
                    <MyInput
                        name="seachPosts"
                        handleOnchange={handleOnchangeSeach}
                        value={searchPosts}
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
                                hanldeClick={() => handleChangeTypeSeach(tab.id, tab.name)}
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
            <div className={style.pagingContainer}>
                {/* {JSON.stringify(isPagePrevious)} */}
                <span
                    className={`${style.previous} ${isPagePrevious ? style.isPagePrevious : ''}`}
                    onClick={handleChangePrevious}
                >
                    <i className={`fa-solid fa-arrow-left ${style.arrowFeft}`}></i>
                    {t('Blog.paging.previous')}
                </span>
                {/* {isPagePrevious && (
                )} */}
                {pagings &&
                    pagings.map((page) => {
                        return (
                            <MyButton
                                key={page.id}
                                hanldeClick={() => handleChangePage(page.id)}
                                accent={page.active}
                                medium
                                hoverBorder
                            >
                                {page.value}
                            </MyButton>
                        );
                    })}

                <span
                    className={`${style.next} ${isFinalPage ? `${style.isFinalPage}` : ''}`}
                    onClick={handleChangeNext}
                >
                    {t('Blog.paging.next')}
                    <i className={`fa-solid fa-arrow-right ${style.arrowRight}`}></i>
                </span>
            </div>
        </>
    );
}

export default Post;
