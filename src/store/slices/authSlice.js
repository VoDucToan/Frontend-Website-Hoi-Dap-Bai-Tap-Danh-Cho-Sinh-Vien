import { createSlice } from '@reduxjs/toolkit'

export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        isAuthenticated: false,
        user: {
            id: null,
            email: "",
            name: "",
            avatar: "",
            reputation: 1,
            role: 1,
        },
        accessToken: "",
        expiresAt: null,
        status: "pending",
    },
    reducers: {
        setAuth: (state, action) => {
            state.isAuthenticated = true;
            state.user = action.payload.user;
            state.accessToken = action.payload.accessToken;
            state.expiresAt = action.payload.expiresAt;
            state.status = "succeeded";
        },
        setProfile: (state, action) => {
            state.user.name = action.payload.name;
            state.user.avatar = action.payload.avatar;
        },
        resetAuth: (state) => {
            state.isAuthenticated = false;
            state.user = {
                id: null,
                email: "",
                name: "",
                avatar: "",
                reputation: 1,
                role: 1,
            };
            state.accessToken = "";
            state.expiresAt = null;
            state.status = "idle";
        }

    }
})

// Action creators are generated for each case reducer function
export const { setAuth, resetAuth, setProfile } = authSlice.actions

export default authSlice.reducer