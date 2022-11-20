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

const useValidateForm = (params) => {
    const data = handleCheckLength(params);
    console.log('data', data);
};

module.exports = {
    useValidateForm,
};
