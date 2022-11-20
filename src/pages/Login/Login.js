import { Link } from 'react-router-dom';

import style from './Login.module.scss';

import WapperInput from '@/components/WapperInput';
import Button from '@/components/Button';

import config from '@/config';

function Login() {
    return (
        <div className={style.loginWapper}>
            <div className={style.bodyWapper}>
                <div className={style.headeWapper}>
                    <h1>Login An Account</h1>
                    <p>
                        Login an account to enjoy all the services <br /> without any ads for free!
                    </p>
                </div>
                <form className={style.formBody}>
                    <WapperInput lable="Email Address" placeholder="Email Address"></WapperInput>
                    <WapperInput lable="Password" placeholder="Password"></WapperInput>
                    <Button success fullWidth top>
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
    );
}

export default Login;