import React, { useState } from "react";
import { useDispatch} from "react-redux";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { FaLongArrowAltLeft } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";
import { resetPassword } from "../Services/Operations/authApi";
import toast from "react-hot-toast";

function ResetPassword(){

    const [formData, setFormData] = useState({
        password:"",
        confirmPassword:"",
    })
  
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [resetDone, setResetDone] = useState(false);
    
    let dispatch = useDispatch();
    let location = useLocation();

    const token = location.pathname.split("/").at(-1);

    const onChangeHandler=(event)=>{
       setFormData((prevData)=>{
            return{
                ...prevData,
                [event.target.name]:[event.target.value]
            }
        })
    }

    function onSubmitHandler(event){
        event.preventDefault();
        const apiCall = dispatch(resetPassword(formData.password[0], formData.confirmPassword[0],token, setResetDone));
        toast.promise(
            apiCall,
            {
              loading: "Wait a moment",
              success: (message)=>message,
              error: (errorMessage)=>errorMessage,
            }
        )
    }

    return(
        <div className="flex items-center justify-center">
            <div className="w-11/12 max-w-[1250px] flex flex-col items-center mt-[150px]">
                <div className="w-[508px] p-[32px] center">
                    <div className="text-[30px] text-richblack-5 font-semiBold w-full">
                        {
                            resetDone? ("Reset complete!"): ("Choose new password")
                        }</div>

                        <p className="text-richblack-100 formBox text-[18px] mt-2">
                            {
                                resetDone? (`All done! We have sent a confirmation email on your email.`):("Almost done. Enter your new password and youre all set.")
                            }
                        </p>
                        <form onSubmit={onSubmitHandler}>
                            {
                                resetDone? (
                                    <Link to={"/login"}>
                                        <div className="flex mt-5 justify-center text-center text-[16px] text-richblack-900 font-semiBold bg-yellow-50
                                            py-2 rounded-lg w-[440px] formBox cursor-pointer transition-all duration-200 hover:scale-[99%]" >
                                            Return to Login
                                        </div>
                                    </Link>
                                )
                                :(
                                <div>
                                    <label>
                                        <p className="mt-5 text-richblack-100 text-[14px]">New Password <sup className="text-[#FF0000]">*</sup></p>
                                        <input className="mt-2 formBox w-[440px] p-2 text-richblack-5 border-b border-richblack-300 bg-richblack-800 rounded-md outline-none"
                                        name="password"
                                        type={showPassword? ("text"):("password")}
                                        value={formData.password}
                                        onChange={onChangeHandler}
                                        placeholder="Enter New Password"
                                        />
                                        <span onClick={()=>setShowPassword(!showPassword) }>
                                            {
                                                showPassword? (<AiFillEye/>):(<AiFillEyeInvisible/>)
                                            }
                                        </span>
                                    </label>
                                    <label>
                                        <p className="mt-2 text-richblack-100 text-[14px]">Confrim new password <sup className="text-[#FF0000]">*</sup></p>
                                        <input className="mt-2 formBox w-[440px] p-2 text-richblack-5 border-b border-richblack-300 bg-richblack-800 rounded-md outline-none"
                                        name="confirmPassword"
                                        type={showConfirmPassword? ("text"):("password")}
                                        value={formData.confirmPassword}
                                        onChange={onChangeHandler}
                                        placeholder="Confirm New Password"
                                        />
                                        <span onClick={()=>setShowConfirmPassword(!showConfirmPassword) }>
                                            {
                                                showConfirmPassword? (<AiFillEye/>):(<AiFillEyeInvisible/>)
                                            }
                                        </span>
                                    </label>
                                    <button type="submit" className="flex mt-5 justify-center text-[16px] text-richblack-900 font-semiBold bg-yellow-50
                                        py-2 rounded-lg w-[440px] formBox cursor-pointer transition-all duration-200 hover:scale-[99%]" >
                                        Reset Password
                                    </button>
                                </div>
                                )
                            }
                            
                        </form>
                        <Link to={"/login"} className="flex w-full text-richblack-5 gap-2 items-center mt-5 ml-3 cursor-pointer">
                            <FaLongArrowAltLeft />
                            <p>Back to login</p>
                        </Link>
                </div>
            </div>
        </div>
    )
}

export default ResetPassword;