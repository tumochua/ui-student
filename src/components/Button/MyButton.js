import style from './MyButton.module.scss';
import classNames from 'classnames';

function MyButton({ children, danger, disabled, success, error, hanldeClick }) {
    // console.log(style);
    const btnClassses = classNames({
        [style.baseBtn]: true,
        [style.danger]: danger,
        [style.disabled]: disabled,
        [style.success]: success,
        [style.error]: error,
    });

    return (
        <button className={btnClassses} onClick={hanldeClick}>
            {children}
        </button>
    );
}

export default MyButton;
