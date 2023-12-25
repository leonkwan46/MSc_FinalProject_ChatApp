import { combineReducers } from 'redux'
import authSlice from './authSlice'
import signUpInfoSlice from './signUpInfoSlice'
import sessionSlice from './sessionSlice'

const rootReducer = combineReducers({
    auth: authSlice,
    signUpInfo: signUpInfoSlice,
    session: sessionSlice,
})

export default rootReducer