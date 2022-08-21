import { combineReducers } from 'redux'
import Movies from './Movies'
import StatusNetwork from './StatusNetwork'
import Auth from './Auth'
const rootReducers = combineReducers({
    movies: Movies,
    statusnetwork: StatusNetwork,
    auth: Auth
})
export default rootReducers