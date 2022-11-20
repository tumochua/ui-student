import './MyWapperInput.module.scss';
import MyInput from '@/components/Input/MyInput';
import MyLable from '@/components/Lable/MyLable';
import MyError from '@/components/Error/MyError';
function MyWapperInput({ value, name, placeholder, handleOnchange, errors, lable, invalid }) {
    // console.log('invalid', invalid);
    // console.log('errors', errors);
    return (
        <div className="wapper-input">
            <div>
                <MyLable>{lable}</MyLable> <br />
                <MyInput
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
        </div>
    );
}

export default MyWapperInput;
