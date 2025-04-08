import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import IconBtn from "../Common/IconBtn";
import { BiEdit } from "react-icons/bi";


function MyProfile(){
   
    const {user, loading:profileLoading} = useSelector((state)=>state.profile);
    let nevigate = useNavigate();


    return(
        <div className="text-richblack-5 w-full border-richblack-5 flex flex-col">
            <h1 className="text-start mt-10 ml-10 text-[30px] font-kamBold ">
                My Profile
            </h1>

            <div className="text-richblack-5 w-full border-richblack-5 flex flex-col items-center">
                <div className="w-11/12 max-w-[1250px] flex flex-col items-center md:px-5 gap-5 ">
                    
                    {/* Section 1 */}

                    <div className="w-full mt-16 bg-richblack-800 flex flex-wrap items-center gap-5 p-6 justify-between rounded-lg border border-richblack-700">
                        <div className="flex items-center gap-5 ">
                            <img src={user?.profilePicture} alt="profile"
                                className="aspect-square w-[78px] rounded-full object-cover"
                            />
                            <div className="flex flex-col gap-1">
                                <p className="text-[18px] font-kamBold">{user?.firstName + " " + user?.lastName}</p>
                                <p className="text-richblack-300 text-[14px]">{user?.email}</p>
                            </div>
                        </div>
                        <div className="flex items-center">
                            <div className="gap-2 items-center cursor-pointer bg-yellow-50 px-4 flex py-2 text-richblack-900 font-kamBold rounded-lg"
                                onClick={()=>nevigate("/dashboard/settings")} >
                                <BiEdit className="text-richblack-900 text-[21px]" />   
                                <IconBtn
                                    text={"Edit"}
                                    customCss = {""}
                                ></IconBtn>
                                
                            </div>
                            
                        </div>
                    </div>

                    {/* Section 2 */}
                    <div className="w-full bg-richblack-800 flex flex-col p-6 justify-between rounded-lg border border-richblack-700">
                        <div className="flex  justify-between w-full">
                            <p className="text-[18px] text-richblack-5 font-kamBold">
                                Person Details
                            </p>
                            <div className="flex items-center">
                                <div className="gap-2 items-center cursor-pointer bg-yellow-50 px-4 flex py-2 text-richblack-900 font-kamBold rounded-lg"
                                    onClick={()=>nevigate("/dashboard/settings")}>
                                    <BiEdit className="text-richblack-900 text-[21px]" />   
                                    <IconBtn
                                        text={"Edit"}
                                        customCss = {""}
                                    ></IconBtn>
                                </div>
                            </div>
                        </div>
                        <div className="flex lg:w-[60%] md:w-[80%] sm:w-[95%] justify-between mt-3">
                            <div className="flex items-start pt-3">
                                <div className="flex flex-col gap-5 w-full">
                                    <div className="flex flex-col gap-1">
                                        <p className="text-richblack-500 text-[16px]">
                                            First Name
                                        </p>
                                        <p className="text-richblack-5 ml-1 text-[16px]">
                                            {user?.firstName}
                                        </p>
                                    </div>
                                    <div className="flex flex-col gap-1">
                                        <p className="text-richblack-500 text-[16px]">
                                            Email
                                        </p>
                                        <p className="text-richblack-300 ml-1 text-[16px]">
                                            {user?.email}
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className=" flex items-start pt-3">
                                <div className="flex flex-col gap-5 w-full">
                                    <div className="flex flex-col gap-1 w-full">
                                        <p className="text-richblack-500 text-[16px]">
                                            Last Name
                                        </p>
                                        <p className="text-richblack-5 ml-1 text-[16px]">
                                            {user?.lastName}
                                        </p>
                                    </div>
                                    <div className="flex flex-col gap-1">
                                        <p className="text-richblack-500 text-[16px]">
                                            Phone Number
                                        </p>
                                        <p className="text-richblack-5 ml-1 text-[16px]">
                                            {user?.additionalDetails?.contactNumber}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MyProfile;