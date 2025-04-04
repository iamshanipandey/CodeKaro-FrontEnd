import React from "react";
import google from "../../../assests/Login-Signup/google-logo.png"
import frame from "../../../assests/Login-Signup/frame.png"
import HighlightText from "../HomePage/HighlightText";
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";

function Template({image, formType, setIsLoggedIn, heading}) {
    return (
        <div className="w-full  pb-20 text-richblack-5 max-w-[1250px] flex flex-wrap justify-between ">
            <div className="flex flex-col authMain p-8">
                <div className="text-[30px] text-richblack-5 welocome_text font-semiBold"><HighlightText text={heading}/></div>
                <div className="flex mt-2 flex-col text-[14px]">
                    <p>Build skills for today, tommarow, and beyond</p>
                    <p className="text-[#47A5C5] italic">Be Unstoppable...</p>
                </div>
                <div>
                    {formType==="login"? (<LoginForm setIsLoggedIn={setIsLoggedIn}/>) : (<SignupForm setIsLoggedIn={setIsLoggedIn}/>)}
                </div>
                <div className="flex items-center gap-x-1 w-[440px] formBox_flex mt-5">
                    <div className="w-1/2 h-[2px] bg-richblack-300"></div>
                    <p>OR</p>
                    <div className="w-1/2 h-[2px] bg-richblack-300"></div>
                </div>
                <div className="flex mt-3">
                    <div className="flex w-[440px] formBox_flex border border-richblack-300 cursor-pointer justify-center bg-richblack-900 py-2 
                                    rounded-lg font-semiBold">
                        <img width="40px" src={google} alt=""/>
                        <p>{formType==="login"? "Login with Google" :"Signup with Google"}</p> 
                    </div>
                </div>
                
            </div>
            <div  className="relative loginSignupImage mt-14">
                <img className="absolute translate-x-[5%] translate-y-[5%] z-0" src={frame} alt="Frame" />
                <img className="relative z-2" width="500px" src={image} alt="Login"/>
            </div>

        </div>
    )
}

export default Template;