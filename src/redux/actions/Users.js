import axios from "axios";
import { Alert, ToastAndroid } from "react-native";
import { GetDetailUserAuth } from "./Auth";

const GetUsersRequest = () => {
    return {
        type: "GET_USER_REQUEST"
    };
}

const GetUserNotification = (data) => {
    return {
        type: "GET_NOTIFICATION",
        payload: data
    }
}

const ErrorUsers = (error) => {
    return {
        type: "GET_USER_ERROR",
        payload: error
    }
}

const NotifStatus = (status) => {
    return {
        type: "GET_NOTIFICATION_STATUS",
        payload: status
    }
}

const getHistory = (payload) => {
    return {
        type: "GET_HISTORY",
        payload: payload
    }
}

export const GetHistory = (id, token) => {
    return (dispatch) => {
        dispatch(GetUsersRequest())
        axios({
            method: "get",
            url: `https://test.dhanz.me/api/v1/booking?id_user=${id}`,
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json; charset=utf-8'
            }
        }).then((res) => {
            if (res.status === 200) {
                dispatch(getHistory(res.data.data))
            }
        }).catch((err) => {
            // console.log(err.response)
            dispatch(ErrorUsers(err, 'err'))
        })
    }
}


export const GetNotifStatus = (token) => {
    return (dispatch) => {
        dispatch(GetUsersRequest())
        axios({
            method: 'get',
            url: `https://test.dhanz.me/api/v1/notification/isread`,
            headers: {
                'Authorization': `Bearer ${token}`,
            }
        }).then(res => {
            dispatch(NotifStatus(res.data.data.length))
        }).catch(err => {
            dispatch(ErrorUsers(err.response))
        })
    }
}

export const ChangeNotifStatus = (token) => {
    return (dispatch) => {
        axios({
            method: 'patch',
            url: `https://test.dhanz.me/api/v1/notification`,
            headers: {
                'Authorization': `Bearer ${token}`,
            }
        }).then(res => {

        }).catch(err => {
            dispatch(ErrorUsers(err.response))
        })
    }
}

export const addUserBooking = (form, token) => {
    return (dispatch) => {
        dispatch(GetUsersRequest())
        axios({
            method: "POST",
            url: `https://test.dhanz.me/api/v1/booking/`,
            data: form,
            headers: {
                'Authorization': `Bearer ${token}`,
            }
        }).then((res) => {
        }).catch((err) => {
            dispatch(ErrorUsers(err.response.data))
        })
    }
}

export const deleteNotif = (id, token) => {
    return (dispatch) => {
        dispatch(GetUsersRequest())
        axios({
            method: "DELETE",
            url: `https://test.dhanz.me/api/v1/notification/${id}`,
            headers: {
                'Authorization': `Bearer ${token}`,
            }
        }).then((res) => {
            ToastAndroid.showWithGravity('Success delete!', ToastAndroid.SHORT, ToastAndroid.TOP)
        }).catch((err) => {
            dispatch(ErrorUsers(err.response.data))
            ToastAndroid.showWithGravity('Error,please try again!', ToastAndroid.SHORT, ToastAndroid.TOP)
        })
    }
}

export const UpdateUsers = (form, token, id) => {
    return (dispatch) => {
        dispatch(GetUsersRequest())
        axios({
            method: 'patch',
            url: `https://test.dhanz.me/api/v1/users/update/${id}`,
            data: form,
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'multipart/form-data',
            }
        }).then(res => {
            ToastAndroid.showWithGravity('Success update profile!', ToastAndroid.SHORT, ToastAndroid.TOP)
            dispatch(GetDetailUserAuth(token))
        }).catch(err => {
            ToastAndroid.showWithGravity('Error,please try again!', ToastAndroid.SHORT, ToastAndroid.TOP)
        })
    }
}


export const UpdatePasswordUsers = (password, token, id) => {
    return (dispatch) => {
        dispatch(GetUsersRequest())
        axios({
            method: 'patch',
            url: `https://test.dhanz.me/api/v1/users/update-password/${id}`,
            data: { password: password },
            headers: {
                'Authorization': `Bearer ${token}`,
            }
        }).then(res => {
            ToastAndroid.showWithGravity('Success update password!', ToastAndroid.SHORT, ToastAndroid.TOP)
            dispatch(GetDetailUserAuth(token))
        }).catch(err => {
            ToastAndroid.showWithGravity('Error,please try again!', ToastAndroid.SHORT, ToastAndroid.TOP)
        })
    }
}

export const GetNotification = (token) => {
    return (dispatch) => {
        dispatch(GetUsersRequest())
        axios({
            method: 'get',
            url: `https://test.dhanz.me/api/v1/notification`,
            headers: {
                'Authorization': `Bearer ${token}`,
            }
        }).then(res => {
            dispatch(GetUserNotification(res.data.data))
        }).catch(err => {
            dispatch(ErrorUsers(err.response))
        })
    }
}