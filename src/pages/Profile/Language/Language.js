import { memo } from 'react';
import style from './Language.module.scss';
import Menu from '@/components/Menu';
function Language({ languages, onChanLanguage }) {
    // console.log('language', languages);
    function JsxLanguage() {
        return (
            <>
                {languages &&
                    languages.map((item) => {
                        return (
                            <p className={style.itemLanguage} key={item.id}>
                                <span onClick={() => onChanLanguage({ value: item.value, name: item.name })}>
                                    {' '}
                                    {item.name}
                                </span>
                            </p>
                        );
                    })}
            </>
        );
    }

    return (
        <>
            {/* {isModalLanguage ? ( */}
            <span className={style.languagectn}>
                <Menu small showBefore>
                    <JsxLanguage />
                </Menu>
            </span>
            {/* ) : null} */}
        </>
    );
}

// export default Language;
export default memo(Language);
