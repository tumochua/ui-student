import { useState } from 'react';

import { Link } from 'react-router-dom';

import style from './Register.module.scss';

import WapperInput from '@/components/WapperInput';
import Button from '@/components/Button';

import config from '@/config';
import { useShowHideIconPassword, useTypeInput, useValidateForm } from '@/use/Forms';

import { handRegisterUser } from '@/services/apis';

function Register() {
    const [user, setUser] = useState({
        email: '',
        password: '',
    });
    const [iconPassword, setIconPassword] = useState('fa-sharp fa-solid fa-eye-slash');
    const [type, setType] = useState('password');
    const [error, setError] = useState(null);

    const handleRegister = (e) => {
        e.preventDefault();
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const data = useValidateForm(newObjectUser);
        setError(data);
        // console.log(error);
        // console.log(user);
        error &&
            error.every(async (item) => {
                if (item.success) {
                    const response = await handRegisterUser(user);
                    console.log(response);
                }
                return '';
            });
    };

    const newObjectUser = [
        {
            name: 'email',
            value: user.email,
            length: 5,
            isRequire: true,
        },
        {
            name: 'password',
            value: user.password,
            length: 5,
            isRequire: true,
        },
    ];

    const handleOnchange = (data) => {
        // bảo lưu users và thêm data input
        setUser({ ...user, [data.name]: data.value });
        if (error) {
            error.map((item) => {
                if (item.name === data.name) {
                    item.errorMessage = '';
                    item.statusError = false;
                }
                return null;
            });
        }
    };

    const handleChanIcon = () => {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const classPassword = useShowHideIconPassword(iconPassword);
        setIconPassword(classPassword);
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const resultType = useTypeInput(type);
        setType(resultType);
    };

    return (
        <div className={style.loginWapper}>
            <div className={style.bodyWapper}>
                <div className={style.headeWapper}>
                    <h1>Register An Account</h1>
                    <p>
                        Register an account to enjoy all the services <br /> without any ads for free!
                    </p>
                </div>
                <form className={style.formBody}>
                    <WapperInput
                        lable="Email Address"
                        value={user.email}
                        name="email"
                        type="email"
                        handleOnchange={handleOnchange}
                        placeholder="Email Address"
                        errors={error && error[0].errorMessage}
                        invalid={error && error[0].statusError}
                    ></WapperInput>
                    <WapperInput
                        lable="Password"
                        value={user.password}
                        name="password"
                        type={type}
                        handleOnchange={handleOnchange}
                        placeholder="Password"
                        icon={iconPassword}
                        handleChanIcon={handleChanIcon}
                        errors={error && error[1].errorMessage}
                        invalid={error && error[1].statusError}
                    ></WapperInput>
                    <Button success fullWidth top hanldeClick={handleRegister}>
                        Register
                    </Button>
                </form>
                <div className={style.footerWapper}>
                    <p>
                        Already Have An Account?{' '}
                        <Link to={config.routes.login} className={style.navLink}>
                            Login
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Register;
