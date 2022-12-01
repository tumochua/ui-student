import { useState } from 'react';
import style from './Language.module.scss';
import Modal from '@/components/Modal';
function Language({ isModalLanguage }) {
    function JsxLanguage() {
        // eslint-disable-next-line no-unused-vars
        const [language, setLanguage] = useState([
            {
                id: 1,
                name: 'Tiếng Việt',
            },
            {
                id: 2,
                name: 'Tiếng anh',
            },
        ]);
        return (
            <>
                {language &&
                    language.map((item) => {
                        return (
                            <p className={style.itemLanguage} key={item.id}>
                                {item.name}
                            </p>
                        );
                    })}
            </>
        );
    }

    return (
        <>
            {isModalLanguage ? (
                <span className={style.languagectn}>
                    <Modal small showBefore>
                        <JsxLanguage />
                    </Modal>
                </span>
            ) : null}
        </>
    );
}

export default Language;
