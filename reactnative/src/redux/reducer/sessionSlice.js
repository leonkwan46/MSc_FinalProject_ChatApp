import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { getSocketId } from "../../helpers/socketHelpers"
import axios from "axios"

const initialState = {
    user: {
        userId: '',
        email: '',
        role: '',
        socketId: '',
        token:'',
        teachers: [],
        students: [],
        children: [],
        parents: [],
        parent: '',
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

export const sendInvitationCode = createAsyncThunk(
    'session/sendInvitationCode',
    async (codeData, {rejectWithValue}) => {
        const { email, token } = codeData
        try {
            const response = await axios.post('http://localhost:5000/contacts/send_invitation', { email }, {
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

export const createStudentAccount = createAsyncThunk(
    'session/createStudentAccount',
    async (studentData, {rejectWithValue}) => {
        const { parentToken } = studentData
        try {
            const response = await axios.post('http://localhost:5000/contacts/create_student_account', studentData, {
                headers: {
                    'authorization': `Bearer ${parentToken}`
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
            state.user.userId = action.payload.user.userId,
            state.user.email = action.payload.user.email,
            state.user.role = action.payload.user.role,
            state.user.socketId = getSocketId(),
            state.user.token = action.payload.token
            state.user.teachers = action.payload.user.teachers,
            state.user.students = action.payload.user.students,
            state.user.children = action.payload.user.children,
            state.user.parents = action.payload.user.parents,
            state.user.parent = action.payload.user.parent
        },
        setCurrentChatRoom: (state, action) => {
            state.currentChatRoom.roomId = action.payload.userId,
            state.currentChatRoom.name = action.payload.name,
            state.currentChatRoom.members = action.payload.members,
            state.currentChatRoom.messages = action.payload.messages,
            state.currentChatRoom.createdAt = action.payload.createdAt
        },
    },
    extraReducers: (builder) => {
        builder
            // Send Invitation Code
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

            // Create Student Account
            .addCase(createStudentAccount.pending, (state) => {
                console.log('loading')
                state.isLoading = true
            })
            .addCase(createStudentAccount.fulfilled, (state, action) => {
                console.log('fulfilled')
                state.error = null
                state.isLoading = false
            })
            .addCase(createStudentAccount.rejected, (state, action) => {
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