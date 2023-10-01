import { createSlice } from '@reduxjs/toolkit'

const signUpInfoSlice = createSlice({
    name: 'signUpInfo',
    initialState: {
        isTecherOverlayOpen: false,
        isStatusOverlayOpen: false,
        role: 'parent'
    },
    reducers: {
        collectUserRole: (state, action) => {
            state.userData.role = action.payload.role
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

export const { collectUserRole, openTeacherOverlay, closeTeacherOverlay, openStatusOverlay, closeStatusOverlay } = signUpInfoSlice.actions
export default signUpInfoSlice.reducer