import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    step: 1,
    course: null,
    editCourse: false,
    paymentLoading: false,
    courseLoading: false,

}

const courseReducer = createSlice({
    name: "course",
    initialState : initialState,
    reducers:{
        setStep: (state, action)=>{
            state.step = action.payload
        },
        setCourse: (state, action)=>{
            state.course = action.payload;
        },
        setCourseLoading : (state, action)=>{
            state.courseLoading = action.payload;
        },
        setEditCourse : (state, action)=>{
            state.editCourse = action.payload
        },
        setResetCourse : (state)=>{
            state.step = 1;
            state.editCourse = false;
            state.course = null;
        },
    }
})


export const {setStep, setCourse, setCourseLoading, setEditCourse, setResetCourse} = courseReducer.actions;
export default courseReducer.reducer;