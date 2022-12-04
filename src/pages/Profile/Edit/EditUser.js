import { memo, useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

// import style from './EditUser.module.scss';

import MyButton from '@/components/Button/MyButton';
import FormInput from '@/components/FormInput';

import { useCheckForm, useShowHideIconPassword } from '@/use/Forms';

function EditUser() {
    const { t } = useTranslation();
    const [iconPassword, setIconPassword] = useState('fa-sharp fa-solid fa-eye-slash');
    const [typePassword, setTypePassword] = useState(true);

    const [valueInput, setValueInput] = useState({
        userName: '',
        email: '',
        birthday: '',
        password: '',
        confirmPassword: '',
        avatar: '',
    });

    const requires = [
        {
            id: 1,
            name: 'email',
            require: true,
            length: 6,
            value: valueInput.email.trim(),
        },
        {
            id: 2,
            name: 'password',
            require: true,
            length: 6,
            value: valueInput.password.trim(),
        },
        {
            id: 3,
            name: 'userName',
            require: true,
            length: 6,
            value: valueInput.userName.trim(),
        },
        {
            id: 4,
            name: 'avatar',
            require: true,
            length: 6,
            value: valueInput.avatar,
        },
    ];

    const [errors, setErrors] = useState({
        password: '',
        email: '',
        userName: '',
        avatar: '',
    });

    const handleEditUser = (e) => {
        e.preventDefault();
        // console.log('valueInput', valueInput);
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const result = useCheckForm(requires);
        console.log('result', result);
        if (result) {
            result.forEach((element) => {
                // console.log('element', element);
                if (element) {
                    if (!element.success) {
                        setErrors((errors) => ({ ...errors, [element.name]: element.errorMessage }));
                        return;
                    }
                    if (element.success) {
                        setErrors((errors) => ({ ...errors, [element.name]: '' }));
                        return;
                    }
                }
            });
        }
    };
    useEffect(() => {
        // console.log('errors', errors);
    }, [errors]);
    const handleOnChangeInput = (data) => {
        // console.log('data', data);
        setValueInput({ ...valueInput, [data.name]: data.value });
        setErrors((errors) => ({ ...errors, [data.name]: '' }));
        // setValueInput({ [data.name]: data.value });
    };
    const handleChangeIconPassword = () => {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const result = useShowHideIconPassword(iconPassword);
        setIconPassword(result);
        setTypePassword(!typePassword);
    };
    return (
        <>
            <div>
                <form>
                    <FormInput
                        label="User Name"
                        placeholder="User Name.."
                        half
                        value={valueInput.userName}
                        name="userName"
                        onChangeInput={handleOnChangeInput}
                        errorMessage={errors.userName}
                        invalid={errors.userName}
                    ></FormInput>
                    <FormInput
                        type="email"
                        label="Email"
                        half
                        value={valueInput.email}
                        name="email"
                        onChangeInput={handleOnChangeInput}
                        placeholder="Email..."
                        errorMessage={errors.email}
                        invalid={errors.email}
                    ></FormInput>
                    <FormInput
                        label="Password"
                        half
                        value={valueInput.password}
                        name="password"
                        onChangeInput={handleOnChangeInput}
                        placeholder="Password"
                        type={typePassword ? 'password' : 'text'}
                        errorMessage={errors.password}
                        invalid={errors.password}
                        icon={iconPassword}
                        onChangeIconPassword={handleChangeIconPassword}
                    ></FormInput>
                    <FormInput
                        label="File"
                        half
                        name="avatar"
                        onChangeInput={handleOnChangeInput}
                        placeholder="avatar"
                        type="file"
                        errorMessage={errors.avatar}
                        invalid={errors.avatar}
                    ></FormInput>
                    <MyButton hanldeClick={handleEditUser} success medium>
                        {t('Profile.edit')}
                    </MyButton>
                </form>
            </div>
        </>
    );
}

export default memo(EditUser);
