import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    signupForm: null,
    loading: false,
    token : JSON.parse(localStorage.getItem("token")) || null,
}


const authReducer = createSlice ({
    name : "auth",
    initialState: initialState,
    reducers:{
        setToken(state, value){
            state.token = value.payload;
        },
        setLoading(state, value){
            state.loading = value.payload;
        },
        setSignupForm(state, value){
            state.signupForm = value.payload;
        },
    }
})

export const {setToken, setLoading, setSignupForm} = authReducer.actions;
export default authReducer.reducer;