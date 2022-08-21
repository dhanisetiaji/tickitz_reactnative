const initialState = {
    loading: false,
    isOffline: false,
}

const Fetch = (state = initialState, action) => {
    switch (action.type) {
        case "GET_STATUS_REQUEST":
            return { ...state, loading: true }
        case "GET_STATUS_SUCCESS":
            return {
                ...state, isOffline: action.payload
            }
        default:
            return state
    }
}

export default Fetch