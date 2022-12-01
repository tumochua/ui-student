import { memo } from 'react';
import style from './Language.module.scss';
import Modal from '@/components/Menu';
function Language({ isModalLanguage, language, onChanLanguage }) {
    // console.log('re-render Language');
    function JsxLanguage() {
        return (
            <>
                {language &&
                    language.map((item) => {
                        return (
                            <p className={style.itemLanguage} key={item.id}>
                                <span onClick={() => onChanLanguage(item.value)}> {item.name}</span>
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

// export default Language;
export default memo(Language);
