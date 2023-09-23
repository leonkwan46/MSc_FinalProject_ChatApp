import { createSlice } from '@reduxjs/toolkit'

const overlaySlice = createSlice({
    name: 'overlay',
    initialState: {
        isOverlayOpen: false,
    },
    reducers: {
        openOverlay: (state) => {
            state.isOverlayOpen = true
        },
        closeOverlay: (state) => {
            state.isOverlayOpen = false
        }
    }
})

export const { openOverlay, closeOverlay } = overlaySlice.actions
export default overlaySlice.reducer