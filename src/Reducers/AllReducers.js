import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "../Slices/authReducer";
import profileReducer from "../Slices/profileReducer";
import cartReducer from "../Slices/cartReducer";
import courseReducer from "../Slices/courseReducer";

const rootReducer = combineReducers({
    auth: authReducer,
    profile: profileReducer,
    cart : cartReducer,
    course: courseReducer,
})

export default rootReducer;