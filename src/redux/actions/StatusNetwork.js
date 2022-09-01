import axios from 'axios'

const urlAPI = 'https://test.dhanz.me/api/v1'

const GetRequest = () => {
    return {
        type: "GET_STATUS_REQUEST"
    };
}

const GetSuccess = (data) => {
    return {
        type: "GET_STATUS_SUCCESS",
        payload: data
    };
}


export const GetStatusOn = (data) => {
    return (dispatch) => {
        dispatch(GetRequest())
        if (data) {
            dispatch(GetSuccess(data))
        } else {
            axios({
                method: 'get',
                url: `${urlAPI}/movies?page=1&limit=1`,
            }).then((response) => {
                if (response.status === 200) {
                    dispatch(GetSuccess(false))
                } else {
                    dispatch(GetSuccess(true))
                }
            }).catch((error) => {
                dispatch(GetSuccess(true))
            })
        }
    }
}

export const GetStatusOff = (data) => {
    return (dispatch) => {
        dispatch(GetSuccess(data))
    }
}
