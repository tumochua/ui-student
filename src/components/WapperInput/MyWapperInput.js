import style from './MyWapperInput.module.scss';
import MyInput from '@/components/Input/MyInput';
import MyLable from '@/components/Lable/MyLable';
import MyError from '@/components/Error/MyError';
function MyWapperInput({ value, name, placeholder, handleOnchange, errors, lable, invalid }) {
    return (
        <div className={style.wapperInput}>
            <MyLable>{lable}</MyLable> <br />
            <MyInput
                className={style.formControll}
                invalid={invalid}
                value={value}
                placeholder={placeholder}
                name={name}
                type={name}
                handleOnchange={handleOnchange}
            ></MyInput>{' '}
            <br />
            <MyError invalid>{errors}</MyError>
        </div>
    );
}

export default MyWapperInput;
