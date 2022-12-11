import { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { useTranslation } from 'react-i18next';

import style from './Header.module.scss';

// import images from '@/assets/images';

function Header({ userRedux }) {
    const { t } = useTranslation();
    const [name, setName] = useState(null);
    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'));
        if (user) {
            setName(user.data.user.fullName);
        }
    }, [name]);
    return (
        <div className={style.headerWapper}>
            <div className={style.headerLeft}>
                <img
                    src="https://previews.123rf.com/images/scrap4vec/scrap4vec2005/scrap4vec200500184/148077898-logo-design-of-student-child-or-people-with-book-template-in-creative-shape-isolate-vector-illustrat.jpg"
                    alt="cao đẳng bách khoa"
                    className={style.logo}
                />
                {/* <img src={images.logo} alt="cao đẳng bách khoa" className={style.logo} /> */}
                <h3>{t('Headers.studentPortal')}</h3>
            </div>
            <div>{name}</div>
        </div>
    );
}

const mapStateToProps = (state) => ({
    userRedux: state.users.user,
});

export default connect(mapStateToProps, {})(Header);
