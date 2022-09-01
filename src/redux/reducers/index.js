import { combineReducers } from 'redux'
import Movies from './Movies'
import StatusNetwork from './StatusNetwork'
import Auth from './Auth'
import Users from './Users'
const rootReducers = combineReducers({
    movies: Movies,
    statusnetwork: StatusNetwork,
    auth: Auth,
    users: Users
})
export default rootReducers