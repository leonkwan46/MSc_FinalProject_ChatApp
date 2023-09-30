import { combineReducers } from 'redux'
import authReducer from './authSlice'
import signUpInfoSlice from './signUpInfoSlice'

const rootReducer = combineReducers({
    auth: authReducer,
    signUpInfo: signUpInfoSlice,
})

export default rootReducer