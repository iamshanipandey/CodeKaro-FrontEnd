import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "../Reducers/AllReducers";

const Store = configureStore({
    reducer : rootReducer,
})

export default Store;