import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { getSocketId } from '../../helpers/socketHelpers'
import axios from 'axios'

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

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        token: null,
        user: {
            _id: '',
            username: '',
            role: '',
            socketId: '',
        },
        isLoading: false,
        error: null,
    },
    reducers: {
        logout: (state) => {
            state.token = null
            state.user = {
                _id: '',
                username: '',
                role: '',
            }
        }
    },
    extraReducers: (builder) => {
        builder
            // SignUp Status
            .addCase(signUpUser.pending, (state) => {
                state.isLoading = true
            })
            .addCase(signUpUser.fulfilled, (state, action) => {
                state.error = null
                state.token = action.payload.token
                state.user.role = action.payload.user.role
                state.user._id = action.payload.user._id
                state.user.username = action.payload.user.username
                state.user.socketId = getSocketId()
                state.isLoading = false
            })
            .addCase(signUpUser.rejected, (state, action) => {
                state.token = null
                state.user = {
                    _id: '',
                    username: '',
                    role: '',
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
                state.user.role = action.payload.user.role
                state.user._id = action.payload.user._id
                state.user.username = action.payload.user.username
                state.user.socketId = getSocketId()
                state.isLoading = false
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.token = null
                state.user = {
                    _id: '',
                    username: '',
                    role: '',
                }
                state.error = action?.payload?.message || action.error.message
                state.isLoading = false
            })
    }
})

export const { login, logout } = authSlice.actions
export default authSlice.reducer