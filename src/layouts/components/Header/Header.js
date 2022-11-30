import style from './Header.module.scss';

// import images from '@/assets/images';

function Header() {
    return (
        <div className={style.headerWapper}>
            <div className={style.headerLeft}>
                <img
                    src="https://previews.123rf.com/images/scrap4vec/scrap4vec2005/scrap4vec200500184/148077898-logo-design-of-student-child-or-people-with-book-template-in-creative-shape-isolate-vector-illustrat.jpg"
                    alt="cao đẳng bách khoa"
                    className={style.logo}
                />
                {/* <img src={images.logo} alt="cao đẳng bách khoa" className={style.logo} /> */}
                <h3>Cổng Thông Tin Sinh Viên</h3>
            </div>
            <div>Tumochua</div>
        </div>
    );
}

export default Header;
