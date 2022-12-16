import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';

import style from './WriteBlog.module.scss';

import MyButton from '@/components/Button/MyButton';
import MyInput from '@/components/Input/MyInput';
import Loading from '@/components/Loading';
import MySelect from '@/components/Selects/MySelect';

import { apiCreatePost } from '@/services/apis';

function WriteBlog() {
    const { t } = useTranslation();
    const mdParser = new MarkdownIt(/* Markdown-it options */);
    const [posts, setPost] = useState({
        title: '',
        textMarkDown: '',
        textHtmlMarkDown: '',
        type: '',
        image: '',
    });
    const [success, setSuccess] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const [selectsType, setSlectsType] = useState([
        {
            id: 1,
            name: t('Blog.choose'),
            value: t('Blog.choose'),
        },
        {
            id: 2,
            name: t('Blog.learn'),
            value: t('Blog.learn'),
        },
        {
            id: 3,
            name: t('Blog.entertainment'),
            value: t('Blog.entertainment'),
        },
        {
            id: 4,
            name: t('Blog.sporting'),
            value: t('Blog.sporting'),
        },
        {
            id: 5,
            name: t('Blog.q&a'),
            value: t('Blog.q&a'),
        },
        {
            id: 6,
            name: t('Blog.other'),
            value: t('Blog.other'),
        },
    ]);

    function handleEditorChange({ html, text }) {
        // console.log('html', html);
        // console.log('text', text);
        setPost((prevState) => {
            return {
                ...prevState,
                textMarkDown: text,
                textHtmlMarkDown: html,
            };
        });
    }
    const handleCreatePost = () => {
        setIsLoading(true);
        try {
            // console.log(posts);
            (async () => {
                const response = await apiCreatePost(posts);
                if (response.data.statusCode === 2) {
                    setIsLoading(false);
                }
            })();
            setPost({
                title: '',
                textMarkDown: '',
                textHtmlMarkDown: '',
                type: '',
                image: '',
            });
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    };
    useEffect(() => {
        document.title = t('Blog.post');
        if (posts.title) {
            document.title = posts.title;
        }
    }, [posts.title, t]);
    useEffect(() => {
        const valuePosts = Object.values(posts);
        if (valuePosts) {
            const isEmpty = valuePosts.every((item) => {
                return item.length > 2 ? true : false;
            });
            if (isEmpty) {
                setSuccess(true);
            } else {
                setSuccess(false);
            }
        }
    }, [posts]);
    useEffect(() => {
        setSlectsType([
            {
                id: 1,
                name: t('Blog.choose'),
                value: t('Blog.choose'),
            },
            {
                id: 2,
                name: t('Blog.learn'),
                value: t('Blog.learn'),
            },
            {
                id: 3,
                name: t('Blog.entertainment'),
                value: t('Blog.entertainment'),
            },
            {
                id: 4,
                name: t('Blog.sporting'),
                value: t('Blog.sporting'),
            },
            {
                id: 5,
                name: t('Blog.q&a'),
                value: t('Blog.q&a'),
            },
            {
                id: 6,
                name: t('Blog.other'),
                value: t('Blog.other'),
            },
        ]);
    }, [t]);

    const handleOnChangeTitle = (data) => {
        setPost((prevState) => {
            return {
                ...prevState,
                [data.name]: data.value,
            };
        });
    };
    const handleSlectType = (data) => {
        setPost((prevState) => {
            return {
                ...prevState,
                type: data,
            };
        });
    };

    return (
        <>
            {isLoading ? <Loading /> : null}
            <div className={style.container}>
                <p className={style.note}>
                    {t('Blog.note')}
                    <span style={{ marginLeft: '5px' }}>
                        <a
                            href="https://www.truongblogger.top/p/upload-anh.html"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            Click here
                        </a>
                    </span>
                </p>
                <MyButton success opacity={!success} medium hanldeClick={handleCreatePost}>
                    {t('Blog.post')}
                </MyButton>
                <div>
                    <div className={style.headerWaper}>
                        <MyInput
                            bottom={2}
                            value={posts.title}
                            name="title"
                            placeholder={t('Blog.title')}
                            handleOnchange={handleOnChangeTitle}
                        />
                        <MySelect options={selectsType} onChanType={handleSlectType} value={posts.type} />
                        {/* <MyInput
                            bottom={2}
                            value={posts.type}
                            name="type"
                            placeholder={t('Blog.type')}
                            handleOnchange={handleOnChangeTitle}
                        /> */}
                        <MyInput
                            bottom={2}
                            value={posts.image}
                            name="image"
                            placeholder={t('Blog.image')}
                            handleOnchange={handleOnChangeTitle}
                        />
                    </div>
                    <MdEditor
                        renderHTML={(text) => mdParser.render(text)}
                        onChange={handleEditorChange}
                        placeholder="placeholder"
                        value={posts.textMarkDown ? posts.textMarkDown : ''}
                        className={style.markDown}
                    />
                </div>
                {/* <MyButton success opacity={!success} medium top hanldeClick={handleCreatePost}>
                    {t('Blog.post')}
                </MyButton> */}
                {/* {post.textHtmlMarkDown && <div dangerouslySetInnerHTML={{ __html: `${post.textHtmlMarkDown}` }}></div>} */}
            </div>
        </>
    );
}

export default WriteBlog;
