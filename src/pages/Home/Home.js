import classNames from 'classnames';

import MyButton from '@/components/Button/MyButton';
import WapperInput from '@/components/WapperInput';

import { connect } from 'react-redux';
import style from './Home.module.scss';

function Home() {
    const homeClasses = classNames({
        [style.home]: true,
    });

    // console.log(todos);
    const hanldeClickBtn = () => {
        console.log('hanldeClickBtn');
    };

    return (
        <div className={homeClasses}>
            <WapperInput></WapperInput>
            <MyButton hanldeClick={hanldeClickBtn} success>
                Button
            </MyButton>
        </div>
    );
}

const mapStateToProps = (state) => ({
    todos: state.myTodos.todos,
});

export default connect(mapStateToProps)(Home);
