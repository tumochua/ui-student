import './Home.scss';

import MyButton from '@/components/Button/MyButton';
import WapperInput from '@/components/WapperInput';

function Home() {
    const hanldeClickBtn = () => {
        console.log('hanldeClickBtn');
    };

    return (
        <div className="home-wapper">
            <MyButton hanldeClick={hanldeClickBtn}>Button</MyButton>
            <WapperInput></WapperInput>
            <div>Home page</div>
        </div>
    );
}

export default Home;
