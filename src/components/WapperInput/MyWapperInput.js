import { useState } from 'react';

import './MyWapperInput.module.scss';
import MyInput from '@/components/Input/MyInput';
import MyLable from '@/components/Lable/MyLable';
import MyError from '@/components/Error/MyError';
function MyWapperInput() {
    const [users, setUsers] = useState({
        email: '',
        passworld: '',
    });

    const handleOnchange = (data) => {
        //  ko đc modifile trực tiếp state phải thông qua 1 bước trung gian
        setUsers({ ...users, [data.name]: data.value });
    };

    return (
        <div className="wapper-input">
            <div>
                <MyLable>MyLable</MyLable> <br />
                <MyInput value={users.email} placeholder="email" name="email" handleOnchange={handleOnchange}></MyInput>
                <MyInput
                    value={users.passworld}
                    placeholder="passworld"
                    name="passworld"
                    type="passworld"
                    handleOnchange={handleOnchange}
                ></MyInput>
                <br />
                <MyError>MyError</MyError>
            </div>
        </div>
    );
}

export default MyWapperInput;
