import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: "user",
    initialState: {
        userData : null,
        returnTo: null,
        isAuthLoading: true,
        sessionExpired: false
    },
    reducers: {
        setUserData: (state, action) => {
            state.userData = action.payload
        },
        setReturnTo: (state, action) => {
            state.returnTo = action.payload
        },
        clearReturnTo: (state) => {
            state.returnTo = null
        },
        setAuthLoading: (state, action) => {
            state.isAuthLoading = action.payload
        },
        setSessionExpired: (state, action) => {
            state.sessionExpired = action.payload
        }
    }
})

export const {setUserData, setReturnTo, clearReturnTo, setAuthLoading, setSessionExpired} = userSlice.actions

export default userSlice.reducer