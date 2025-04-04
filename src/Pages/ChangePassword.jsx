import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { changePasswordAPI } from "../Services/Operations/authApi";
import { BiError } from "react-icons/bi";
import toast from "react-hot-toast";


function ChangePassword(){

    const [email, setEmail] = useState(null);
    const {user} = useSelector((state)=>state.profile);
    const {token} = useSelector((state)=>state.auth);
    let nevigate = useNavigate();
    let dispatch = useDispatch();
    const [changed, setChanged] = useState(false);


    const [formData, setFormData] = useState({
        password: "",
        newPassword: "",
        confirmNewPassword: "",
    })
    const loginDetails = {...formData, email};
    
    useEffect(()=>{
        if(user===null)
        {
            nevigate("/login")
        }
        if(user!==null)
            {
                setEmail(user.email);
            }
    }, [user, nevigate]);

    function changeHandler(event){
        setFormData((prevData)=>{
            return{
                ...prevData,
                [event.target.name] : event.target.value
            }
        })
    }

    function submitHandler(event){
        event.preventDefault();
        const apiCall = dispatch(changePasswordAPI(loginDetails.password,loginDetails.newPassword,
                                                    loginDetails.confirmNewPassword,
                                                    loginDetails.email, setChanged, token, nevigate));
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
        <div className="flex flex-col items-center mt-[100px]">
            <div className="flex flex-col w-11/12 max-w-[1250px] items-center">
                <div className="w-[508px] p-[32px] center">
                    <div className="text-[30px] text-richblack-5 font-semiBold w-full">
                        {
                            changed? ("Password Changed"):("Change Password")
                        }
                    </div>
                    <p className="text-richblack-100 formBox text-[18px] mt-2"> 
                        {
                            changed? ("Your Password changed successfully.. We have sent an confirmation email to your registered email"):("You can create a new password by entering your old password")
                        }
                    </p>
                    <form onSubmit={submitHandler}>
                        {
                            !changed && (
                            <div>
                                <label>
                                    <p className="mt-5 text-richblack-100 text-[14px]">Old Password <sup className="text-[#FF0000]">*</sup></p>
                                    <input
                                    name="password"
                                    value={formData.password}
                                    onChange={changeHandler}
                                    placeholder="Enter Old Password"
                                    className="mt-2 formBox w-[440px] p-2 text-richblack-5 border-b border-richblack-300 bg-richblack-800 rounded-md outline-none"
                                    />
                                </label>
                                <label>
                                    <p className="mt-5 text-richblack-100 text-[14px]">Set New Password <sup className="text-[#FF0000]">*</sup></p>
                                    <input
                                    name="newPassword"
                                    value={formData.newPassword}
                                    onChange={changeHandler}
                                    placeholder="Enter New Password"
                                    className="mt-2 formBox w-[440px] p-2 text-richblack-5 border-b border-richblack-300 bg-richblack-800 rounded-md outline-none"
                                    />
                                </label>
                                <label>
                                    <p className="mt-5 text-richblack-100 text-[14px]">Confirm New Password <sup className="text-[#FF0000]">*</sup></p>
                                    <input
                                    name="confirmNewPassword"
                                    value={formData.confirmNewPassword}
                                    onChange={changeHandler}
                                    placeholder="Confirm New Password"
                                    className="mt-2 formBox w-[440px] p-2 text-richblack-5 border-b border-richblack-300 bg-richblack-800 rounded-md outline-none"
                                    />
                                </label>
                            </div>
                            )
                        }
                        {
                            changed? (
                                <Link to={"/dashboard"}>
                                    <div className="flex mt-5 items-center justify-center text-[16px] text-richblack-900 font-semiBold bg-yellow-50
                                        py-2 rounded-lg w-[440px] formBox cursor-pointer transition-all duration-200 hover:scale-[99%]" >
                                        Back to Dashboard
                                    </div>
                                </Link>
                                
                            ):(
                                <button type="submit" className="flex mt-5 justify-center text-[16px] text-richblack-900 font-semiBold bg-yellow-50
                                py-2 rounded-lg w-[440px] formBox cursor-pointer transition-all duration-200 hover:scale-[99%]" >
                                Change Password
                                </button>
                            )
                        }
                        
                    </form>
                    {
                        !changed && (
                            <Link to={"/forgot-password"} className="flex text-[#47A5C5] w-full gap-2 items-center mt-4 ml-3 cursor-pointer">
                                <BiError />
                                <p>Forgot Password?</p>
                            </Link>
                        ) 
                    }
                    
                </div>
            </div>

        </div>
    )
}

export default ChangePassword;