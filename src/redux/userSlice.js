import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: "user",
    initialState: {
        userData : null,
        returnTo: null
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
        }
    }
})

export const {setUserData, setReturnTo, clearReturnTo} = userSlice.actions

export default userSlice.reducer