import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { courseAPI } from "../../../Services/apis";
import { apiConnector } from "../../../Services/apiConnector";
import { MdAdd } from "react-icons/md";
import CourseList from "./CourseList";
import { useNavigate } from "react-router-dom";
import { setCourse, setEditCourse } from "../../../Slices/courseReducer";
import { setToken } from "../../../Slices/authReducer";
import { setProfile } from "../../../Slices/profileReducer";
import { logoutAPI } from "../../../Services/Operations/authApi";

function MyCourses(){

    const [courses, setCourses] = useState([])
    const {token} = useSelector((state)=>state.auth);
    let navigate = useNavigate();
    let dispatch = useDispatch();

    useEffect(()=>{
        const fetchCourses = async() =>{
            try
            {
                const response = await apiConnector("POST" , courseAPI.GET_INSTRUCTOR_COURSE_API, {token});
                if(!response)
                {
                    throw new Error(response);
                }
                console.log(response.data.data);
                setCourses(response.data.data);
            }
            catch(error)
            {
                if(error.response.data.message === "Invalid Token")
                    {
                        setToken(null);
                        setProfile(null);
                        localStorage.clear();
                        dispatch(logoutAPI(navigate));
                    }
                if(error.response.data.message === "Token not found")
                    {
                        setToken(null);
                        setProfile(null);
                        localStorage.clear();
                        dispatch(logoutAPI(navigate));
                    }
            }
        }
        fetchCourses();
    },[token]);

    return(
        <div className="text-richblack-5 w-full border-richblack-5 flex flex-col">
            <div className="flex justify-between mt-10 px-10 flex-wrap gap-3">
                <h1 className="text-start text-[30px] font-kamBold ">
                    My Courses
                </h1>
                <div onClick={()=>{dispatch(setEditCourse(false));
                                 dispatch(setCourse(null)); 
                                navigate("/dashboard/add-course")}} 
                     className="cursor-pointer px-5 py-2 bg-yellow-50 rounded-lg flex gap-1 items-center
                     text-richblue-900 font-kamBold text-[16px]"
                     >
                    <p>Add Course</p>
                    <MdAdd/>
                </div>
            </div>
            
            <div className="text-richblack-5 w-full mt-14 flex flex-col items-center">
                <div className="w-11/12 max-w-[1250px] border-2 rounded-xl py-5 border-richblack-800 flex flex-col gap-5">
                    <div className="flex justify-between px-5">
                        <p>COURSES</p>
                        <div className="flex gap-10">
                            <p>DURATION</p>
                            <p>PRICE</p>
                            <p>ACTIONS</p>
                        </div>
                    </div>
                    <div className="w-full border-t-2 px-5 border-richblack-800">
                        {   
                            courses.map((course)=>(
                                <CourseList key={course._id} course={course}/>
                            ))
                            
                        }
                    </div>
                </div>
                
            </div>
            
        </div>
    )
}

export default MyCourses;










































// import React, { useEffect, useState } from "react";
// import { useSelector } from "react-redux";
// import { courseAPI } from "../../../Services/apis";
// import { apiConnector } from "../../../Services/apiConnector";
// import { MdAdd } from "react-icons/md";
// import CourseList from "./CourseList";
// import { useNavigate } from "react-router-dom";

// function MyCourses(){

//     const [courses, setCourses] = useState([])
//     const {token} = useSelector((state)=>state.auth);
//     let navigate = useNavigate();

//     useEffect(()=>{
//         const fetchCourses = async() =>{
//             try
//             {
//                 const response = await apiConnector("POST" , courseAPI.GET_INSTRUCTOR_COURSE_API, {token});
//                 if(!response)
//                 {
//                     throw new Error(response);
//                 }
//                 console.log(response.data.data);
//                 setCourses(response.data.data);
//             }
//             catch(error)
//             {
//                 console.log(error);
//             }
//         }
//         fetchCourses();
//     },[token]);

//     return(
//         <div className="text-richblack-5 w-full border-richblack-5 flex flex-col">
//             <div className="flex justify-between mt-10 px-10 flex-wrap gap-3">
//                 <h1 className="text-start text-[30px] font-kamBold ">
//                     My Courses
//                 </h1>
//                 <div onClick={()=>navigate("/dashboard/add-course")} className="cursor-pointer px-5 py-2 bg-yellow-50 rounded-lg flex gap-1 items-center text-richblue-900 font-kamBold text-[16px]">
//                     <p>Add Course</p>
//                     <MdAdd/>
//                 </div>
//             </div>
            
//             <div className="text-richblack-5 w-full mt-14 flex flex-col items-center">
//                 <div className="w-11/12 max-w-[1250px] border-2 rounded-xl py-5 border-richblack-800 flex flex-col gap-5">
//                         {
//                             <CourseList courses={courses}/>
//                         }
//                 </div>
                
//             </div>
            
//         </div>
//     )
// }

// export default MyCourses;