import { createSlice } from "@reduxjs/toolkit";
import { getSocketId } from "../../helpers/socketHelpers";

const initialState = {
    user: {
        _id: '',
        username: '',
        role: '',
        socketId: '',
    },
    currentScreen: '',
    isLoading: false,
    error: null,
}

const sessionSlice = createSlice({
    name: 'session',
    initialState: {...initialState},
    reducers: {
        setUser: (state, action) => {
            state.user._id = action.payload._id,
            state.user.username = action.payload.username,
            state.user.role = action.payload.role,
            state.user.socketId = getSocketId()
        },
        setCurrentScreen: (state, action) => {
            state.currentScreen = action.payload
        },
    }
})

export const { setUser, setCurrentScreen } = sessionSlice.actions
export default sessionSlice.reducer