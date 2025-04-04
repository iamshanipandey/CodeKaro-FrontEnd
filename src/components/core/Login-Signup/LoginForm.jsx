import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginAPI } from "../../../Services/Operations/authApi";

function LoginForm(){

    let nevigate = useNavigate();
    const [formData, setFormData] = useState({email:"", password:""});
    const [accountType, setAccountType] = useState("Student");
    const [showPassword, setShowPassword] = useState("false");
    let dispatch = useDispatch();

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

    const formAllData = {...formData, accountType};

    function submitHandler(event){
        event.preventDefault();
        const apiCall = dispatch(loginAPI(formAllData, nevigate));
        toast.promise(
            apiCall,
            {
              loading: "Validating..!",
              success: (message)=>message,
              error: (errorMessage)=>errorMessage,
            }
        )
        
    }

    return(
        <div className="gap-y-5 flex flex-col authMain">
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
            <form onSubmit={submitHandler} className="authMain" >
                <div className="flex flex-col">
                    <label>
                        <p className="text-richblack-5 mt-3 text-[14px]">Email Address <sup className="text-[#FF0000]">*</sup></p>
                        <input className="mt-2 formBox w-[440px] p-2 text-richblack-5 border-b border-richblack-300 bg-richblack-800 rounded-md outline-none"
                        name="email"
                        type = "email"
                        value = {FormData.email}
                        onChange={changeHandler}
                        placeholder="Enter the email address"/>
                    </label>
                </div>

                <div>
                    <label className="relative">
                        <p className="text-richblack-5 mt-5 text-[14px]">Password <sup className="text-[#FF0000]">*</sup></p>
                        <input className="mt-2 formBox w-[440px] p-2 text-richblack-5 border-b border-richblack-300 bg-richblack-800 rounded-md outline-none"
                        name="password"
                        type = {showPassword ? ("password") : ("text")}
                        value = {FormData.password}
                        onChange={changeHandler}
                        placeholder="Enter your password"/>
                        <span onClick={()=>setShowPassword(!showPassword)} className="absolute formBox_eye cursor-pointer translate-x-[-200%] translate-y-[125%]" >
                            {
                                showPassword? (<AiFillEyeInvisible/>):(<AiFillEye/>)
                            }
                        </span>
                    </label>
                </div>
                <div>
                <div className="flex  text-[#47A5C5] justify-end mt-2">
                        <Link to={"/forgot-password"} className="cursor-pointer">
                            Forget Password?
                        </Link>
                </div>
                <button className="flex mt-5 justify-center formBox_flex text-[16px] text-richblack-900 font-semiBold bg-yellow-50
                                py-2 rounded-lg w-[440px] cursor-pointer">
                    Log In
                </button>
            </div>
            </form>
            
        </div>
        
    )
}

export default LoginForm;

