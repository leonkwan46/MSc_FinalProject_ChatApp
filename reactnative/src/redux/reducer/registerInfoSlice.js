import { createSlice } from '@reduxjs/toolkit'

const intitialState = {
    isTecherOverlayOpen: false,
    isStatusOverlayOpen: false,
    role: 'parent',
}

const registerInfoSlice = createSlice({
    name: 'registerInfo',
    initialState: {...intitialState},
    reducers: {
        collectUserRole: (state, action) => {
            state.role = action.payload.role
        },
        openTeacherOverlay: (state) => {
            state.isTecherOverlayOpen = true
        },
        closeTeacherOverlay: (state) => {
            state.isTecherOverlayOpen = false
        },
        openStatusOverlay: (state) => {
            state.isStatusOverlayOpen = true
        },
        closeStatusOverlay: (state) => {
            state.isStatusOverlayOpen = false
        },
    }
})

export const {
    collectUserRole,
    openTeacherOverlay,
    closeTeacherOverlay,
    openStatusOverlay,
    closeStatusOverlay,
} = registerInfoSlice.actions
export default registerInfoSlice.reducer