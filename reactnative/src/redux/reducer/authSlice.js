import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { getSocketId } from '../../helpers/socketHelpers'
import axios from 'axios'

const initialState = {
    token: null,
    user: {
        userId: '',
        username: '',
        role: '',
        socketId: '',
        name: '',
        DoB: '',
        gender: '',
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

const authSlice = createSlice({
    name: 'auth',
    initialState: {...initialState},
    reducers: {
        clearAuthStates: (state) => {
            state.token = null
            state.user = {
                userId: '',
                username: '',
                role: '',
                socketId: '',
                name: '',
                DoB: '',
                gender: '',
            }
        },
        updateExtraDetails: (state, action) => {

        }
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
                state.user.username = action.payload.user.username
                state.user.socketId = getSocketId()
                state.error = null
                state.isLoading = false
            })
            .addCase(signUpUser.rejected, (state, action) => {
                state.token = null
                state.user = null
                state.error = action?.payload?.message || action.error.message
                state.isLoading = false
            })

            // Login Status
            .addCase(loginUser.pending, (state) => {
                state.isLoading = true
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.token = action.payload.token
                state.user.role = action.payload.user.role
                state.user.userId = action.payload.user.userId
                state.user.username = action.payload.user.username
                state.user.socketId = getSocketId()
                state.isLoading = false
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.token = null
                state.user = {
                    ...state.user,
                    userId: '',
                    username: '',
                    role: '',
                }
                state.error = action?.payload?.message || action.error.message
                state.isLoading = false
            })

            // Update Status
            .addCase(updateUser.pending, (state) => {
                state.isLoading = true
            })
            .addCase(updateUser.fulfilled, (state, action) => {
                state.user.name = action.payload.name,
                state.user.DoB = action.payload.DoB,
                state.user.gender = action.payload.gender,
                state.isLoading = false
            })
            .addCase(updateUser.rejected, (state, action) => {
                state.user = {
                    ...state.user,
                    name: '',
                    DoB: '',
                    gender: '',
                }
                state.isLoading = false
            })
    }
})

export const { login, clearAuthStates, updateExtraDetails } = authSlice.actions
export default authSlice.reducer