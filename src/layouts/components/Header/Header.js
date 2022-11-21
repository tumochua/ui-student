import style from './Header.module.scss';

import images from '@/assets/images';

function Header() {
    return (
        <div className={style.headerWapper}>
            <div className={style.headerLeft}>
                <img src={images.logo} alt="cao đẳng bách khoa" className={style.logo} />
                <h3>Cổng Thông Tin Sinh Viên</h3>
            </div>
            <div>Tumochua</div>
        </div>
    );
}

export default Header;
