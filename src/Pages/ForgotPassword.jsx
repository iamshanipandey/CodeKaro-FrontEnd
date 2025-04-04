import React, { useState } from "react";
import { FaLongArrowAltLeft } from "react-icons/fa";
import { getResetPasswordEmail } from "../Services/Operations/authApi";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-hot-toast";

function ForgotPassword(){

    const {loading} = useSelector((state) => state.auth);
    const [emailSent , setEmailSent] = useState(false);
    const [email, setEmail] = useState("");
    let dispatch = useDispatch();

    function submitHandler(e){
        e.preventDefault();
        if(!email)
        {
            toast.error("Please Enter Email")
            return;
        }
        const apiCall= dispatch(getResetPasswordEmail(email, setEmailSent));
        toast.promise(
            apiCall,
            {
              loading: "Sending Link",
              success: (message)=>message,
              error: (errorMessage)=>errorMessage,
            }
        )
    }

    

    return(
        <div className="text-richblack-5 flex flex-col items-center">
            <div className="absolute">
                {
                    loading? (<div></div>)
                    :(
                        <div className=" w-11/12 max-w-[1250px] mt-[150px] items-center flex flex-col">
                            <div className="w-[508px] p-8 center mx-auto flex flex-col">
                                <div className="text-[30px] w-full text-richblack-5 font-semiBold">
                                    {
                                        !emailSent? ("Reset your password"):("Check email")
                                    }
                                </div>
                                <div className="text-richblack-100 formBox text-[18px] mt-2">
                                    {
                                        !emailSent? ("Have no fear. We’ll email you instructions to reset your password. If you dont have access to your email we can try account recovery")
                                                    :(`We have sent the reset email to ${email}`)
                                    }
                                </div>
                                <form onSubmit={submitHandler}>
                                    {
                                        !emailSent && 
                                            <label>
                                                <p className="mt-8 text-richblack-100 text-[14px]">Email Address <sup className="text-[#FF0000]">*</sup></p>
                                                <input className="mt-2 formBox w-[440px] p-2 text-richblack-5 border-b border-richblack-300 bg-richblack-800 rounded-md outline-none"
                                                name="email"
                                                type="email"
                                                value={email}
                                                onChange={(e)=>setEmail(e.target.value)}
                                                placeholder="Enter your email address"/>
                                            </label>

                                    }
                                    <button type="submit" className="flex mt-5 justify-center text-[16px] text-richblack-900 font-semiBold bg-yellow-50
                                                py-2 rounded-lg w-[440px] formBox cursor-pointer transition-all duration-200 hover:scale-[99%]">
                                        {
                                            !emailSent? ("Reset Password"):("Resent email")
                                        }
                                    </button>
                                </form>
                                    
                                <Link to={"/login"} className="flex w-full gap-2 items-center mt-5 ml-3 cursor-pointer">
                                    <FaLongArrowAltLeft />
                                    <p>Back to login</p>
                                </Link>
                            </div>
                        </div>
                    )
                }
            </div>       
        </div>
    )
}


export default ForgotPassword;