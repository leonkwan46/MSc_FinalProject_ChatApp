import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { getSocketId } from '../../helpers/socketHelpers'
import axios from 'axios'

const initialState = {
    token: null,
    user: {
        userId: '',
        email: '',
        role: '',
        socketId: '',
        name: '',
        DoB: '',
        gender: '',
        
        isRegistered: '',
        isInvited: '',
        isGeneralFormComplete: '',
        isInvitationVerified: '',

    },
    isLoading: false,
    error: null,
}

export const signUpUser = createAsyncThunk(
    'auth/signUpUser',
    async (userData, {rejectWithValue}) => {
        try {
            const response = await axios.post('http://localhost:5000/signup', userData)
            return response.data
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)

export const loginUser = createAsyncThunk(
    'auth/loginUser',
    async (userData, {rejectWithValue}) => {
        try {
            const response = await axios.post('http://localhost:5000/login', userData)
            return response.data
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)

export const updateUser = createAsyncThunk(
    'auth/updateUser',
    async (userData, {rejectWithValue}) => {
        try {
            const response = await axios.post('http://localhost:5000/signup/extra_details', userData)
            return response.data
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)

export const updateTeacherDocuments = createAsyncThunk(
    'auth/updateTeacherDocuments',
    async (teacherData, {rejectWithValue}) => {
        try {
            const response = await axios.post('http://localhost:5000/signup/extra_details/upload', teacherData)
            return response.data
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)

const authSlice = createSlice({
    name: 'auth',
    initialState: {...initialState},
    reducers: {
        clearAuthStates: (state) => {
            state.token = null
            state.user = {
                userId: '',
                email: '',
                role: '',
                socketId: '',
                name: '',
                DoB: '',
                gender: '',
            }
        },
    },
    extraReducers: (builder) => {
        builder
            // SignUp Status
            .addCase(signUpUser.pending, (state) => {
                state.isLoading = true
            })
            .addCase(signUpUser.fulfilled, (state, action) => {
                state.token = action.payload.token
                state.user.role = action.payload.user.role
                state.user.userId = action.payload.user.userId
                state.user.email = action.payload.user.email
                state.user.socketId = getSocketId()
                state.user.isInvited = action.payload.user.isInvited
                state.user.isRegistered = action.payload.user.isRegistered
                state.error = null
                state.isLoading = false
            })
            .addCase(signUpUser.rejected, (state, action) => {
                state.token = ''
                state.user = {
                    userId: '',
                    email: '',
                    role: '',
                    socketId: '',
                    isInvited: '',
                    isRegistered: '',
                    name: '',
                    DoB: '',
                    gender: '',
                    token: '',
                }
                state.error = action?.payload?.message || action.error.message
                state.isLoading = false
            })

            // Login Status
            .addCase(loginUser.pending, (state) => {
                state.isLoading = true
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.token = action.payload.token
                state.user.userId = action.payload.user.userId
                state.user.email = action.payload.user.email
                state.user.role = action.payload.user.role
                state.user.socketId = getSocketId()
                state.user.name = action.payload.user.name
                state.user.DoB = action.payload.user.DoB
                state.user.gender = action.payload.user.gender

                state.user.isInvited = action.payload.user.isInvited
                state.user.isRegistered = action.payload.user.isRegistered
                state.user.isInvitationVerified = action.payload.user.isInvitationVerified
                state.user.isGeneralFormComplete = action.payload.user.isGeneralFormComplete

                state.error = null
                state.isLoading = false
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.token = ''
                state.user = {
                    ...state.user,
                    userId: '',
                    email: '',
                    role: '',
                }
                state.error = action?.payload?.message || action.error.message
                state.isLoading = false
            })

            // Update User Status
            .addCase(updateUser.pending, (state) => {
                state.isLoading = true
            })
            .addCase(updateUser.fulfilled, (state, action) => {
                state.user.name = action.payload.name,
                state.user.DoB = action.payload.DoB,
                state.user.gender = action.payload.gender,
                state.user.isGeneralFormComplete = action.payload.isGeneralFormComplete
                state.isLoading = false
            })
            .addCase(updateUser.rejected, (state, action) => {
                state.user = {
                    ...state.user,
                    name: '',
                    DoB: '',
                    gender: '',
                }
                state.error = action?.payload?.message || action.error.message
                state.isLoading = false
            })

            // Update Teacher Status
            .addCase(updateTeacherDocuments.pending, (state) => {
                state.isLoading = true
            })
            .addCase(updateTeacherDocuments.fulfilled, (state) => {
                state.isLoading = false
            })
            .addCase(updateTeacherDocuments.rejected, (state, action) => {
                state.error = action?.payload?.message || action.error.message
                state.isLoading = false
            })
    }
})

export const { clearAuthStates, testTeacher, testParent } = authSlice.actions
export default authSlice.reducer