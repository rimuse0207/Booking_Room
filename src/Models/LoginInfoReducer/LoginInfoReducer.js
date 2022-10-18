export const LOGIN_INFO_GET = 'LOGIN_INFO_GET';
export const LOGOUT_INFO_GET = 'LOGOUT_INFO_GET';

const initState = {
    Infomation: {
        Login_id: null,
        Login_name: null,
        Login_company: null,
        Login_epid: null,
        Login_epid_id: null,
        Login_token: null,
        Login_Admin_Access: false,
    },
};

export const LOGIN_INFO_DATA_Changes = data => ({
    type: LOGIN_INFO_GET,
    payload: data,
});

export const LOGOUT_INFO_DATA_Changes = () => ({
    type: LOGOUT_INFO_GET,
});

const LoginInfoData = (state = initState, action) => {
    switch (action.type) {
        case LOGIN_INFO_GET:
            return {
                ...state,
                Infomation: action.payload,
            };
        case LOGOUT_INFO_GET:
            return initState;
        default:
            return state;
    }
};
export default LoginInfoData;
