import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { buyCourse } from "../Services/Operations/StudentFeaturesAPI";
import { apiConnector } from "../Services/apiConnector";
import { courseAPI } from "../Services/apis";
import { FaClock } from "react-icons/fa";
import { MdDevicesOther } from "react-icons/md";
import { GiArrowCursor } from "react-icons/gi";
import { PiCertificateFill } from "react-icons/pi";
import { FaLaptopCode } from "react-icons/fa6";
import { IoIosArrowDown } from "react-icons/io";
import Footer from "../components/core/HomePage/Footer";
import toast from "react-hot-toast";
import { formatDate } from "../Utils/dateFormate";




function CoursePage(){

    const {token} = useSelector((state)=>state.auth);
    const {user} = useSelector((state)=>state.profile);
    const [courseDetails , setCourseDetails] = useState();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {courseId} = useParams();

    useEffect(()=>{
        const formData = new FormData();
        const apiCall = async()=>{
            const response = await apiConnector("POST", courseAPI.GET_COURSE_DETAILS, {courseId} );
            if(!response)
            {
                throw new Error(response);
            }
            setCourseDetails(response.data.courseDetails[0]);
            console.log(response.data.courseDetails[0])
        }
        apiCall();
    },[token, courseId])

    const handleBuyCourse = () =>{
        if(token){
            buyCourse(token, [courseId], user, navigate, dispatch);
            return;
        }
        else
        {
            toast.error("You are not logged in")
        }
    }


    return(
        <div className="w-full items-center flex flex-col">
            <div className="w-full bg-richblack-800 flex flex-col items-center">
                <div className="w-11/12 max-w-[1250px] relative flex flex-wrap justify-between mt-8 gap-10 pb-5 ">
                    <div className="max-w-[calc(100%-450px)] min-w-[340px]">
                        <div className="flex gap-2 text-richblack-5 text-[14px]">
                        <p>Home</p>
                        <p>/</p>
                        <p>Learning</p>
                        <p>/</p>
                        <p className="text-yellow-50">{courseDetails?.category?.name}</p>
                        </div>
                        <div className="text-richblack-5 text-[30px] ">
                        <p>{courseDetails?.courseName}</p>
                        </div>
                        <div className="text-richblack-300 text-[14px] flex flex-col gap-3">
                        <p>{courseDetails?.courseDescription}</p>
                        <p className="text-richblack-50 text-[16px]">Created by <span className="font-kamBold">{courseDetails?.instructor?.firstName} {courseDetails?.instructor?.lastName}</span></p>
                        <p className="text-richblack-50 text-[16px]">Created at {formatDate(courseDetails?.createdAt)}</p>
                        </div>
                    </div>
                    <div className="w-[380px] rounded-lg text-richblack-5 bg-richblack-700 pb-5 
                    md:absolute md:right-0 md:top-0">
                        <img src={courseDetails?.thumbnail} alt="thumbnail-img" width="380px" className="rounded-t-lg" />
                        <div className="w-full px-5 flex flex-col gap-3">
                            <p className="mt-5 text-[28px] text-richblack-5 font-kamBold">Rs. {courseDetails?.price}</p>
                            {
                                user?.accountType !== "Student" ? ( <p className="text-center text-[#06D6A0]">Only Students are allowed to buy a course</p>):
                                (
                                courseDetails?.studentsEnrolled?.includes(user?._id)? 
                                (<div className="w-full flex flex-col gap-3">
                                    <p className="text-center text-[#06D6A0]">Already Enrolled</p>
                                    <button className="w-full py-[8px] rounded-lg font-kamBold outline-none text-richblack-900 bg-yellow-50 border-b border-b-richblack-5" >Start Learning</button>
                                </div>)
                                :
                                (<div className="w-full  flex flex-col gap-3">
                                    <button className="w-full py-[8px] rounded-lg font-kamBold outline-none text-richblack-900 bg-yellow-50 border-b border-b-richblack-5" >Add To Cart</button>
                                    <button className="w-full py-[8px] rounded-lg font-kamBold outline-none text-richblack-5 bg-richblack-900 border-b border-b-richblack-300" onClick={handleBuyCourse}>Buy Now</button>
                                </div>)
                                )
                            }
                            <p className="text-center text-richblack-50 text-[14px]">30-Day Money-Back Guarantee*</p>
                            <div className="text-[14px] flex flex-col gap-2 mt-5">
                                <p>This course includes:</p>
                                <p className="text-[#06D6A0] flex gap-1 items-center"><FaClock/><span>8 hours on-demand video</span></p>
                                <p className="text-[#06D6A0] flex gap-1 items-center"><GiArrowCursor/><span>Full Lifetime access</span></p>
                                <p className="text-[#06D6A0] flex gap-1 items-center"><MdDevicesOther/><span>Access on Mobile and TV</span></p>
                                <p className="text-[#06D6A0] flex gap-1 items-center"><PiCertificateFill/><span>Certificate of completion</span></p>
                            </div>
                            <div className="text-center text-yellow-50 text-[16px] mt-3 cursor-pointer">Share</div>
                        </div>
                        
                        
                    </div>                    
                </div>                
            </div>

            {/* Section 2 */}

            <div className="w-full items-center flex flex-col">
                <div className="max-w-[1250px] w-11/12 flex flex-col py-14 ">
                    <div className="min-w-[350px] max-w-[calc(1250px-420px)] text-richblack-5 flex flex-col border border-richblue-800 py-5 px-5 rounded-lg ">
                        <h1 className="text-richblack-5 text-[28px]">What you'll learn</h1>
                        {
                            courseDetails?.whatYouWillLearn?.split(".").map((learn, index)=>(
                                <p className="leading-[30px] text-richblack-100 text-[14px]" key={index}>{learn}</p>
                            ))
                        }
                    </div>

                    {/* Course Content */}


                    <div className="max-w-[calc(1250px-420px)] min-w-[350px] mt-24 text-richblack-5">
                        <p className="text-richblack-5 text-[24px] ml-1">Course content</p>
                        <div className=" rounded-md outline-none mt-2 border border-richblack-700">
                            {
                                courseDetails?.courseContent?.map((section)=>(
                                    <div className="" key={section._id}>
                                            <details open>
                                                {
                                                    section?.subSection?.map((sub)=>(
                                                        <div key={sub._id} className="ml-6 my-2">
                                                            <details open>
                                                                <p className="text-richblack-300 leading-5 ml-6 px-5">{sub.description}</p>
                                                                <summary className="flex gap-2">
                                                                    <div className="flex justify-between w-full px-5 py-2">
                                                                        <p className="flex gap-2 items-center"><FaLaptopCode/> <span>{sub.title}</span><IoIosArrowDown/></p>
                                                                        <p className="text-yellow-50">{section?.subSection?.length} lectures </p>
                                                                    </div>
                                                                </summary>
                                                            </details>
                                                        </div>
                                                    ))
                                                }
                                                <summary className="flex gap-2 items-center border-b-2 border-richblack-800 px-5 py-2 bg-richblack-700">
                                                   <IoIosArrowDown/> <span>{section.sectionName}</span>
                                                </summary>
                                            </details>                                       
                                    </div>
                                ))
                            }
                        </div>
                        
                    </div>

                    {/* Author */}

                    <div className="mt-16 max-w-[calc(1250px-420px)] min-w-[350px] ">
                        <p className="text-richblack-5 text-[24px]">Author</p>
                        <div className="text-richblack-5 flex gap-2 items-center mt-3">
                            <img src={courseDetails?.instructor?.profilePicture} className="rounded-full w-12" alt="profile-picture" />
                            <p>{courseDetails?.instructor?.firstName + courseDetails?.instructor?.lastName}</p>
                        </div>
                        <p className="text-richblack-100 mt-2 ml-2">{courseDetails?.instructor?.additionalDetails?.about}</p>
                    </div>
                </div>
            </div>
            <Footer/>
        </div>
    )
}

export default CoursePage;