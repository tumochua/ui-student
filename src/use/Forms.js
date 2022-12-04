const reg =
    // eslint-disable-next-line no-useless-escape
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,24}))$/;
let dataCheck = {};

const handleValidateEmail = (email, name) => {
    const checkEmail = reg.test(email);
    if (checkEmail) {
        return {
            success: true,
        };
    } else {
        return {
            statusError: true,
            errorMessage: `Trường này phải là email`,
            name: name,
        };
    }
};

const handleCheckLength = (props) => {
    dataCheck = props.map((item) => {
        if (item.isRequire) {
            if (item.name === 'email') {
                return handleValidateEmail(item.value, item.name);
            } else {
                if (item.value.length > item.length) {
                    return {
                        success: true,
                    };
                } else {
                    return {
                        statusError: true,
                        errorMessage: `Trường này phải lớn hơn ${item.length}`,
                        name: item.name,
                    };
                }
            }
        } else {
            return {
                success: true,
            };
        }
    });
    return dataCheck;
};

const useValidateForm = (user) => {
    const data = handleCheckLength(user);
    return data;
};

const useShowHideIconPassword = (icon) => {
    return icon === 'fa-sharp fa-solid fa-eye-slash' ? 'fa-solid fa-eye' : 'fa-sharp fa-solid fa-eye-slash';
};

const useTypeInput = (type) => {
    return type === 'password' ? 'text' : 'password';
};

const useCheckForm = (dataforms) => {
    // console.log('dataforms', dataforms);
    if (dataforms) {
        return dataforms.map((element) => {
            if (element.require) {
                // console.log('element', element);
                if (element.name === 'email') {
                    const checkEmail = reg.test(element.value);
                    // console.log('checkEmail', checkEmail);
                    if (!checkEmail) {
                        return {
                            name: element.name,
                            errorMessage: `Trường ${element.name} của bạn là email`,
                        };
                    }
                }
                if (element.name === 'avatar') {
                    if (!element.value) {
                        return {
                            name: element.name,
                            errorMessage: `Trường ${element.name} của bạn là bắt buộc`,
                        };
                    }
                }
                if (element.value.length < element.length) {
                    if (element.name !== 'email') {
                        return {
                            name: element.name,
                            errorMessage: `Trường ${element.name} của bạn phải lớn hơn ${element.length} ký tự`,
                        };
                    }
                }
            } else {
                return {
                    name: element.name,
                    success: true,
                };
            }
        });
    }
};

module.exports = {
    useValidateForm,
    useShowHideIconPassword,
    useTypeInput,
    useCheckForm,
};
