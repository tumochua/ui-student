import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';

import style from './Blog.module.scss';

import MyButton from '@/components/Button/MyButton';
import MyInput from '@/components/Input/MyInput';
import Loading from '@/components/Loading';

import { apiCreatePost } from '@/services/apis';

function Blog() {
    const { t } = useTranslation();
    const mdParser = new MarkdownIt(/* Markdown-it options */);
    const [posts, setPost] = useState({
        title: '',
        textMarkDown: '',
        textHtmlMarkDown: '',
        type: '',
    });
    const [success, setSuccess] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    // const [valuePosts, setValuePosts] = useState(null);

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
            });
        } catch (error) {
            console.log(error);
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

    const handleOnChangeTitle = (data) => {
        setPost((prevState) => {
            return {
                ...prevState,
                [data.name]: data.value,
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
                        <MyInput
                            bottom={2}
                            value={posts.type}
                            name="type"
                            placeholder={t('Blog.type')}
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

export default Blog;
