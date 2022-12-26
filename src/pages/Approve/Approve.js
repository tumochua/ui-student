import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import style from './Approve.module.scss';
import { apiVerifyPosts, apiDeletePosts, apiConfirmPosts } from '@/services/apis';
import MyButton from '@/components/Button/MyButton';
import { handleConvertRimestampToDate } from '@/use/Date';
import { useContextStore } from '@/context';
import io from 'socket.io-client';
import Modal from '@/components/Modal';
import FormInput from '@/components/FormInput';
function Approve() {
    const socket = io(process.env.REACT_APP_BACKEND_URL);
    const [state] = useContextStore();

    const { t } = useTranslation();
    const [posts, setPosts] = useState(null);
    const [isCallApi, setIsCallApi] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [reason, setReason] = useState('');
    const [errorReason, setErrorReason] = useState(false);
    const [sendNotification, setSendNotification] = useState(null);
    const [sendNotificationReason, setSendNotificationReason] = useState({
        userId: '',
        userName: '',
        roleId: '',
        statusId: 'T2',
        description: '',
        title: '',
    });
    const [isOk, setIsOk] = useState(false);
    // console.log(state.userInfor.data.roleId);
    useEffect(() => {
        (async () => {
            const response = await apiVerifyPosts('S0');
            // console.log(response.data);
            if (response.data.statusCode === 2) {
                setPosts(response.data.data);
            }
        })();
    }, [isCallApi]);

    const handleDeletePosts = async (postsId) => {
        setShowModal(true);
        setIsOk(false);

        if (state.userInfor) {
            setSendNotificationReason((prevState) => {
                return {
                    ...prevState,
                    postsId: postsId,
                };
            });
        }
        // const response = await apiDeletePosts({
        //     type: 'delete',
        //     postId,
        // });
        // if (response.data.statusCode === 2) {
        //     setIsCallApi(!isCallApi);
        // }
    };

    useEffect(() => {
        if (state.userInfor) {
            setSendNotificationReason((prevState) => {
                return {
                    ...prevState,
                    userId: state.userInfor.data.id,
                    userName: state.userInfor.data.fullName,
                    roleId: state.userInfor.data.roleId,
                    statusId: 'T2',
                };
            });
        }
    }, [state.userInfor]);

    useEffect(() => {
        if (isOk) {
            console.log(sendNotificationReason);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isOk]);
    useEffect(() => {
        if (sendNotification) {
            // console.log(sendNotification);
            socket.emit('approveNotificationPosts', sendNotification);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [sendNotification]);

    const handleverifVerifyPosts = async (postsId, title) => {
        if (state.userInfor) {
            setSendNotification({
                userId: state.userInfor.data.id,
                userName: state.userInfor.data.fullName,
                roleId: state.userInfor.data.roleId,
                postsId: postsId,
                statusId: 'T1',
                description: t('Notification.resMes'),
                readId: 'D0',
                title: title,
            });
        }

        const response = await apiConfirmPosts({
            postsId,
            status: 'S1',
        });
        if (response.data.statusCode === 2) {
            setIsCallApi(!isCallApi);
            // socket.emit('approveNotificationPosts', sendNotification);
        }
    };

    const handleCanCel = () => {
        setShowModal(false);
    };
    const handleOk = () => {
        if (reason.length <= 0) {
            setErrorReason(true);
        } else {
            setIsOk(true);
            setShowModal(false);
            setErrorReason(false);
            setReason('');
        }
    };
    const handleOnChangeReason = (data) => {
        setReason(data.value);
        setErrorReason(false);
        setSendNotificationReason((prevState) => {
            return {
                ...prevState,
                description: data.value,
            };
        });
    };

    return (
        <>
            <Modal position="center" isBottom onCanCel={handleCanCel} onOk={handleOk} showModal={showModal}>
                <h4>{t('Confirm.title')}</h4>
                <FormInput
                    placeholder={t('Confirm.reason')}
                    value={reason}
                    name={reason}
                    onChangeInput={handleOnChangeReason}
                    errorMessage={errorReason ? t('Confirm.error') : ''}
                ></FormInput>
            </Modal>
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
                                                hanldeClick={() => handleverifVerifyPosts(post.id, post.title)}
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
