import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import IconBtn from "../Common/IconBtn";
import { useForm } from "react-hook-form";
import { countryCodes } from "../../../data/CountryData";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { profileUpdateAPI, logoutAPI, removeProfile, deleteAccount, changePasswordAPI } from "../../../Services/Operations/authApi";
import {setProfilePicture} from "../../../Slices/profileReducer";
import { MdDeleteForever } from "react-icons/md";
import DeleteAccountModal from "../Common/DeleteAccountModal";
import ConfirmationModal from "../Common/ConfirmationModal";

function Setting(){

    const {user, loading:profileLoading} = useSelector((state)=>state.profile);
    const {token, loading:tokenLoading} = useSelector((state)=>state.auth); 
    const [dp, setDp] = useState(null);
    const [showOldPassword, setShowOldPassword] = useState(true);
    const [showPassword, setShowPassword] = useState(true);
    const [showConfirmPassword, setShowConfirmPassword] = useState(true);
    let nevigate = useNavigate();
    let dispatch = useDispatch();
    const {profilePicture} = useSelector((state)=> state.profile);
    const [modalData, setModalData] = useState(null);
    const [changed, setChanged] = useState(false);

    const {
        register,
        handleSubmit,
        reset,
        formState : {isSubmitSuccessful},

    } = useForm({
        defaultValues: {
            name: `${user?.firstName} ${user?.lastName}`,
            profession: user?.additionalDetails?.profession,
            dateOfBirth : user?.additionalDetails?.dateOfBirth,
            gender : user?.additionalDetails?.gender,
            phoneNumber: user?.additionalDetails?.contactNumber,
            about : user?.additionalDetails?.about,
            countryCode: "+91",
        }
    });


    useEffect(()=>{
        if(isSubmitSuccessful)
        {
            reset({
                
            })
        }
    })

    

    async function callAPI(data){
        const formData = new FormData();

        if(!dp)
        {
            formData.append("profilePictureURL", dp)
        }
        if(dp)
        {
            console.log(dp);
            formData.append("profilePicture", dp)
        }
        formData.append("token", token)
        formData.append("firstName", data.name.split(" ").at(0))
        formData.append("lastName", data.name.split(" ").slice(1).join(" "))
        formData.append("profession", data.profession)
        formData.append("dateOfBirth", data.dateOfBirth)
        formData.append("contactNumber", data.phoneNumber)
        formData.append("about", data.about)
        formData.append("gender",data.gender);

        if (!token) {
            console.error("Session Expire, logging out...");
            dispatch(logoutAPI(nevigate));
            return;
        }
        
        const apiCall = dispatch(profileUpdateAPI(formData, nevigate));
        await toast.promise(
            apiCall,
            {
              loading: "Updating Profile",
              success: (message)=>message,
              error: (errorMessage)=>errorMessage,
            }
        )
        if(data.oldPassword)
        {
            let password = data.oldPassword;
            let newPassword = data.password;
            let confirmNewPassword = data.confirmPassword;
            let email = user.email;

            const apiCall = dispatch(changePasswordAPI(password, newPassword, confirmNewPassword, email,setChanged, token, nevigate));
            await toast.promise(
                apiCall,
                {
                  loading: "Changing Password",
                  success: (message)=>message,
                  error: (errorMessage)=>errorMessage,
                }
            )
        }
        
        window.location.reload();
    }


    const changeHandler = (event) =>{
        const file = event.target.files[0];

        const reader = new FileReader();
        reader.onload = () => {
            dispatch(setProfilePicture(reader.result));
          };
        reader.readAsDataURL(file);
        setDp(file);
        console.log("File path", file);
    }


    async function removeDp(){
       
        const apiCall = dispatch(removeProfile(token, nevigate));
        await toast.promise(
            apiCall,
            {
              loading: "Wait a moment",
              success: (message)=>message,
              error: (errorMessage)=>errorMessage,
            }
        )  
        window.location.reload();         
    }

    const handleUploadClick = () => {
        document.getElementById("hiddenFileInput").click();
    };

    if(tokenLoading || profileLoading)
    {
        return (
            <div className="spinner">
                
            </div>
        )
    }

    return(
        <div className="w-full text-richblack-5 bg-richblack-900 flex flex-col ">
            <div className=" p-10 text-[30px] font-kamBold">
                Edit Profile
            </div>
            <div className="text-richblack-5 w-full border-richblack-5 flex flex-col items-center">
                <div className="w-11/12 max-w-[1250px] editProfileMainContainer flex flex-col gap-5">

                    {/* Section 1 */}

                    <div className="lg:w-[60%] md:w-[90%] sm:w-[98%] mt-5 bg-richblack-800 flex p-6 justify-between rounded-lg border-2 border-richblack-700">
                        <div className="profilePicture justify-center flex gap-5 items-center">
                            <div className="">
                                <img src={profilePicture? profilePicture:user.profilePicture} alt="ProfilePicture" className="aspect-square w-[78px] rounded-full object-cover"
                                />
                            </div>
                            <div className="flex flex-col gap-3">
                                <p className="text-richblack-5 text-[18px]">Change Profile Picture</p>
                                <div className="flex gap-3">
                                    <IconBtn
                                    onClick={()=>handleUploadClick()}
                                    text={"Upload"}
                                    customCss={"bg-yellow-50 px-6 flex py-2 text-richblack-900 font-kamBold rounded-lg"}
                                    />
                                    <input 
                                    id="hiddenFileInput"
                                    type="file"
                                    accept="image/*"
                                    onChange={changeHandler}
                                    style={{display: "none"}}                            
                                    />
                                    <IconBtn
                                    onClick={()=>removeDp()}
                                    text={"Remove"}
                                    customCss={"bg-richblack-700 border border-richblack-500 px-6 flex py-2 text-richblack-100 font-kamBold rounded-lg"}
                                    />
                                </div>
                                
                            </div>

                        </div>
                    </div>

                    {/* Section 2 */}

                    <div className="lg:w-[60%] md:w-[90%] sm:w-[98%] mt-10 bg-richblack-800 flex lg:p-10 md:p-10 p-5 justify-between rounded-lg border-2 border-richblack-700">
                        <div className="w-full flex flex-col " >
                            <p className="text-richblack-5 text-[18px]">Personal Details</p>
                            <form className="flex flex-col justify-center" onSubmit={handleSubmit(callAPI)}>
                                <div className="flex w-full items-center  justify-between flex-wrap">
                                    <label className="relative mt-5">
                                        <p className="text-richblack-50 mt-3 text-[14px]">Display Name <sup className="text-[#FF0000]">*</sup></p>
                                        <input className="mt-2 w-[250px]   p-2 text-richblack-100 border-b border-richblack-300 bg-richblack-700 rounded-md outline-none"
                                        name="password"
                                        type = "text"
                                        {...register("name",{required:true , message: "Enter Your Name"})}
                                        />    
                                        <p className="text-[12px] mt-2 ml-1 text-richblack-500">Name entered above will be used for all issued certifies.</p>                                    
                                    </label>
                                    <label className="relative">
                                        <p className="text-richblack-50 mt-3 text-[14px]">Profession <sup className="text-[#FF0000]">*</sup></p>
                                        <select className="mt-2 w-[250px] p-2 py-[11px]   text-richblack-100 border-b border-richblack-300 bg-richblack-700 rounded-md outline-none"
                                        name="profession"
                                        {...register("profession", {required:false, message:"Select Your Profession"})}
                                        >
                                        <option>Developer</option>
                                        <option>AI Engineer</option>
                                        <option>Data Scientist</option>
                                        </select>
                                    </label>
                                </div>
                                <div className="flex w-full flex-wrap  justify-between">
                                    <label className="relative">
                                        <p className="text-richblack-50 mt-3 text-[14px]">Date Of Birth <sup className="text-[#FF0000]">*</sup></p>
                                        <input className="mt-2 w-[250px]   p-2 text-richblack-100 border-b border-richblack-300 bg-richblack-700 rounded-md outline-none"
                                        name="dateOfBirth"
                                        type = "date"
                                        {...register("dateOfBirth",{required:false , message: "Choose Date of Birth"})}
                                        />                                        
                                    </label>
                                    <label className="relative">
                                        <p className="text-richblack-50 mt-3 text-[14px]">Profession <sup className="text-[#FF0000]">*</sup></p>
                                        <div className="mt-2 flex gap-2 w-[250px]   px-4  p-2 text-richblack-100 border-b border-richblack-300 bg-richblack-700 rounded-md outline-none">
                                            <div className="flex w-full items-center gap-2">
                                                <input
                                                type="radio"
                                                name="gender"
                                                value="Male"
                                                id="male"
                                                {...register("gender", {required:true, message: "Please Choose Gender"})}
                                                />
                                                <p>Male</p>
                                            </div>

                                            <div className="flex items-center gap-2">
                                                <input
                                                type="radio"
                                                name="gender"
                                                value="Female"
                                                id="female"
                                                {...register("gender", {required:true, message: "Please Choose Gender"})}
                                                />
                                                <p>Female</p>
                                            </div>

                                            <div className="flex items-center gap-2">
                                                <input
                                                type="radio"
                                                name="gender"
                                                value="Other"
                                                id="other"
                                                {...register("gender", {required:true, message: "Please Choose Gender"})}
                                                />
                                                <p>Other</p>
                                            </div>
                                        </div>
                                    </label>
                                </div>
                                <div className="flex flex-wrap  justify-between">
                                    <label>
                                        <p className="text-richblack-5 mt-4 text-[14px]">Phone Number <sup className="text-[#FF0000]">*</sup></p>
                                        <div className="flex gap-2">
                                            <select
                                                name="countryCode"
                                                id="countryCode"
                                                className="w-[68px] mt-2 p-2 text-richblack-100 border-b border-richblack-300 bg-richblack-700 rounded-md outline-none"
                                                {...register("countryCode", {required:false, message: "Please Select Country Code"})}
                                            >
                                            {
                                                countryCodes.map((countryCode, index)=>{
                                                    return (
                                                        <option key={index} value={countryCode.dial_code}>{countryCode.dial_code} -{countryCode.name}</option>
                                                    )
                                                })
                                            }
                 
                                            </select>
                                            <input
                                                name="phoneNumber"
                                                id="phoneNumber"
                                                type="number"
                                                className="mt-2 w-[175px] p-2 text-richblack-100 border-b border-richblack-300 bg-richblack-700 rounded-md outline-none"
                                                {...register("phoneNumber", {required:true, message:"Please enter your phone number"})}
                                            />
                                        </div>
                                    </label>
                                    <label className="relative">
                                        <p className="text-richblack-50 mt-3 text-[14px]">About</p>
                                        <input className="mt-2  w-[250px]  p-2 text-richblack-100 border-b border-richblack-300 bg-richblack-700 rounded-md outline-none"
                                        name="about"
                                        type = "text"
                                        {...register("about",{required:true , message: "Enter Your Name"})}
                                        />                                        
                                    </label>
                                </div>
                            </form>
                        </div>

                    </div>

                    {/* Section 3 */}

                    <div className="lg:w-[60%] md:w-[90%] sm:w-[98%] mt-5 bg-richblack-800 flex lg:p-10 md:p-10 p-5 justify-between rounded-lg border-2 border-richblack-700">
                        <div className="w-full">
                            <form className="flex flex-col items-center w-full">
                                <div className="flex flex-wrap justify-between items-center w-full">
                                    <label className="relative">
                                        <p className="text-richblack-50 mt-3 text-[14px]">Current Password <sup className="text-[#FF0000]">*</sup></p>
                                        <input className="mt-2 w-[250px] p-2 text-richblack-100 border-b border-richblack-300 bg-richblack-700 rounded-md outline-none"
                                        name="oldPassword"
                                        type = {showOldPassword ? ("password") : ("text")}
                                        {...register("oldPassword", {required:false, message:"Please enter current password"})}
                                        />
                                        <span onClick={()=>setShowOldPassword(!showOldPassword)} className="absolute cursor-pointer translate-x-[-200%] translate-y-[125%]" >
                                            {
                                                showOldPassword? (<AiFillEyeInvisible/>):(<AiFillEye/>)
                                            }
                                        </span>

                                    </label>
                                    <label className="relative">
                                        <p className="text-richblack-50 mt-3 text-[14px]">New Password <sup className="text-[#FF0000]">*</sup></p>
                                        <input className="mt-2 w-[250px] p-2 text-richblack-100 border-b border-richblack-300 bg-richblack-700 rounded-md outline-none"
                                        name="password"
                                        type = {showPassword ? ("password") : ("text")}
                                        {...register("password", {required:false, message:"Please enter password"})}
                                        />
                                        <span onClick={()=>setShowPassword(!showPassword)} className="absolute cursor-pointer translate-x-[-200%] translate-y-[125%]" >
                                            {
                                                showPassword? (<AiFillEyeInvisible/>):(<AiFillEye/>)
                                            }
                                        </span>

                                    </label>
                                    <label className="relative">
                                        <p className="text-richblack-50 mt-3 text-[14px]">Confirm Password <sup className="text-[#FF0000]">*</sup></p>
                                        <input className="mt-2 p-2 w-[250px] text-richblack-100 border-b border-richblack-300 bg-richblack-700 rounded-md outline-none"
                                        name="confirmPassword"
                                        type = {showConfirmPassword ? ("password") : ("text")}
                                        {...register("confirmPassword", {required:false, message:"Please confirm password"})}
                                        />
                                        <span onClick={()=>setShowConfirmPassword(!showConfirmPassword)} className="absolute cursor-pointer translate-x-[-200%] translate-y-[125%]" >
                                            {
                                                showConfirmPassword? (<AiFillEyeInvisible/>):(<AiFillEye/>)
                                            }
                                        </span>
                                    </label>
                                    
                                </div>
                                
                                
                            </form>
                        </div>
                    </div>

                    {/* Section 4 */}

                    <div className="lg:w-[60%] md:w-[90%] sm:w-[98%] mt-5 bg-pink-900 flex lg:p-5 md:p-5 p-2 justify-between rounded-lg border-2 border-pink-700">
                        <div className="flex gap-5 lg:w-[70%] md:w-[90%] sm:w-full">
                            <div className="bg-pink-700 rounded-full p-2 h-fit">
                                <MdDeleteForever className="text-[36px] text-pink-200 "/>
                            </div>
                            <div className="flex flex-col gap-2 items-start">
                                <p className="text-richblack-5 font-kamBold text-[18px]">Delete Account</p>
                                <div className="flex flex-col gap-1">
                                    <p className="text-pink-25 text-[14px]">Would you like to delete account?</p>
                                    <p className="text-pink-25 text-[14px]">This account contains Paid Courses. Deleting your account will remove all the contain associated with it.</p>
                                </div>
                                {/* <button onClick={()=>removeAccount} className="text-pink-400 font-kamBold text-[16px] italic">I want to delete my account.</button> */}
                                <button onClick={()=> setModalData({
                                                    text1 : "Are you sure",
                                                    text2 : "Your Account will be permanent Deleted.",
                                                    btn1Text : "Delete",
                                                    btn2Text : "Cancel",
                                                    btn1Handler : ()=>dispatch(ConfirmationModal(token, nevigate)),
                                                    btn2Handler : ()=> setModalData(null),
                                                })} 
                                                className="text-pink-400 font-kamBold text-[16px] italic">
                                                    <span>
                                                    I want to delete my account.
                                                    </span>
                                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Submit Button */}

                    <div className="flex gap-5 mt-5 mb-20">   
                        <IconBtn
                            onClick={handleSubmit(callAPI)}
                            text={"Submit"}
                            type={"submit"}
                            customCss={"bg-yellow-50 px-6 flex py-2 text-richblack-900 font-kamBold rounded-lg"}
                        />
                        <IconBtn
                            onClick={()=>nevigate("/dashboard/my-profile")}
                            text={"Cancel"}
                            customCss={"bg-richblack-700 border border-richblack-500 px-6 flex py-2 text-richblack-100 font-kamBold rounded-lg"}
                        />
                    </div>
                    
                </div>
            </div>
            {
            modalData&& <ConfirmationModal modalData={modalData}/>
            }
        </div>
    )
}

export default Setting;