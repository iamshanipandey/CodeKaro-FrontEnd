import { createSlice } from "@reduxjs/toolkit";

const initialState ={
    totalItems : localStorage.getItem("totalItems") ? JSON.parse(localStorage.getItem("totalItems")): 0,
}

const cartReducer = createSlice({
    name: "cart",
    initialState: initialState,
    reducers:{
        setCart(state, value){
            state.token = value.payload
        }
    }
})

export const {setCart} = cartReducer.actions;
export default cartReducer.reducer;