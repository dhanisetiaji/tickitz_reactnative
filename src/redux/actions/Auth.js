import axios from 'axios'
import Toast from 'react-native-toast-message';

const urlAPI = 'https://test.dhanz.me/api/v1'

const GetAuthRequest = () => {
    return {
        type: "GET_AUTH_REQUEST"
    };
}

const GetAuth = (data) => {
    return {
        type: "GET_AUTH",
        payload: data
    };
};

const GetAuthReg = (data) => {
    return {
        type: "GET_AUTH_REG",
        payload: data
    };
};

const GetDetailAuth = (data) => {
    return {
        type: "GET_DETAIL_AUTH",
        payload: data
    };
}

const GetAuthErr = (err) => {
    return {
        type: "GET_AUTH_ERR",
        payload: err
    };
}

export const AuthLogout = () => {
    return {
        type: "AUTH_LOGOUT",
    }
}

export const GetAuthLogin = (formLogin) => {
    return (dispatch) => {
        dispatch(GetAuthRequest())
        axios({
            method: "POST",
            data: formLogin,
            url: `${urlAPI}/auth/login`,
        }).then((res) => {
            if (res.status === 200) {
                Toast.show({
                    type: 'success',
                    text1: 'Message:',
                    text2: 'Login success 👋'
                });
                dispatch(GetAuth(res.data))
            }
        }).catch((err) => {
            if (!err.response.data.message) {
                Toast.show({
                    type: 'error',
                    text1: 'Message:',
                    text2: 'Erorr, Please try again'
                });
                dispatch(GetAuthErr({ message: `Erorr, Please try again` }))
            } else {
                Toast.show({
                    type: 'error',
                    text1: 'Message:',
                    text2: `${err.response.data.message}`
                });
                dispatch(GetAuthErr(err.response.data))
            }
        })
    }
};

export const GetDetailUserAuth = (token) => {
    return (dispatch) => {
        axios({
            method: "POST",
            data: { token: token },
            url: `${urlAPI}/auth/verify-token`,
        }).then((res) => {
            if (res.status === 200) {
                axios({
                    method: "GET",
                    url: `${urlAPI}/users/${res.data.data.id}`,
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }).then((result) => {
                    dispatch(GetDetailAuth(result.data))
                }).catch((err) => {
                    dispatch(AuthLogout())
                })
            }
        }).catch((err) => {
            dispatch(GetAuthErr(err.response.data))
            dispatch(AuthLogout())
        })
    }
}

export const GetAuthRegister = (formRegister) => {
    return (dispatch) => {
        dispatch(GetAuthRequest())
        axios({
            method: "POST",
            data: formRegister,
            url: `${urlAPI}/auth/register`,
        }).then((res) => {
            if (res.status === 200) {
                Toast.show({
                    type: 'success',
                    text1: 'Message:',
                    text2: 'Register success,please login!👋'
                });
                dispatch(GetAuthReg(res.data))
            }
        }).catch((err) => {
            if (!err.response.data.message) {
                Toast.show({
                    type: 'error',
                    text1: 'Message:',
                    text2: 'Erorr, Please try again'
                });
                console.log(err.response.data, 'asdasdsa');
                dispatch(GetAuthErr({ message: `Erorr, Please try again` }))
            } else {
                Toast.show({
                    type: 'error',
                    text1: 'Message:',
                    text2: `${err.response.data.message}`
                });
                dispatch(GetAuthErr(err.response.data))
            }
        })
    }
}