import './Home.scss';

import MyButton from '@/components/Button/MyButton';
import WapperInput from '@/components/WapperInput';

import { connect } from 'react-redux';

function Home({ todos }) {
    // console.log(todos);
    const hanldeClickBtn = () => {
        console.log('hanldeClickBtn');
    };

    return (
        <div className="home-wapper">
            <MyButton hanldeClick={hanldeClickBtn} primary>
                Button
            </MyButton>
            <WapperInput></WapperInput>
            <div>Home page</div>
        </div>
    );
}

const mapStateToProps = (state) => ({
    todos: state.myTodos.todos,
});

export default connect(mapStateToProps)(Home);
