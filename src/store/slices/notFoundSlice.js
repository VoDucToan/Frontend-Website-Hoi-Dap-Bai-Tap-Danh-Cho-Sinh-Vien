import { createSlice } from '@reduxjs/toolkit'

export const notFoundSlice = createSlice({
    name: 'notFound',
    initialState: {
        isNotFound: false,
    },
    reducers: {
        setIsNotFound: (state, action) => {
            state.isNotFound = action.payload;
        },
        resetIsNotFound: (state) => {
            state.isNotFound = false;
        }

    }
})

// Action creators are generated for each case reducer function
export const { setIsNotFound, resetIsNotFound } = notFoundSlice.actions

export default notFoundSlice.reducer