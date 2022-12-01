import { connect } from 'react-redux';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from './en/translation.json';
import vi from './vi/translation.json';

function Translate({ children, language }) {
    localStorage.setItem('language', 'vi');
    i18n.use(initReactI18next).init({
        resources: {
            vi: {
                translation: vi,
            },
            en: {
                translation: en,
            },
        },
        lng: localStorage.getItem('language'), // if you're using a language detector, do not define the lng option
        // lng: language, // if you're using a language detector, do not define the lng option
        fallbackLng: 'vi',
        interpolation: {
            escapeValue: false, // react already safes from xss => https://www.i18next.com/translation-function/interpolation#unescape
        },
    });
    return children;
}
const mapStateToProps = (state) => ({
    language: state.language.language,
});
export default connect(mapStateToProps, {})(Translate);

// export default Translate;
