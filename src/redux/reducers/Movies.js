const initialState = {
    loading: false,
    Movies: {
        results: [],
        totalAllData: 0,
        totalPage: 0,
        totalRows: 0,
    },
    Detail: {
        data: [],
    },
    All: {
        results: [],
        totalAllData: 0,
        totalPage: 0,
        totalRows: 0,
    }
}

const Fetch = (state = initialState, action) => {
    switch (action.type) {
        case "GET_MOVIES_REQUEST":
            return { ...state, loading: true }
        case "GET_MOVIES_SUCCESS":
            return {
                ...state, loading: false, Movies: action.payload
            }
        case "GET_DETAIL_MOVIE_SUCCESS":
            return {
                ...state, loading: false, Detail: action.payload
            }
        case "GET_ALL_MOVIE":
            return {
                ...state, loading: false, All: action.payload
            }
        default:
            return state
    }
}

export default Fetch