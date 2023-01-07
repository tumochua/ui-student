import { useState, useMemo, useEffect, useRef } from 'react';
import MyInput from '@/components/Input/MyInput';
import style from './Comments.module.scss';
import MyButton from '@/components/Button/MyButton';
import {
    apiCreateComment,
    apiGetListCommentPost,
    apiEditComment,
    apiDeleteComment,
    apiLikeComment,
} from '@/services/apis';
import Menus from '@/components/Menus';
import { MENUS } from '@/Data';
import io from 'socket.io-client';
function Comments({ onClose, isComments, postId, userId, userIdCreatePost, userName }) {
    const socket = io(process.env.REACT_APP_BACKEND_URL);
    const [inputValueCommnet, setInputValueCommnet] = useState('');
    const [isShowBtn, setIsShowBtn] = useState(false);
    const [isInput, setIsInput] = useState(true);
    const [dataComment, setDataComment] = useState(null);
    const [isCallApi, setIsCallApi] = useState(false);
    const [isShowIconOption, setIsShowIconOption] = useState(null);
    const [isCheckMenu, setIsCheckMenu] = useState(null);
    const [isMenu, setIsMenu] = useState(false);
    const [type, setType] = useState(null);
    const [dataEditComment, setDataEditComment] = useState({
        type: '',
        postId: null,
        commentId: null,
        authorId: null,
        textComment: '',
    });
    const myRef = useRef(null);

    const handleChangeInputComment = (data) => {
        setInputValueCommnet(data.value);
        setDataEditComment((prevState) => {
            return {
                ...prevState,
                textComment: data.value,
            };
        });
    };

    useEffect(() => {
        (async () => {
            if (postId) {
                const response = await apiGetListCommentPost(postId);
                // console.log(response.data.data);
                if (response.data.statusCode === 2) {
                    setDataComment(response.data.data);
                }
            }
        })();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [postId, isCallApi]);

    useMemo(() => {
        if (inputValueCommnet.length > 0) {
            setIsInput(false);
        } else {
            setIsInput(true);
        }
    }, [inputValueCommnet]);

    const handleFocuInput = () => {
        setIsShowBtn(true);
    };
    const handleCloseComment = () => {
        setIsShowBtn(false);
        setInputValueCommnet('');
    };

    const handleCreateComment = async () => {
        if (type === 'edit') {
            const response = await apiEditComment(dataEditComment);
            if (response.data.statusCode === 2) {
                setIsCallApi(!isCallApi);
                setInputValueCommnet('');
            }
        } else {
            if (!isInput) {
                // console.log(inputValueCommnet);

                const response = await apiCreateComment({
                    postId: postId ? postId : null,
                    text: inputValueCommnet,
                    // time: new Date().getTime(),
                });
                if (response.data.statusCode === 2) {
                    setIsCallApi(!isCallApi);
                    socket.emit('createNotificationComment', {
                        // userIdCreatePost: userData.id,
                        // userIdLikePost: userInfo.id,
                        postId: postId,
                        description: `${userName} Vừa Bình Luận Về Bài Viết Của Bạn`,
                        userName: userName,
                        userId: userId,
                        typeId: 'CN',
                        readId: 'D0',
                        // statusId: 'T1',
                    });
                }

                setInputValueCommnet('');
            }
        }
    };

    const handleClose = () => {
        onClose();
        setInputValueCommnet('');
    };
    const handleCloseOutside = (event, params) => {
        // event.stopPropagation();
        // console.log('Outside');
        if (params === 'outside') {
            onClose();
            setInputValueCommnet('');
        }
    };
    const handleCloseInside = (event) => {
        event.stopPropagation();
        // console.log('Inside', isMenu);
        if (isMenu) {
            setIsMenu(false);
        }
    };

    const handleMouseEnter = (id, userId) => {
        // console.log('hover', userId);
        setIsShowIconOption(id);
        // setUserId(userId);
    };
    const handleMouseLeave = () => {
        setIsShowIconOption(null);
        // setUserId(null);
    };

    const handleOptionComment = (commentId, userId) => {
        setIsCheckMenu(commentId);
        setIsMenu(!isMenu);
    };

    const handleChangeMenuComment = async (type, postId, commentId, authorId, textComment) => {
        // console.log(type, postId, commentId, authorId);
        if (type === 'edit') {
            setInputValueCommnet(textComment);
            setIsShowBtn(true);
            setType(type);
            setDataEditComment((prevState) => {
                return {
                    ...prevState,
                    type,
                    postId,
                    commentId,
                    authorId,
                };
            });
            (() => {
                myRef.current.scrollIntoView();
            })();
        }
        if (type === 'delete') {
            const response = await apiDeleteComment({ type, postId, commentId, authorId });
            if (response.data.statusCode === 2) {
                setIsCallApi(!isCallApi);
            }
        }
    };

    const handleLikeComment = async (commentId, authorId, postId, userName, type) => {
        const response = await apiLikeComment({
            postId,
            commentId,
            authorId,
            userName,
            userId,
            description: `${userName} Vừa Like Comment Của Bạn`,
        });
        // console.log(response);
        if (response.data.statusCode === 2) {
            setIsCallApi(!isCallApi);
            if (type === 'like') {
                socket.emit('createLikeComment', {
                    postId: postId,
                    description: `${userName} Vừa Like Comment Của Bạn`,
                    userName: userName,
                    userId: userId,
                    commentId: commentId,
                    typeId: 'CN',
                    readId: 'D0',
                });
            }
        }
    };

    const handleFeedbackComment = () => {
        // console.log('handleFeedbackComment');
    };

    return (
        <>
            {/* {JSON.stringify(dataComment)} */}
            {/* {console.log(isComments ? 'style.fadeOut' : '')} */}
            {/* ${isAminationHide ? style.fadeIn : style.fadeOut} */}
            {/* ${isAminationHide ? style.slideIn : style.slideOut} */}
            {isComments && (
                <div
                    className={`${style.container} ${isComments ? style.fadeIn : style.fadeOut}`}
                    onClick={(event) => handleCloseOutside(event, 'outside')}
                >
                    <div
                        className={`${style.wapper} ${isComments ? style.slideIn : style.slideOut} `}
                        onClick={(event) => handleCloseInside(event, 'inside')}
                    >
                        <span className={style.header}>
                            <i className={`fa-solid fa-xmark ${style.iconClose}`} onClick={handleClose}></i>
                        </span>
                        <div className={style.body}>
                            <h2>{dataComment && dataComment.length > 0 ? '' : 'Chưa Có Bình Luận Nào'}</h2>
                            <div className={style.inputComment} ref={myRef}>
                                <MyInput
                                    isBorderBottom
                                    placeholder="Viết Bình Luận ..."
                                    value={inputValueCommnet}
                                    handleOnchange={handleChangeInputComment}
                                    onFocuInput={handleFocuInput}
                                ></MyInput>
                                {isShowBtn && (
                                    <div className={style.btnCommnet}>
                                        <MyButton radius border isBackground hanldeClick={handleCloseComment}>
                                            Hủy
                                        </MyButton>
                                        <MyButton border radius hanldeClick={handleCreateComment} opacity={isInput}>
                                            Bình Luận
                                        </MyButton>
                                    </div>
                                )}
                            </div>
                            <div className={style.commnetWapper}>
                                <ul>
                                    {dataComment &&
                                        dataComment.map((comment) => {
                                            return (
                                                <li
                                                    key={comment.id}
                                                    className={style.listComment}
                                                    onMouseEnter={() => handleMouseEnter(comment.id)}
                                                    onMouseLeave={handleMouseLeave}
                                                >
                                                    <div
                                                    // onMouseEnter={() => handleMouseEnter(comment.id)}
                                                    // onMouseLeave={handleMouseLeave}
                                                    >
                                                        <div className={style.item}>
                                                            <span className={style.avatarWapper}>
                                                                <img
                                                                    className={style.avatar}
                                                                    src={
                                                                        comment.authorData && comment.authorData.image
                                                                            ? comment.authorData.image
                                                                            : 'https://as2.ftcdn.net/v2/jpg/03/32/59/65/1000_F_332596535_lAdLhf6KzbW6PWXBWeIFTovTii1drkbT.jpg'
                                                                    }
                                                                    alt="avtart"
                                                                    width={100}
                                                                    height={100}
                                                                />
                                                            </span>
                                                            <div className={style.userInfo}>
                                                                <h4>
                                                                    {comment.authorData && comment.authorData.fullName}
                                                                    {userIdCreatePost === comment.authorId && (
                                                                        <span className={style.author}>Tác Giả</span>
                                                                    )}
                                                                </h4>
                                                                <div>
                                                                    <p>{comment.text}</p>
                                                                    {/* <span>
                                                                        {comment.comment_likes &&
                                                                            JSON.parse(comment.comment_likes).length >
                                                                                0 &&
                                                                            JSON.parse(comment.comment_likes).length}
                                                                    </span> */}
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className={style.actions}>
                                                            <p
                                                                className={style.like}
                                                                onClick={() =>
                                                                    handleLikeComment(
                                                                        comment.id,
                                                                        comment.authorId,
                                                                        postId,
                                                                        userName,
                                                                        comment.comment_likes &&
                                                                            comment.comment_likes.includes(userId)
                                                                            ? 'disLike'
                                                                            : 'like',
                                                                    )
                                                                }
                                                            >
                                                                {comment.comment_likes &&
                                                                comment.comment_likes.includes(userId)
                                                                    ? 'Bỏ Thích'
                                                                    : 'Thích'}
                                                            </p>
                                                            <p
                                                                className={style.feedback}
                                                                onClick={handleFeedbackComment}
                                                            >
                                                                Phản hồi
                                                            </p>
                                                            {comment.comment_likes &&
                                                                JSON.parse(comment.comment_likes).length > 0 && (
                                                                    <div className={style.likes}>
                                                                        <i
                                                                            className={`fa-solid fa-thumbs-up ${style.iconLike}`}
                                                                        ></i>
                                                                        <span>
                                                                            {comment.comment_likes &&
                                                                                JSON.parse(comment.comment_likes)
                                                                                    .length > 0 &&
                                                                                JSON.parse(comment.comment_likes)
                                                                                    .length}
                                                                        </span>
                                                                    </div>
                                                                )}
                                                        </div>
                                                    </div>
                                                    <span
                                                        onClick={() =>
                                                            handleOptionComment(comment.id, comment.authorId)
                                                        }
                                                        className={style.iconWapper}
                                                    >
                                                        {isShowIconOption === comment.id &&
                                                            userId === comment.authorId && (
                                                                <i
                                                                    className={`fa-solid fa-ellipsis ${style.iconOption}`}
                                                                ></i>
                                                            )}
                                                        {isCheckMenu === comment.id && userId === comment.authorId && (
                                                            <span className={style.menuComment}>
                                                                <Menus
                                                                    position="top-right"
                                                                    menus={MENUS}
                                                                    isMenu={isMenu}
                                                                    postId={postId}
                                                                    commnetId={comment.id}
                                                                    authorId={comment.authorId}
                                                                    textComment={comment.text}
                                                                    onChangeItemMenu={handleChangeMenuComment}
                                                                ></Menus>
                                                            </span>
                                                        )}
                                                    </span>
                                                </li>
                                            );
                                        })}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default Comments;
