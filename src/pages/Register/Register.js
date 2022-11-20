import { Link } from 'react-router-dom';

import style from './Register.module.scss';

import WapperInput from '@/components/WapperInput';
import Button from '@/components/Button';

import config from '@/config';

function Register() {
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
                    <WapperInput lable="Email Address" placeholder="Email Address"></WapperInput>
                    <WapperInput lable="Password" placeholder="Password"></WapperInput>
                    <Button success fullWidth top>
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
