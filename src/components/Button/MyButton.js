import './MyButton.scss';
import classNames from 'classnames';

function MyButton({ children, disabled, success, error, hanldeClick }) {
    const btnClassses = classNames({
        'base-btn': true,
        'btn-disabled': disabled,
        'btn-success': success,
        'btn-error': error,
    });

    return (
        <button className={btnClassses} onClick={hanldeClick}>
            {children}
        </button>
    );
}

export default MyButton;
