import { combineReducers } from 'redux'
import authReducer from './authSlice'
import overlayReducer from './overlaySlice'

const rootReducer = combineReducers({
    auth: authReducer,
    overlay: overlayReducer,
})

export default rootReducer