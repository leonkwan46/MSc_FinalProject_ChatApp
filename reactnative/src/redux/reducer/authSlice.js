import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
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
        isLoading: false,
        user: {},
        token: null,
        error: null,
    },
    reducers: {
        login: (state, action) => {
            state.user = action.payload.user
            state.token = action.payload.token
        },
        logout: (state) => {
            state.user = {}
            state.token = null
        }
    },
    extraReducers: (builder) => {
        builder
            // SignUp Status
            .addCase(signUpUser.pending, (state) => {
                state.isLoading = true
            })
            .addCase(signUpUser.fulfilled, (state, action) => {
                state.isLoading = false
                state.user = action.payload.user
                state.token = action.payload.token
            })
            .addCase(signUpUser.rejected, (state, action) => {
                state.isLoading = false
                state.error = action.payload.message
            })

            // Login Status
            .addCase(loginUser.pending, (state) => {
                state.isLoading = true
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.isLoading = false
                state.user = action.payload.user
                state.token = action.payload.token
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.isLoading = false
                state.error = action.payload.message
            })
    }
})

export const { login, logout } = authSlice.actions
export default authSlice.reducer