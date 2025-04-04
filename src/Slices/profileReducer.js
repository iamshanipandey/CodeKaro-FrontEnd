import {createSlice } from "@reduxjs/toolkit";

const inititalState ={
    loading: false,
    profilePicture: null,
    user: JSON.parse(localStorage.getItem("user")) || null,
}

const profileReducer = createSlice({
    name: "profile",
    initialState: inititalState,
    reducers:{
        setProfile(state, value){
            state.user = value.payload
        },
        setProfileLoading(state, value){
            state.loading = value.payload;
        },
        setProfilePicture(state, value){
            state.profilePicture = value.payload
        }
    }
})

export const {setProfile, setProfileLoading, setProfilePicture} = profileReducer.actions;
export default profileReducer.reducer;