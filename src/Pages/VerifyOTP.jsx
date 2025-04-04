import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import OtpInput from 'react-otp-input';
import { Link, useNavigate } from "react-router-dom";
import { RxCounterClockwiseClock } from "react-icons/rx";
import { sendOTP } from "../Services/Operations/authApi";
import toast from "react-hot-toast";
import { signupAPI } from "../Services/Operations/authApi";
import { FaLongArrowAltLeft } from "react-icons/fa";


function VerifyOTP(){

    let dispatch = useDispatch();
    let nevigate = useNavigate();
    const {signupForm} = useSelector((state) => state.auth);
    const {loading} = useSelector((state)=> state.auth)
    const [otp , setOtp] = useState("");

    function otpHandler(){
        const apiCall = dispatch(sendOTP(signupForm.email, nevigate))
        toast.promise(
            apiCall,
            {
              loading: "Resending OTP..!",
              success: (message)=>message,
              error: (errorMessage)=>errorMessage,
            }
        )   
    }


    function submitHandler(event){
        event.preventDefault();
        const {
            firstName,
            lastName,
            email,
            password,
            confirmPassword,
            accountType
        } = signupForm;
        
        const apiCall = dispatch(signupAPI(
            firstName,
            lastName,
            email,
            password,
            confirmPassword,
            accountType,
            otp,
            nevigate
        ))

        toast.promise(
            apiCall,
            {
              loading: "Verifying",
              success: (message)=>message,
              error: (errorMessage)=>errorMessage,
            }
            )
        
    }

    return (
        <div className="text-richblack-5 flex flex-col items-center">
            {
                loading? (<div className="loader"></div>)
                :(
                    <div className=" w-11/12 max-w-[1250px] mt-[150px] items-center flex flex-col">
                        <div className="w-[508px] p-8 center mx-auto flex flex-col">
                            <p className="text-[30px] w-full text-richblack-5 font-semiBold" >Verify Email</p>
                            <p className="text-richblack-100 formBox text-[18px] mt-2">A verification code has been sent to you. Enter the code below</p>
                            <form className="mt-6 flex flex-col items-center" onSubmit={submitHandler}>
                                <OtpInput
                                  value={otp}
                                  onChange={setOtp}
                                  numInputs={6}
                                  renderSeparator={<span>-</span>}
                                  renderInput={(props) => <input {...props}
                                  className="otp-input"/>}
                                />
                                <button className="flex mt-5 justify-center text-[16px] text-richblack-900 font-semiBold bg-yellow-50
                                            py-2 rounded-lg w-[440px] formBox cursor-pointer transition-all duration-200 hover:scale-[99%]" >
                                            Verify Email
                                </button>
                            </form>
                            <div className="flex justify-between w-full formBox_flex px-3 mt-5">
                                <Link to={"/login"} className="flex text-richblack-5 gap-2 items-center cursor-pointer">
                                    <FaLongArrowAltLeft />
                                    <p>Back to login</p>
                                </Link>
                                <Link className="flex  text-[#47A5C5] gap-2 items-center cursor-pointer" onClick={otpHandler}>
                                    <RxCounterClockwiseClock />
                                    Resend OTP
                                </Link>
                            </div>
                        
                    </div>
                </div>
                )
            }
        </div>

    )
}

export default VerifyOTP;