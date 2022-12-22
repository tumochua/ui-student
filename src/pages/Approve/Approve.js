import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import style from './Approve.module.scss';
import { apiVerifyPosts, apiDeletePosts, apiConfirmPosts } from '@/services/apis';
import MyButton from '@/components/Button/MyButton';
import { handleConvertRimestampToDate } from '@/use/Date';

function Approve() {
    const { t } = useTranslation();
    const [posts, setPosts] = useState(null);
    const [isCallApi, setIsCallApi] = useState(false);

    useEffect(() => {
        (async () => {
            const response = await apiVerifyPosts('S0');
            // console.log(response.data);
            if (response.data.statusCode === 2) {
                setPosts(response.data.data);
            }
        })();
    }, [isCallApi]);

    useEffect(() => {
        if (posts) {
            // console.log(posts);
        }
    }, [posts]);

    const handleDeletePosts = async (postId) => {
        const response = await apiDeletePosts({
            type: 'delete',
            postId,
        });
        if (response.data.statusCode === 2) {
            setIsCallApi(!isCallApi);
        }
    };

    const handleverifVerifyPosts = async (postsId) => {
        const response = await apiConfirmPosts({
            postsId,
            status: 'S1',
        });
        if (response.data.statusCode === 2) {
            setIsCallApi(!isCallApi);
        }
    };

    return (
        <>
            <div className={style.container}>
                <table>
                    <tbody>
                        <tr>
                            <th>STT</th>
                            <th>{t('Blog.Approve.title')}</th>
                            <th>{t('Blog.Approve.status')}</th>
                            <th>{t('Blog.Approve.date')}</th>
                            <th>{t('Blog.Approve.actions')}</th>
                        </tr>
                        {posts &&
                            posts.map((post) => {
                                return (
                                    <tr key={post.id}>
                                        <th>{post.id}</th>
                                        <th>{post.title}</th>
                                        <th>{post.status}</th>
                                        {/* <th>{post.date}</th> */}
                                        <th>{handleConvertRimestampToDate(post.date, new Date())}</th>
                                        <th className={style.actions}>
                                            <MyButton danger medium hanldeClick={() => handleDeletePosts(post.id)}>
                                                {t('Blog.Approve.delete')}
                                            </MyButton>
                                            <MyButton
                                                success
                                                medium
                                                hanldeClick={() => handleverifVerifyPosts(post.id)}
                                            >
                                                {t('Blog.Approve.verify')}
                                            </MyButton>
                                        </th>
                                    </tr>
                                );
                            })}
                    </tbody>
                </table>
            </div>
        </>
    );
}

export default Approve;
