import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate } from 'react-router-dom';

import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';
import style from './EditPosts.module.scss';

import { apiEditPosts } from '@/services/apis';
import MyInput from '@/components/Input/MyInput';
import MySelect from '@/components/Selects/MySelect';
import MyButton from '@/components/Button/MyButton';

function EditPosts() {
    const navigate = useNavigate();

    const mdParser = new MarkdownIt(/* Markdown-it options */);
    const routerData = useLocation();
    const { t } = useTranslation();
    // eslint-disable-next-line no-unused-vars
    const [postId, setPostsId] = useState(routerData.state.id);
    const [posts, setPosts] = useState(null);
    const [editPosts, setEditPosts] = useState({
        title: '',
        textMarkDown: '',
        textHtmlMarkDown: '',
        type: '',
        image: '',
    });
    // eslint-disable-next-line no-unused-vars
    const [selectsType, setSlectsType] = useState([
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
    useEffect(() => {
        if (postId) {
            (async () => {
                const response = await apiEditPosts(postId);
                // console.log(response.data);
                if (response.data.statusCode === 2) {
                    setPosts(response.data.data);
                }
            })();
        }
    }, [postId]);

    useEffect(() => {
        if (posts) {
            setEditPosts((prevState) => {
                return {
                    ...prevState,
                    textMarkDown: posts.contentMarkdown,
                    textHtmlMarkDown: posts.contentHTML,
                    image: posts.image,
                    type: posts.type,
                    title: posts.title,
                };
            });
        }
    }, [posts]);

    function handleEditorChange({ html, text }) {
        setEditPosts((prevState) => {
            return {
                ...prevState,
                textMarkDown: text,
                textHtmlMarkDown: html,
            };
        });
    }
    const handleOnchangeEidtPosts = (data) => {
        setEditPosts((prevState) => {
            return {
                ...prevState,
                [data.name]: data.value,
            };
        });
    };
    const handleSlectType = (data) => {
        setEditPosts((prevState) => {
            return {
                ...prevState,
                type: data,
            };
        });
    };

    const handleEidtPosts = async () => {
        const response = await apiEditPosts(postId, editPosts);
        if (response.data.statusCode === 2) {
            navigate(`/post/page=${1}`);
        }
    };
    return (
        <div className={style.container}>
            <h1>{t('Blog.editPosts')}</h1>
            <div className={style.body}>
                <div className={style.formPosts}>
                    <MyInput
                        bottom={2}
                        placeholder={t('Blog.title')}
                        value={editPosts.title}
                        name="title"
                        handleOnchange={handleOnchangeEidtPosts}
                    ></MyInput>
                    <MySelect options={selectsType} onChanType={handleSlectType} value={editPosts.type}></MySelect>
                    <MyInput
                        bottom={2}
                        placeholder={t('Blog.image')}
                        value={editPosts.image}
                        name="image"
                        handleOnchange={handleOnchangeEidtPosts}
                    ></MyInput>
                </div>
                <MdEditor
                    className={style.mdEditor}
                    renderHTML={(text) => mdParser.render(text)}
                    onChange={handleEditorChange}
                    value={editPosts.textMarkDown}
                />
            </div>
            <MyButton top success medium hanldeClick={handleEidtPosts}>
                {t('Blog.edit')}
            </MyButton>
        </div>
    );
}

export default EditPosts;
