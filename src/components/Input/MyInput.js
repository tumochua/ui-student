import classNames from 'classnames';

import style from './MyInput.module.scss';

function MyInput({ value, placeholder, name, type, handleOnchange }) {
    const checkType = type ? type : 'text';

    const handleOnchangeInput = (e) => {
        handleOnchange({ name: name, value: e.target.value });
    };
    const inputClasses = classNames({
        [style.baseInput]: true,
    });

    return (
        <input
            value={value}
            placeholder={placeholder}
            name={name}
            type={checkType}
            onChange={handleOnchangeInput}
            className={inputClasses}
        />
    );
}

export default MyInput;
