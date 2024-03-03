import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { getSocketId } from "../../helpers/socketHelpers"
import axios from "axios"

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
                    'authorization': `Bearer ${token}`
                }
            })
            return response.data
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)

export const sendInvitationCode = createAsyncThunk(
    'session/sendInvitationCode',
    async (codeData, {rejectWithValue}) => {
        const { email, token } = codeData
        try {
            const response = await axios.post('http://localhost:5000/contacts', { email }, {
                headers: {
                    'authorization': `Bearer ${token}`
                }
            })
            return response.data
        } catch (error) {
            console.log('error', error)
            return rejectWithValue(error.response.data)
        }
    }
)

const sessionSlice = createSlice({
    name: 'session',
    initialState: {...initialState},
    reducers: {
        setUser: (state, action) => {
            state.user.userId = action.payload.user._id,
            state.user.email = action.payload.user.email,
            state.user.role = action.payload.user.role,
            state.user.isInvited = action.payload.user.isInvited,
            state.user.socketId = getSocketId(),
            state.user.token = action.payload.token
        },
        setCurrentChatRoom: (state, action) => {
            state.currentChatRoom.roomId = action.payload._id,
            state.currentChatRoom.name = action.payload.name,
            state.currentChatRoom.members = action.payload.members,
            state.currentChatRoom.messages = action.payload.messages,
            state.currentChatRoom.createdAt = action.payload.createdAt
        },
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

            .addCase(sendInvitationCode.pending, (state) => {
                console.log('loading')
                state.isLoading = true
            })
            .addCase(sendInvitationCode.fulfilled, (state, action) => {
                console.log('fulfilled')
                state.error = null
                state.isLoading = false
            })
            .addCase(sendInvitationCode.rejected, (state, action) => {
                console.log('rejected')
                console.log(action.error)
                state.error = action?.payload?.message || action.error.message
                state.isLoading = false
            })
    }
})

export const { setUser, setCurrentChatRoom, testTeacherSesh, testParentSesh } = sessionSlice.actions
const sessionReducer = sessionSlice.reducer
export default sessionReducer