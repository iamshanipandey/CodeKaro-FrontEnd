import {React, useState} from "react";
import { toast } from "react-hot-toast";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setSignupForm } from "../../../Slices/authReducer";
import { sendOTP } from "../../../Services/Operations/authApi";

function SignupForm() {

    let dispatch = useDispatch();
    let nevigate = useNavigate();
    const [formData, setFormData] = useState({firstName: "", lastName: "", email:"", password:"", confirmPassword: ""});
    const [accountType, setAccountType] = useState("Student");
    const [showPassword, setShowPassword] = useState("false");
    const [showConfirmPassword, setShowConfirmPassword] = useState("false");

    
    function accountTypeHandler(value){
        if(value==="Student")
        {
            setAccountType("Student");
        }
        else
        {
            setAccountType("Instructor");
        }
    }

    function changeHandler(event){
            setFormData(prevData =>{
                return{
                    ...prevData,
                    [event.target.name]:event.target.value
                }
            })
    }

    const allFormData = {...formData, accountType}

    async function submitHandler (event){
        event.preventDefault();
        if(!formData.email || !formData.password || !formData.firstName || !formData.lastName || !formData.confirmPassword)
        {
            return toast.error("All Fileds are required");
        }
        else if(formData.password !== formData.confirmPassword)
        {
            return toast.error("Password Doesn't Match");
        }

        dispatch(setSignupForm(allFormData))
        const apiCall = dispatch(sendOTP(allFormData.email, nevigate));
        toast.promise(
            apiCall,
            {
              loading: "Sending OTP..",
              success: (message)=>message,
              error: (errorMessage)=>errorMessage,
            }
        )
    }

    

    return(
        <div className="gap-y-5 flex flex-col authMain">
            <div>
                    <div className="w-[210px] mt-8 bg-richblack-800 flex items-center justify-between px-1 py-1 rounded-full
                            border-b border-richblack-300">
                        <div className={`px-5 py-2 rounded-full cursor-pointer 
                                        ${accountType==="Student"? "bg-richblack-900 transition-all duration-200 ":""}`}
                                        onClick={()=>accountTypeHandler("Student")}>
                            Student
                        </div>
                        <div className={`px-5 py-2  cursor-pointer rounded-full transition-all duration-200
                                         ${accountType==="Instructor"? "bg-richblack-900":""}`}
                                        onClick={()=>accountTypeHandler("Instructor")}>
                            Instructor
                        </div>
                    </div>
                    <form onSubmit={submitHandler}  >
                        <div className="flex flex-col justify-start">
                            <div className="flex w-[440px] formBox justify-between">
                                <label>
                                    <p className="text-richblack-5 mt-3 text-[14px]">First Name <sup className="text-[#FF0000]">*</sup></p>
                                    <input className="mt-2 p-2 formBox text-richblack-5 border-b border-richblack-300 bg-richblack-800 rounded-md outline-none"
                                    name="firstName"
                                    value = {formData.firstName}
                                    onChange={changeHandler}
                                    placeholder="Enter First Name"
                                    />
                                </label>
                                <label>
                                <p className="text-richblack-5 mt-3 text-[14px]">Last Name</p>
                                    <input className="mt-2 p-2 formBox  text-richblack-5 border-b border-richblack-300 bg-richblack-800 rounded-md outline-none"
                                    name="lastName"
                                    value = {formData.lastName}
                                    onChange={changeHandler}
                                    placeholder="Enter Last Name"
                                    />
                                </label>
                            </div>
                            <div className="flex flex-col mt-5 justify-start">
                                <label>
                                    <p className="text-richblack-5 mt-3 text-[14px]">Email Address <sup className="text-[#FF0000]">*</sup></p>
                                    <input className="mt-2 formBox w-[440px] p-2 text-richblack-5 border-b border-richblack-300 bg-richblack-800 rounded-md outline-none"
                                    name="email"
                                    type= "email"
                                    value = {FormData.email}
                                    onChange={changeHandler}
                                    placeholder="Enter the email address"/>
                                </label>
                            </div>
                            <div className="flex w-[440px] formBox justify-between">
                                <label className="relative">
                                    <p className="text-richblack-5 mt-3 text-[14px]">Password <sup className="text-[#FF0000]">*</sup></p>
                                    <input className="mt-2 formBox  p-2 text-richblack-5 border-b border-richblack-300 bg-richblack-800 rounded-md outline-none"
                                    name="password"
                                    type = {showPassword ? ("password") : ("text")}
                                    value = {formData.password}
                                    onChange={changeHandler}
                                    placeholder="Enter your password"
                                    />
                                    <span onClick={()=>setShowPassword(!showPassword)} className="absolute cursor-pointer formBox_eye_signup1 translate-x-[-200%] translate-y-[125%]" >
                                        {
                                            showPassword? (<AiFillEyeInvisible/>):(<AiFillEye/>)
                                        }
                                    </span>
                                    
                                </label>
                                <label className="relative">
                                    <p className="text-richblack-5 mt-3 text-[14px]">Confirm Password <sup className="text-[#FF0000]">*</sup></p>
                                    <input className="mt-2 p-2 formBox text-richblack-5 border-b border-richblack-300 bg-richblack-800 rounded-md outline-none"
                                    name="confirmPassword"
                                    type = {showConfirmPassword ? ("password") : ("text")}
                                    value = {formData.confirmPassword}
                                    onChange={changeHandler}
                                    placeholder="Confirm password"
                                    />
                                    <span onClick={()=>setShowConfirmPassword(!showConfirmPassword)} className="absolute formBox_eye_signup2 cursor-pointer translate-x-[-200%] translate-y-[125%]" >
                                        {
                                            showConfirmPassword? (<AiFillEyeInvisible/>):(<AiFillEye/>)
                                        }
                                    </span>
                                </label>
                            </div>
                            <button className="flex mt-5 justify-center text-[16px] text-richblack-900 font-semiBold bg-yellow-50
                                            py-2 rounded-lg w-[440px] formBox cursor-pointer transition-all duration-200 hover:scale-[99%]">
                                Sign Up
                            </button>
                        </div>
                    </form>
            </div>            
        </div>
        
    )
}

export default SignupForm;