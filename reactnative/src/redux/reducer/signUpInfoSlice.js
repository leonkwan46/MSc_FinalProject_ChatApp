import { createSlice } from '@reduxjs/toolkit'


const intitialState = {
    isTecherOverlayOpen: false,
    isStatusOverlayOpen: false,
    role: 'parent',
    isGeneralFormComplete: false,
}

const signUpInfoSlice = createSlice({
    name: 'signUpInfo',
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
        updateGeneralFormState: (state, action) => {
            state.isGeneralFormComplete = action.payload
        }
    }
})

export const {
    collectUserRole,
    openTeacherOverlay,
    closeTeacherOverlay,
    openStatusOverlay,
    closeStatusOverlay,
    updateGeneralFormState
} = signUpInfoSlice.actions
export default signUpInfoSlice.reducer