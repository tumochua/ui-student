import { useState, useEffect } from 'react';

import classNames from 'classnames';

import MyButton from '@/components/Button/MyButton';
import WapperInput from '@/components/WapperInput';

import { connect } from 'react-redux';
import style from './Home.module.scss';

import { useValidateForm } from '@/use/form/Form';

// import { getTest } from '../../services/apis';

function Home() {
    const [users, setUsers] = useState({
        email: '',
        password: '',
        address: '',
    });

    const [errorForm, setErrorForm] = useState(null);

    const newOject = [
        {
            name: 'email',
            value: users.email,
            length: 5,
            isRequire: true,
        },
        {
            name: 'password',
            value: users.password,
            length: 5,
            isRequire: true,
        },
        {
            name: 'address',
            value: users.address,
            length: 5,
            isRequire: true,
        },
    ];

    useEffect(() => {
        // const data = getTest();
        // console.log('check data', data);
    }, []);

    const handleSumit = (e) => {
        e.preventDefault();
    };

    const homeClasses = classNames({
        [style.home]: true,
    });

    const hanldeClickBtn = () => {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        setErrorForm(useValidateForm(newOject));
    };
    const handleOnchange = (data) => {
        // bảo lưu users và thêm data input
        setUsers({ ...users, [data.name]: data.value });
    };

    return (
        <div className={homeClasses}>
            <form onSubmit={handleSumit}>
                <WapperInput
                    value={users.email}
                    handleOnchange={handleOnchange}
                    name="email"
                    // errors={errorForm && errorForm[0]}
                    // invalid={errorForm && errorForm[0] ? true : false}
                    lable="Email"
                    placeholder="Email"
                ></WapperInput>
                <WapperInput
                    value={users.password}
                    handleOnchange={handleOnchange}
                    // errors={errorForm && errorForm[1]}
                    // invalid={errorForm && errorForm[1] ? true : false}
                    name="password"
                    lable="Password"
                    placeholder="Password"
                ></WapperInput>
                <WapperInput
                    value={users.address}
                    handleOnchange={handleOnchange}
                    // errors={errorForm && errorForm[2]}
                    // invalid={errorForm && errorForm[2] ? true : false}
                    name="address"
                    lable="Address"
                    placeholder="Address"
                ></WapperInput>
                <MyButton hanldeClick={hanldeClickBtn} success>
                    Button
                </MyButton>
            </form>
        </div>
    );
}

const mapStateToProps = (state) => ({
    todos: state.myTodos.todos,
});

export default connect(mapStateToProps)(Home);
