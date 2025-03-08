import { createSlice } from '@reduxjs/toolkit'

export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        isAuthenticated: false,
        user: {
            id: null,
            email: "",
            name: ""
        }
    },
    reducers: {
        setAuth: (state, action) => {
            state.isAuthenticated = true;
            state.user = action.payload;
        },
        resetAuth: (state) => {
            state.isAuthenticated = false;
            state.user = {
                id: null,
                email: "",
                name: ""
            }
        }

    }
})

// Action creators are generated for each case reducer function
export const { setAuth, resetAuth } = authSlice.actions

export default authSlice.reducer