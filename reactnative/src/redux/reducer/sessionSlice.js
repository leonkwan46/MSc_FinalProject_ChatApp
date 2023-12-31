import { createSlice } from "@reduxjs/toolkit";
import { getSocketId } from "../../helpers/socketHelpers";

const initialState = {
    user: {
        userId: '',
        email: '',
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
    currentScreen: {
        title: '',
        subtitle: '',
    },
    isLoading: false,
    error: null,
}

const sessionSlice = createSlice({
    name: 'session',
    initialState: {...initialState},
    reducers: {
        setUser: (state, action) => {
            state.user.userId = action.payload.userId,
            state.user.email = action.payload.email,
            state.user.role = action.payload.role,
            state.user.socketId = getSocketId()
        },
        setCurrentChatRoom: (state, action) => {
            state.currentChatRoom.roomId = action.payload.userId,
            state.currentChatRoom.name = action.payload.name,
            state.currentChatRoom.members = action.payload.members,
            state.currentChatRoom.messages = action.payload.messages,
            state.currentChatRoom.createdAt = action.payload.createdAt
        },
        setCurrentScreen: (state, action) => {
            state.currentScreen.title = action.payload.title
            state.currentScreen.subtitle = action.payload.subtitle
        },
    }
})

export const { setUser, setCurrentScreen, setCurrentChatRoom } = sessionSlice.actions
export default sessionSlice.reducer