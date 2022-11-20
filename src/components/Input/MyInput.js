import classNames from 'classnames';

import style from './MyInput.module.scss';

function MyInput({ value, placeholder, name, type, handleOnchange, icon, invalid, handleChanIcon }) {
    const handleOnchangeInput = (e) => {
        handleOnchange({ name: name, value: e.target.value });
    };

    function IconComponent() {
        if (name === 'password') {
            return (
                <span className={style.inputWapperIcon} onClick={handleChanIcon}>
                    <i className={icon}></i>
                </span>
            );
        }
    }
    // handleShowHideInput();

    const inputClasses = classNames({
        [style.baseInput]: true,
        [style.invalid]: invalid,
        // [style.formControll]: true,
    });

    return (
        <span className={style.inputCtn}>
            <input
                value={value}
                placeholder={placeholder}
                name={name}
                type={type}
                onChange={handleOnchangeInput}
                className={inputClasses}
            />
            <IconComponent></IconComponent>
            {/* <span className={style.inputWapperIcon}>
                <i className="fa-solid fa-eye"></i>
            </span> */}
            {/* <i className="fa-sharp fa-solid fa-eye-slash"></i> */}
        </span>
    );
}

export default MyInput;
