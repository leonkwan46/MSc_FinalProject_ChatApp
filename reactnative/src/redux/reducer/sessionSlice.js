import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { getSocketId } from "../../helpers/socketHelpers"
import axios from "axios";
import persistReducer from "redux-persist/es/persistReducer"
import storage from 'redux-persist/lib/storage/session'

const initialState = {
    user: {
        userId: '',
        email: '',
        role: '',
        socketId: '',
        token:''
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

export const authInvitationCode = createAsyncThunk(
    'session/authInvitationCode',
    async (codeData, {rejectWithValue}) => {
        const { token, invitationCode } = codeData
        // TODO: add token -> Async storage OR redux persist
        // The current way of storing token in redux is not secure
        try {
            const response = await axios.post('http://localhost:5000/extra_details', invitationCode, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            return response.data
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)

const persistConfig = {
    key: 'session',
    storage,
    whitelist: ['user'], // only 'user' will be persisted
}

const sessionSlice = createSlice({
    name: 'session',
    initialState: {...initialState},
    reducers: {
        setUser: (state, action) => {
            console.log(action.payload)
            state.user.userId = action.payload.user._id,
            state.user.email = action.payload.user.email,
            state.user.role = action.payload.user.role,
            state.user.socketId = getSocketId()
            state.user.token = action.payload.token
        },
        setCurrentChatRoom: (state, action) => {
            state.currentChatRoom.roomId = action.payload._id,
            state.currentChatRoom.name = action.payload.name,
            state.currentChatRoom.members = action.payload.members,
            state.currentChatRoom.messages = action.payload.messages,
            state.currentChatRoom.createdAt = action.payload.createdAt
        },
        setCurrentScreen: (state, action) => {
            state.currentScreen.title = action.payload.title
            state.currentScreen.subtitle = action.payload.subtitle
        },
        testTeacherSesh: (state) => {
            state.user = {
                name: 'Teacher Doe',
                email: 'qwe@gmail.com',
                role: 'teacher',
                userId: '659557157a99873163408d14',
                socketId: '',
            }
        },
        testParentSesh: (state) => {
            state.user = {
                name: 'Papa Doe',
                email: 'qwe@gmail.com',
                role: 'parent',
                userId: '659557157a99873163408d14',
                socketId: '',
            }
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(authInvitationCode.pending, (state) => {
                console.log('loading')
                state.isLoading = true
            })
            .addCase(authInvitationCode.fulfilled, (state, action) => {
                console.log('fulfilled')
                state.error = null
                state.isLoading = false
            })
            .addCase(authInvitationCode.rejected, (state, action) => {
                console.log('rejected')
                console.log(action.error)
                state.error = action?.payload?.message || action.error.message
                state.isLoading = false
            })
    }
})

export const { setUser, setCurrentScreen, setCurrentChatRoom, testTeacherSesh, testParentSesh } = sessionSlice.actions
const sessionReducer = sessionSlice.reducer
export default persistReducer(persistConfig, sessionReducer)