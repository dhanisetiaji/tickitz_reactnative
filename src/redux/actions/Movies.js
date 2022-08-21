import axios from 'axios'

const urlAPI = 'https://test.dhanz.me/api/v1'

const GetRequest = () => {
    return {
        type: "GET_MOVIES_REQUEST"
    };
}

const GetSuccess = (data) => {
    return {
        type: "GET_MOVIES_SUCCESS",
        payload: data
    };
}

const GetAllMovie = (data) => {
    return {
        type: "GET_ALL_MOVIE",
        payload: data
    };
}

const GetDetail = (data) => {
    return {
        type: "GET_DETAIL_MOVIE_SUCCESS",
        payload: data
    };
}

const GetError = (error) => {
    return {
        type: "GET_MOVIES_ERROR",
        payload: error
    };
}

export const GetMovies = ({ orderBy, page = 1, limit, q }) => {
    return (dispatch) => {
        dispatch(GetRequest())
        axios({
            method: 'get',
            url: `${urlAPI}/movies${q ? `?q=${q}` : '?q='}${orderBy ? `&orderBy=${orderBy}` : ''}${page && limit ? `&page=${page}&limit=${limit}` : ''}`,
        }).then((response) => {
            dispatch(GetSuccess(response.data.data))
        }).catch((error) => {
            dispatch(GetError(error.response.data))
        })
    }
}

export const GetMoviesAll = ({ orderBy, page = 1, limit, q }) => {
    return (dispatch) => {
        dispatch(GetRequest())
        axios({
            method: 'get',
            url: `${urlAPI}/movies${q ? `?q=${q}` : '?q='}${orderBy ? `&orderBy=${orderBy}` : ''}${page && limit ? `&page=${page}&limit=${limit}` : ''}`,
        }).then((response) => {
            dispatch(GetAllMovie(response.data.data))
        }).catch((error) => {
            dispatch(GetError(error.response.data))
        })
    }
}

export const GetMovieById = (id) => {
    return (dispatch) => {
        dispatch(GetRequest())
        axios({
            method: 'get',
            url: `${urlAPI}/movies/${id}`,
        }).then((response) => {
            dispatch(GetDetail(response.data.data))
        }).catch((error) => {
            dispatch(GetError(error.response.data))
        })
    }
}
