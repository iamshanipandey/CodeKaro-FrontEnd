import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RiSearchEyeLine } from "react-icons/ri";
import { formatDate } from "../../../Utils/dateFormate";

function RecentPurchase(){

    const {recentPurchase} = useSelector((state)=>state.cart);
    let navigate = useNavigate();


    return(
        <div className="w-full">
            <div className="w-full items-center flex flex-col">
                        <div className="px-10 py-10 w-full  ">
                            <p className="text-[36px] text-richblack-5 font-kamBold">Last Purchase</p>
                            {
                                !recentPurchase?.length ? (<p className="text-center text-richblack-5">No Recent Purchase Found.</p>):
                            (
                                <div className="flex flex-col items-center"> 
                                <div className="w-[100%] mt-10 gap-20 flex flex-wrap items-center justify-center relative">
                                    <div className="min-w-[350px] w-full flex items-center flex-col">
                                        {
                                            recentPurchase?.map((course)=>(
                                                <div className="flex flex-wrap py-5  items-center justify-center gap-5 " key={course?.updatedCourse?._id}>
                                                    <img src={course?.updatedCourse?.thumbnail} className="rounded-lg" alt="thumbnail-img" width="300px" height="100px" />
                                                    <div className="text-richblack-5">
                                                        <p>{course?.updatedCourse?.courseName?.slice(0,40)}</p>
                                                        <p className="text-richblack-300 max-w-[20rem] my-2">{course?.updatedCourse?.courseDescription?.slice(0,40)}..</p>
                                                        <p className="text-richblack-300">Created At : {formatDate(course?.updatedCourse?.createdAt)}</p>
                                                    </div>
                                                    <div className="flex flex-col gap-3 items-center"> 
                                                        <p className="text-yellow-50 text-[24px]">Rs. {course?.updatedCourse?.price}</p>
                                                        <div onClick={()=>navigate(`/courses/${course?.updatedCourse._id}`)} 
                                                            className="flex cursor-pointer gap-1 text-richblack-5 bg-richblack-800 py-2 px-3 rounded-lg items-center font-kamBold border-richblack-700 border"><RiSearchEyeLine className="text-[20px]"/><span>View Course</span></div>
                                                    </div>
                                                </div>
                                            ))
                                        }
                                    </div>
                                </div>
                                </div>
                            )
                            }
                        </div>
            </div>
        </div>
    )
}

export default RecentPurchase;