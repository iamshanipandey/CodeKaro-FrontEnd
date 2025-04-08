import { createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

const initialState ={
    totalItems : localStorage.getItem("totalItems") ? JSON.parse(localStorage.getItem("totalItems")): 0,
    cart : localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")) : [],
    totalBill : localStorage.getItem("totalBill") ? JSON.parse(localStorage.getItem("totalBill")) : 0,
    recentPurchase : localStorage.getItem("recentPurchase") ? JSON.parse(localStorage.getItem("recentPurchase")) : null,
}

const cartReducer = createSlice({
    name: "cart",
    initialState: initialState,
    reducers:{
        addToCart(state, action){
            const course = action.payload;

            if(!state.cart) {
                state.cart = [];
            }
        
            const alreadyExists = state?.cart?.some(item => item._id === course._id);
            if (alreadyExists) {
                toast.error("Item Already added to cart");
                return;
             }
    
            state.cart = [...state.cart, course];
            state.totalItems ++ ;
            state.totalBill += course.price;

            // update localStorage

            localStorage.setItem("cart", JSON.stringify(state.cart))
            localStorage.setItem("totalItems", JSON.stringify(state.totalItems))
            localStorage.setItem("totalBill", JSON.stringify(state.totalBill))
            
            toast.success("Added to cart")
        },
        removeFromCart(state, action){
            const course = action.payload;
            const newCart = state.cart.filter((item)=> course._id !== item._id);
            state.cart = newCart;
            state.totalItems -- ;
            state.totalBill -= course.price;

            localStorage.setItem("cart", JSON.stringify(state.cart))
            localStorage.setItem("totalItems", JSON.stringify(state.totalItems))
            localStorage.setItem("totalBill", JSON.stringify(state.totalBill))

            toast.success("Removed item");
            
        },
        resetCart(state, action){
            state.cart = action.payload;
        },
        resetTotalBill(state, action){
            state.totalBill = action.payload;
        },
        resetTotalItems(state, action){
            state.totalItems = action.payload;
        },
        setRecentPurchase(state, action)
        {
            state.recentPurchase = action.payload;
        }
    }
})

export const {addToCart, removeFromCart, resetCart, resetTotalBill, resetTotalItems, setRecentPurchase} = cartReducer.actions;
export default cartReducer.reducer;