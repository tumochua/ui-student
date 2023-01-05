import { useState, useMemo } from 'react';
import MyInput from '@/components/Input/MyInput';
import style from './Comments.module.scss';
import MyButton from '@/components/Button/MyButton';
function Comments({ onClose, isComments }) {
    const [inputValueCommnet, setInputValueCommnet] = useState('');
    const [isShowBtn, setIsShowBtn] = useState(false);
    const [isInput, setIsInput] = useState(true);
    // const [isAminationHide, setIsAminationHide] = useState(false);
    const handleChangeInputComment = (data) => {
        setInputValueCommnet(data.value);
    };

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
    const handleCreateComment = () => {
        if (!isInput) {
            console.log(inputValueCommnet);
            setInputValueCommnet('');
        }
    };

    const handleClose = () => {
        onClose();
    };
    // useEffect(() => {
    //     console.log(isAminationHide);
    // }, [isAminationHide]);
    const handleCloseOutside = (event, params) => {
        // event.stopPropagation();
        // console.log('Outside');
        if (params === 'outside') {
            onClose();
        }
    };
    const handleCloseInside = (event) => {
        event.stopPropagation();
        // console.log('Inside');
    };

    return (
        <>
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
                            <h2>Chưa Có Bình Luận Nào</h2>
                            <div className={style.inputComment}>
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
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default Comments;
