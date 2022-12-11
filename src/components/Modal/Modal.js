// import style from './Modal.module.scss';

// function Modal({ type, images, onPreviewImages }) {
//     if (type === 'preview') {
//         return (
//             <>
//                 <div className={style.modal}>
//                     {images && <img src={images} alt="preview" width={100} onClick={onPreviewImages} />}
//                 </div>
//             </>
//         );
//     } else {
//         return <h1>Modal</h1>;
//     }
// }

// export default Modal;

import classNames from 'classnames';
import './Modal.module.scss';

function Modal({ children, isShowModal, onShowHideModal }) {
    const classModal = classNames({
        modal: isShowModal,
    });
    return (
        <>
            <div className={classModal} onClick={onShowHideModal}>
                <div className="modalBody">{children}</div>
            </div>
        </>
    );
}

export default Modal;
