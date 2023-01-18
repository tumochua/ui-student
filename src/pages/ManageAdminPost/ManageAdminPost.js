import { useState, useEffect } from 'react';
import style from './ManageAdminPost.module.scss';
import { apiGetAllPosts, apiSearchPosts } from '@/services/apis';
import { createLocalStorage } from '@/use/LocalStorages';
import MyInput from '@/components/Input/MyInput';
import useDebounce from '@/hooks';
import { handleConvertRimestampToDate } from '@/use/Date';

function ManageAdminPost() {
    const [postData, setPostData] = useState(null);
    const [typeSort, setTypeSort] = useState(false);
    const [valueSort, setValueSort] = useState(() => {
        const sortSetting = createLocalStorage('profile_setting');
        return sortSetting.get('sort_type') ?? { value: 'ASC' };
    });
    const [seachValue, setSeachValue] = useState('');

    useEffect(() => {
        (async () => {
            const response = await apiGetAllPosts(valueSort);
            // console.log(response.data.data);
            if (response.data.statusCode === 2) {
                setPostData(response.data.data);
            }
        })();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [typeSort]);
    const debouncedValue = useDebounce(seachValue, 500);
    useEffect(() => {
        if (debouncedValue) {
            (async () => {
                const response = await apiSearchPosts(seachValue);
                console.log(response);
            })();
        }
    }, [seachValue, debouncedValue]);

    const handleSort = (type, collum) => {
        setTypeSort(!type);
        const sortSetting = createLocalStorage('profile_setting');
        const value = valueSort.value === 'DESC' ? 'ASC' : 'DESC';
        sortSetting.set('sort_type', {
            value,
            collum,
            name: 'Post',
        });
        setValueSort(sortSetting.get('sort_type'));
        // console.log(sortSetting.get('sort_type'));
    };
    const handleChangeSeach = (data) => {
        setSeachValue(data.value);
    };

    return (
        <div className={style.container}>
            <div className={style.header}>
                <MyInput placeholder="seach title post" value={seachValue} handleOnchange={handleChangeSeach}></MyInput>
                <i className={`fa-solid fa-magnifying-glass ${style.iconSeach}`}></i>
            </div>
            <table>
                <tbody>
                    <tr>
                        <th>
                            <div className={style.stt}>
                                <i
                                    className={`${
                                        valueSort && valueSort.value === 'DESC'
                                            ? 'fa-solid fa-arrow-up-wide-short'
                                            : 'fa-solid fa-arrow-down-short-wide'
                                    } ${style.iconSort}`}
                                    onClick={() => handleSort(typeSort, 'id')}
                                ></i>
                                {/* <i className="fa-solid fa-sort"></i> */}
                                <span> STT</span>
                            </div>
                        </th>
                        <th>Title</th>
                        <th>Date</th>
                        <th>User Name</th>
                        <th>Likes</th>
                        <th>Comments</th>
                        <th>Actions</th>
                    </tr>
                    {postData &&
                        postData.length > 0 &&
                        postData.map((posts) => {
                            return (
                                <tr key={posts.id}>
                                    <th>{posts.id}</th>
                                    <th>{posts.title}</th>
                                    <th>{handleConvertRimestampToDate(posts.date, new Date())}</th>
                                    <th>{posts.userData && posts.userData.fullName}</th>
                                    <th>{posts.likeSize || 0}</th>
                                    <th>{posts.commentsData && posts.commentsData.length}</th>
                                    <th>Actions</th>
                                </tr>
                            );
                        })}
                </tbody>
            </table>
        </div>
    );
}

export default ManageAdminPost;
