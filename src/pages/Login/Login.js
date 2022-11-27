/// reactjs
import { useState, useEffect } from 'react';
/// react-router-dom
import { Link, useNavigate } from 'react-router-dom';

/// redux
import { connect } from 'react-redux';

///scss
import style from './Login.module.scss';
///component
import WapperInput from '@/components/WapperInput';
import Button from '@/components/Button';
import Loading from '@/components/Loading';
///config router
import config from '@/config';
/// hook validate form
import { useShowHideIconPassword, useTypeInput, useValidateForm } from '@/use/Forms';

/// api
// import { handleApiLogin } from '@/services/apis';

/// redux
import { createUser } from '@/store/actions/userActions';

function Login({ createUser, userRedux }) {
    const navigate = useNavigate();

    // const [cookies, setCookie] = useCookies(null);
    const [user, setUser] = useState({
        email: '',
        password: '',
    });

    const [iconPassword, setIconPassword] = useState('fa-sharp fa-solid fa-eye-slash');
    const [type, setType] = useState('password');
    const [error, setError] = useState(null);
    const [result, setResult] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleLogin = (e) => {
        e.preventDefault();
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const data = useValidateForm(newObjectUser);
        setError(data);
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
    useEffect(() => {
        setResult(
            error &&
                error.every((item) => {
                    return item.success ? true : false;
                }),
        );
        if (result) {
            async function fetchHandleLogin() {
                setIsLoading(true);
                try {
                    createUser(user);
                    // const response = await handleApiLogin(user);
                    // console.log(response);
                    // if (response.data.accessToken && response.data.refreshToken && response.data.statusCode === 2) {
                    // }
                } catch (error) {
                    console.log(error);
                } finally {
                    setIsLoading(false);
                }
            }
            fetchHandleLogin();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [result, error]);

    useEffect(() => {
        console.log('userRedux', userRedux);
    }, [userRedux]);

    return (
        <>
            {isLoading ? <Loading /> : null}
            <div className={style.loginWapper}>
                <div className={style.bodyWapper}>
                    <div className={style.headeWapper}>
                        <h1>Login An Account</h1>
                        <p>
                            Login an account to enjoy all the services <br /> without any ads for free!
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
                        <Button success fullWidth top hanldeClick={handleLogin}>
                            Login
                        </Button>
                    </form>
                    <div className={style.footerWapper}>
                        <p>
                            Already Have An Account?{' '}
                            <Link to={config.routes.register} className={style.navLink}>
                                Register
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
}
const mapStateToProps = (state) => ({
    userRedux: state.users.user,
});
export default connect(mapStateToProps, { createUser })(Login);
