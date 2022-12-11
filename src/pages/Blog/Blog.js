import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';
import style from './Blog.module.scss';

import MyButton from '@/components/Button/MyButton';
function Blog() {
    const { t } = useTranslation();
    const mdParser = new MarkdownIt(/* Markdown-it options */);
    const [post, setPost] = useState({
        title: null,
        textMarkDown: null,
        textHtmlMarkDown: null,
    });
    function handleEditorChange({ html, text }) {
        setPost((prevState) => {
            return {
                ...prevState,
                textMarkDown: text,
                textHtmlMarkDown: html,
            };
        });
    }
    const handleCreatePost = () => {
        console.log('post', post);
    };
    function renderHTML(text) {
        return mdParser.render(text);
    }
    return (
        <>
            <div className={style.container}>
                <MdEditor
                    renderHTML={renderHTML}
                    onChange={handleEditorChange}
                    placeholder="placeholder"
                    className={style.markDown}
                />
                <MyButton success medium top hanldeClick={handleCreatePost}>
                    {t('Blog.post')}
                </MyButton>
                {/* {post.textHtmlMarkDown && <div dangerouslySetInnerHTML={{ __html: `${post.textHtmlMarkDown}` }}></div>} */}
            </div>
        </>
    );
}

export default Blog;
