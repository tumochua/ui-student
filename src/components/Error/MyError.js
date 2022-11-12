import classNames from 'classnames';
import style from './MyError.module.scss';

function MyError({ children, isError }) {
    const errorClasses = classNames({
        [style.baseError]: true,
        [style.error]: isError,
    });

    return <span className={errorClasses}>{children}</span>;
}

export default MyError;
