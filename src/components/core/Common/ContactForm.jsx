import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { countryCodes } from "../../../data/CountryData"
import { useDispatch } from "react-redux";
import toast from 'react-hot-toast'
import { contactFormSubmitAPI } from "../../../Services/Operations/authApi";
function ContactForm(){

    let dispatch = useDispatch();
    const  {
        register,
        handleSubmit,
        reset,
        formState : {errors, isSubmitSuccessful},
    } = useForm();

    useEffect(()=>{
        reset({
            countryCode:"+91"
        })
    },[])

    async function ContactFormSubmit(data){
        console.log(data);
        const apiCall = dispatch(contactFormSubmitAPI(data));
        await toast.promise(
            apiCall,
            {
              loading: "Wait a moment",
              success: (message)=>message,
              error: (errorMessage)=>errorMessage,
            }
        )
        reset({
            email: "",
            firstName: "",
            lastName: "",
            phoneNumber: "",
            message:"",
        })
    }

    return(
        <div className="sm:w-full md:w-[80%] lg:w-[50%] items-center text-[16px] text-richblack-5">
            <form onSubmit={handleSubmit(ContactFormSubmit)} className="flex flex-col items-center">
                <div className="flex w-[500px] formBox justify-between gap-5">
                    <label>
                    <p className="text-richblack-5 mt-4 text-[14px]">First Name <sup className="text-[#FF0000]">*</sup></p>
                        <input
                            name="firstName"
                            id="firstName"
                            type="text"
                            placeholder="Enter your first name"
                            className="mt-2 w-[100%] p-2 formBox text-richblack-5 border-b border-richblack-300 bg-richblack-800 rounded-md outline-none"
                            {...register("firstName", {required:true, message:"Please enter your first name"})}
                        />
                    </label>
                    <label>
                    <p className="text-richblack-5 mt-4 text-[14px]">Last Name</p>
                        <input
                            name="lastName"
                            id="lastName"
                            type="text"
                            placeholder="Enter your last name"
                            className="mt-2 w-[100%] p-2 formBox  text-richblack-5 border-b border-richblack-300 bg-richblack-800 rounded-md outline-none"
                            {...register("lastName", {required:false})}
                        />
                    </label>
                </div>
                <div className="flex flex-col mt-2 justify-start">
                    <label>
                    <p className="text-richblack-5 mt-2 text-[14px]">Email Address <sup className="text-[#FF0000]">*</sup></p>
                        <input
                            type="email"
                            name="email"
                            id="email"
                            placeholder="Enter your email address"
                            className="mt-2 formBox w-[500px] p-2 text-richblack-5 border-b border-richblack-300 bg-richblack-800 rounded-md outline-none"
                            {...register("email" ,{required:true, message: "Please enter your email id"})}
                        />
                    </label>
                </div>
                <div>
                    <label>
                        <p className="text-richblack-5 mt-4 text-[14px]">Phone Number <sup className="text-[#FF0000]">*</sup></p>
                        <div className="flex gap-5">
                            <select
                                name="countryCode"
                                id="countryCode"
                                className="w-[68px] mt-2 p-2 text-richblack-5 border-b border-richblack-300 bg-richblack-800 rounded-md outline-none"
                                {...register("countryCode", {required:true, message: "Please Select Country Code"})}
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
                                className="mt-2 phoneNumberReponsive w-[410px] p-2 text-richblack-5 border-b border-richblack-300 bg-richblack-800 rounded-md outline-none"
                                placeholder="Enter your phone number"
                                {...register("phoneNumber", {required:true, message:"Please enter your phone number"})}
                            />
                        </div>
                    </label>
                </div>
                <div>
                    <label>
                    <p className="text-richblack-5 mt-4 text-[14px]">Message <sup className="text-[#FF0000]">*</sup></p>
                        <textarea
                            name="message"
                            id="message"
                            placeholder="Enter your message.."
                            cols={30}
                            rows={4}
                            className="mt-2 formBox w-[500px] p-2 text-richblack-5 border-b border-richblack-300 bg-richblack-800 rounded-md outline-none"
                            {...register("message",{required:true, message:"Please enter your message here"})}
                        />
                    </label>
                </div>
                    <button type="submit" className="flex mt-5 justify-center text-[16px] text-richblack-900 font-semiBold bg-yellow-50
                                    py-2 rounded-lg w-[500px] formBox cursor-pointer transition-all duration-200 hover:scale-[99%]">
                        Send Message
                    </button>
            </form>
        </div>
    )
}

export default ContactForm;