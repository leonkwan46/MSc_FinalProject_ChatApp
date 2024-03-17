import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { getSocketId } from "../../helpers/socketHelpers"
import axios from "axios"
import { getUserContacts } from "../selectors"

const initialState = {
    user: {
        userId: '',
        email: '',
        role: '',
        socketId: '',
        token:'',
    },
    contacts: {
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
    status: {
        isLoading: false,
        error: null,
    }
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
            return rejectWithValue(error.response.data)
        }
    }
)

export const createChatRoom = createAsyncThunk(
    'session/createChatRoom',
    async (chatRoomData, {rejectWithValue}) => {
        const { token } = chatRoomData
        try {
            const response = await axios.post('http://localhost:5000/chat_message/create_chat_room', chatRoomData, {
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

export const getChatRooms = createAsyncThunk(
    'session/getChatRoom',
    async (chatRoomData, {rejectWithValue}) => {
        const { token } = chatRoomData
        try {
            const response = await axios.get('http://localhost:5000/chat_message/get_rooms', {
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

export const getContacts = createAsyncThunk(
    'session/getContacts',
    async (contactData, {rejectWithValue}) => {
        const { token } = contactData
        try {
            const response = await axios.get('http://localhost:5000/contacts/get_contacts', {
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

const sessionSlice = createSlice({
    name: 'session',
    initialState: {...initialState},
    reducers: {
        setUser: (state, action) => {
            // Basic Info
            state.user.userId = action.payload.user.userId,
            state.user.email = action.payload.user.email,
            state.user.role = action.payload.user.role,
            state.user.socketId = getSocketId(),
            state.user.token = action.payload.token
            // Contacts
            state.contacts.teachers = action.payload.user.contacts.teachers,
            state.contacts.students = action.payload.user.contacts.students,
            state.contacts.children = action.payload.user.contacts.children,
            state.contacts.parents = action.payload.user.contacts.parents,
            state.contacts.parent = action.payload.user.contacts.parent
        },
        setCurrentChatRoom: (state, action) => {
            state.currentChatRoom.roomId = action.payload._id,
            state.currentChatRoom.name = action.payload.name,
            state.currentChatRoom.members = action.payload.members,
            state.currentChatRoom.messages = action.payload.messages,
            state.currentChatRoom.createdAt = action.payload.createdAt
        },
        clearLoggedInRequestStatus: (state) => {
            state.status.isLoading = false
            state.status.error = null
        }
    },
    extraReducers: (builder) => {
        builder
            // Send Invitation Code
            .addCase(sendInvitationCode.pending, (state) => {
                state.status.isLoading = true
            })
            .addCase(sendInvitationCode.fulfilled, (state, action) => {
                state.status.error = null
                state.status.isLoading = false
            })
            .addCase(sendInvitationCode.rejected, (state, action) => {
                state.status.error = action?.payload?.message || action.error.message
                state.status.isLoading = false
            })

            // Create Student Account
            .addCase(createStudentAccount.pending, (state) => {
                state.status.isLoading = true
            })
            .addCase(createStudentAccount.fulfilled, (state, action) => {
                state.status.error = null
                state.status.isLoading = false
            })
            .addCase(createStudentAccount.rejected, (state, action) => {
                state.status.error = action?.payload?.message || action.error.message
                state.status.isLoading = false
            })

            // Create Chat Room
            .addCase(createChatRoom.pending, (state) => {
                state.status.isLoading = true
            })
            .addCase(createChatRoom.fulfilled, (state, action) => {
                
                state.status.error = null
                state.status.isLoading = false
            })
            .addCase(createChatRoom.rejected, (state, action) => {
                state.status.error = action?.payload?.message || action.error.message
                state.status.isLoading = false
            })

            // Get Chat Rooms
            .addCase(getChatRooms.pending, (state) => {
                state.status.isLoading = true
            })
            .addCase(getChatRooms.fulfilled, (state, action) => {
                state.status.error = null
                state.status.isLoading = false
            })
            .addCase(getChatRooms.rejected, (state, action) => {
                state.status.error = action?.payload?.message || action.error.message
                state.status.isLoading = false
            })
    }
})

export const {
    setUser,
    setCurrentChatRoom,
    clearLoggedInRequestStatus
} = sessionSlice.actions

const sessionReducer = sessionSlice.reducer
export default sessionReducer