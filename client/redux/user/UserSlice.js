import { createSlice } from "@reduxjs/toolkit";
import { deleteUser } from "firebase/auth";

const initialState = {
    currentUser: null,
    error: null,
    loading: false,
    };


    const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        signInStart: (state) => {
        state.loading= true
        },
        signInSuccess: (state, action) => {
        state.currentUser = action.payload;
        state.loading = false;
        state.error = null;
        },
        signInFailure: (state, action) => {
        state.error = action.payload;
        state.loading = false;
        },
        userUpdateStart: (state) => {
        state.loading = true;
        },
        userUpdateSuccess: (state, action) => {
        state.currentUser = action.payload;
        state.loading = false;
        state.error = null;
        },
        userUpdateFailure: (state, action) => {
        state.error = action.payload;
        state.loading = false;
        },
        deleteUserStart: (state) => {
        state.loading = true;
        },
        deleteUserSuccess: (state, action) => {
        state.currentUser = null;
        state.loading = false;
        state.error = null;
        },
        deleteUserFailure: (state, action) => {
        state.error = action.payload;
        state.loading = false;
        },

        SignOutUserStart: (state) => {
            state.loading = true;
            },
            SignOutUserSuccess: (state, action) => {
            state.currentUser = null;
            state.loading = false;
            state.error = null;
            },
            SignOutUserFailure: (state, action) => {
            state.error = action.payload;
            state.loading = false;
            }


    },
    });


    export const { signInStart, signInSuccess, signInFailure , userUpdateStart , userUpdateSuccess ,userUpdateFailure , deleteUserStart,deleteUserSuccess,deleteUserFailure,SignOutUserStart,SignOutUserFailure,SignOutUserSuccess } = userSlice.actions;
    export default userSlice.reducer;