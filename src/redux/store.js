import { createStore, applyMiddleware } from 'redux'
import { persistStore, persistReducer } from 'redux-persist'
import storage from '@react-native-async-storage/async-storage'
import rootReducer from './reducers'
import thunk from 'redux-thunk'
import logger from 'redux-logger'

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ["auth"],
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

let store = createStore(persistedReducer, applyMiddleware(thunk))
let persistor = persistStore(store)
export {
    store,
    persistor
}