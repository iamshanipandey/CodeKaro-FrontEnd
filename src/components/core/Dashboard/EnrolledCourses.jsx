import React, { useEffect, useState } from "react"
import { useSelector } from "react-redux";
import { apiConnector } from "../../../Services/apiConnector";
import { courseAPI } from "../../../Services/apis";
import ProgressBar from "@ramonak/react-progress-bar";
import { HiDotsVertical } from "react-icons/hi";


function EnrolledCourses(){
    const {token} = useSelector((state)=>state.auth);
    const [courses, setCourses] = useState();
    const {user} = useSelector((state)=>state.profile);
    const [completedVideos, setCompletedVideos] = useState();


    const getEnrolledCourses = async()=>{
        const response = await apiConnector("POST", courseAPI.GET_ENROLLED_COURSES, {token})
        if(!response)
        {
            throw new Error(response)
        }
        setCourses(response.data.enrolledCourses);
    }


    useEffect(()=>{
        getEnrolledCourses();

    },[])

    console.log(user)

    return(
        <div className="w-full flex flex-col items-center">
            <div className="w-11/12 text-richblack-5 py-8" >
                <p className="text-[32px] font-kamBold">Enrolled Courses</p>
                <div className="border border-richblack-700 mt-10">

                    {/* Table Bar */}
                    <div className="flex justify-between items-start py-[10px] text-richblack-50 bg-richblack-700 px-3 text-[14px]">
                        <p className="">Courses</p>
                        <div className="flex w-[50%] after-50">
                            <p className="w-[50%]">Durations</p>
                            <p>Progress</p>
                        </div>
                    </div>

                    {/* Table Content */}
                    {
                        courses?.map((course)=>(
                            <div className="flex items-center px-3 cursor-pointer justify-between" key={course._id}>
                                <div className=" py-3 flex gap-5">
                                    <img src={course.thumbnail} alt="Thumbnail-img" width="45px" height="45px" className="rounded-lg object-cover max-h-[50px] " />
                                    <div>
                                        <p className="text-richblack-50 text-[16px]">{course.courseName.slice(0,30)}..</p>
                                        <p className="text-[14px] text-richblack-300">{course.courseDescription.slice(0,30)}..</p>
                                    </div>
                                </div>
                                <div className="flex w-[50%] justify-between px-3 after-50">
                                    <div className="w-[50%] "> 
                                        <p className="py-3 text-richblack-50">2h 23min</p>
                                    </div>

                                    <div className="w-[50%] flex items-center">
                                      {
                                        (() => {
                                          const progress = user?.courseProgress?.find(
                                            (item) => item.courseId === course._id);
                                            
                                          const completedCount = progress?.completedVideos?.length || 0;
                                          const totalLectures = course?.courseContent?.reduce(
                                            (acc, section) => acc + (section?.subSection?.length || 0), 0
                                          );
                                      
                                          return (
                                            <ProgressBar
                                              completed={(completedCount/totalLectures)*100 || 0}
                                              maxCompleted={100}
                                              className="w-[300px] min-w-[130px]"
                                            />
                                          );
                                        })()
                                      }
                                    </div>
                                    
                                </div>
                            </div>
                        ))
                    }
                </div>

            </div>
        </div>
    )
}

export default EnrolledCourses;