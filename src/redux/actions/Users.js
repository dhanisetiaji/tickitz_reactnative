import axios from "axios";
import { ToastAndroid } from "react-native";
import { GetDetailUserAuth } from "./Auth";

const GetUsersRequest = () => {
    return {
        type: "GET_AUTH_REQUEST"
    };
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