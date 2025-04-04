import React, { useEffect, useState } from "react";
import { apiConnector } from "../Services/apiConnector";
import { categories, courseAPI } from "../Services/apis";
import { Link, useLocation } from "react-router-dom";
import CourseSlider from "../components/core/Catalog/CourseSlider";
import Footer from "../components/core/HomePage/Footer"

function CategoryPage(){

    const location = useLocation();
    const categoryId = location.pathname.split("/").at(-1);
    const [categoryCourse, setCategoryCourse] = useState([]);
    const [allCourses, setAllCourses] = useState([]);

    useEffect(()=>{
        const fetchCourse = async()=>
        {
            try
            {
                const apiCall = await apiConnector("POST", categories.CATEGORY_COURSE_API, {categoryId});
                setCategoryCourse(apiCall.data);
                console.log(apiCall)
            }
            catch(error)
            {
                console.log(error);
            }

            try
            {
                const apiCall = await apiConnector("GET", courseAPI.GET_ALL_COURSES_API);
                setAllCourses(apiCall.data.data);
                console.log(apiCall)
            }
            catch(error)
            {
                console.log(error);
            }
        }
        fetchCourse();
    },[categoryId])
    

    return(
        <div className="w-full">
            {
                
                <div className="w-full flex flex-col items-center">

                    {/* TOP SECCTION */}
                    <div className="w-full text-richblack-5 flex flex-col px-5 items-center pt-10 pb-10 bg-richblack-800">
                        <div className="w-11/12 max-w-[1250px] text-richblack-5 flex flex-col px-5 bg-richblack-800">
                            <div className="flex flex-col gap-3">
                                <div className="flex gap-2 text-[14px] text-richblack-300">
                                    <Link to={"/"}>Home</Link>
                                    <p>/</p>
                                    <p>Catalog</p>
                                    <p>/</p>    
                                    <Link to={""} className="text-yellow-50">{categoryCourse?.category?.name}</Link>
                                </div>
                                <div className="text-[30px] font-kamBold">{categoryCourse?.category?.name}</div>
                                <div className="text-richblack-300 max-w-[80%]">
                                    {categoryCourse?.category?.description}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* SECOND SECTION */}
                    <div className="w-11/12 max-w-[1250px] text-richblack-5 flex flex-col px-5 pt-10 pb-10" >
                        <div className="text-[30px]">Courses to get you started</div> 
                        {
                            categoryCourse.length !== 0 ? 
                            (<div className=" gap-5">
                                <CourseSlider courseDetails={categoryCourse.data}/>
                            </div>)
                            :
                            (
                                <div className="text-richblack-5 flex h-[150px] items-center justify-center w-full">
                                No Courses Found..!
                            </div>
                            )
                        }    
                        <div className="text-[30px] mt-20">Other Courses</div>   
                        <div className="gap-5 mb-20">
                            <CourseSlider courseDetails={allCourses}/>
                        </div>                 
                    </div>
                </div>
            }
            <Footer/>
        </div>
    )
}

export default CategoryPage;