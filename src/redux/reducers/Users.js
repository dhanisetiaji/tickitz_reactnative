const initialState = {
    loading: false,
    Notification: [],
    NotifStatus: 0,
    History: [],
    Error: null,
}

const Fetch = (state = initialState, action) => {
    switch (action.type) {
        case "GET_USER_REQUEST":
            return { ...state, loading: true }
        case "GET_NOTIFICATION":
            return {
                ...state, loading: false, Notification: action.payload
            }
        case 'GET_USER_ERROR':
            return {
                ...state, loading: false, Error: action.payload
            }
        case 'GET_NOTIFICATION_STATUS':
            return {
                ...state, loading: false, NotifStatus: action.payload
            }
        case 'GET_HISTORY':
            return {
                ...state, loading: false, History: action.payload
            }
        default:
            return state
    }
}

export default Fetch