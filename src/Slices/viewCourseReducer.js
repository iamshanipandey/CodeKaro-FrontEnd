import { createSlice } from "@reduxjs/toolkit";

const initialState={
    courseSectionData: [],
    courseEntireData: [],
    completedLectures: [],
    totalNumberOfLectures: 0,
}

const viewCourseReducer = createSlice ({
    name: "viewCourse",
    initialState: initialState,
    reducers: {
        setCourseSectionData: (state, action)=>{
            state.courseEntireData = action.payload;
        },
        setCourseEntireData: (state, action)=>{
            state.courseEntireData = action.payload;
        },
        setCompletedLectures: (state, action)=>{
            state.completedLectures = action.payload;
        },
        setTotalNumberOfLectures : (state, action)=>{
            state.completedLectures = action.payload;
        },
    },
})

export const{
    setCourseEntireData, setCourseSectionData, setCompletedLectures, setTotalNumberOfLectures
} = viewCourseReducer.actions;

export default viewCourseReducer.reducer;