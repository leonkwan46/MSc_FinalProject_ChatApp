import { createSlice } from "@reduxjs/toolkit";
import { getSocketId } from "../../helpers/socketHelpers";

const initialState = {
    user: {
        userId: '',
        username: '',
        role: '',
        socketId: '',
    },
    currentChatRoom: {
        roomId: '',
        name: '',
        members: [],
        messages: [],
        createdAt: '',
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
            state.user.userId = action.payload._id,
            state.user.username = action.payload.username,
            state.user.role = action.payload.role,
            state.user.socketId = getSocketId()
        },
        setCurrentChatRoom: (state, action) => {
            state.currentChatRoom.roomId = action.payload._id,
            state.currentChatRoom.name = action.payload.name,
            state.currentChatRoom.members = action.payload.members,
            state.currentChatRoom.messages = action.payload.messages,
            state.currentChatRoom.createdAt = action.payload.createdAt
        },
        setCurrentScreen: (state, action) => {
            state.currentScreen = action.payload
        },
    }
})

export const { setUser, setCurrentScreen, setCurrentChatRoom } = sessionSlice.actions
export default sessionSlice.reducer