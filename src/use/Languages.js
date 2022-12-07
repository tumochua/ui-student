export const useChangeLanguageRole = (language, state) => {
    if (state.userInfor) {
        switch (language) {
            case 'vi':
                return {
                    // ...state,
                    value: state.userInfor.data.roleData.valueVi,
                };
            case 'en':
                return {
                    // ...state,
                    value: state.userInfor.data.roleData.valueEn,
                };
            default:
                throw new Error('Invalid language');
        }
    }
};
export const useChangeLanguageGender = (language, state) => {
    if (state.userInfor) {
        switch (language) {
            case 'vi':
                return {
                    // ...state,
                    value: state.userInfor.data.genderData.valueVi,
                };
            case 'en':
                return {
                    // ...state,
                    value: state.userInfor.data.genderData.valueEn,
                };
            default:
                throw new Error('Invalid language');
        }
    }
};
