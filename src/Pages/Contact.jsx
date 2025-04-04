import React from "react";
import ContactForm from "../components/core/Common/ContactForm";
import { IoMdChatbubbles, IoMdCall  } from "react-icons/io";
import { MdPublic } from "react-icons/md";
import Footer from "../components/core/HomePage/Footer";




function Contact(){
    return(
        <div className="bg-richblack-900 flex flex-col items-center py-16 ">
            <div className="w-11/12 max-w-[1250px] flex justify-center flex-wrap gap-10 mb-20">
            <div className="bg-richblack-800 flex flex-col gap-8 lg:w-[405px] md:w-[405px] sm:w-[380px]  py-8 px-5 text-richblack-5 h-fit rounded-xl flex-wrap">
                <div>
                    <p className="flex items-center gap-2 text-[18px]"><IoMdChatbubbles className="text-richblack-300 text-[20px]"/> Chat on us</p>
                    <p className="text-richblack-300 text-[14px] ml-7">Our friendly team is here to help.</p>
                    <p className="text-richblack-300 text-[14px] ml-7">iamshanipandey@gmail.com</p>
                </div>
                <div>
                    <p className="flex items-center gap-2 text-[18px]"><MdPublic  className="text-richblack-300 text-[20px]"/> Visit us</p>
                    <p className="text-richblack-300  text-[14px] ml-7">Come and say hello at our office HQ.</p>
                    <p className="text-richblack-300  text-[14px] ml-7">Dharuhera, Haryana..💪, 123106, IND</p>
                </div>
                <div>
                    <p className="flex items-center gap-2 text-[18px]"><IoMdCall  className="text-richblack-300 text-[20px]"/> Call us</p>
                    <p className="text-richblack-300  text-[14px] ml-7">Mon - Fri From 8am to 5pm</p>
                    <p className="text-richblack-300  text-[14px] ml-7">+91 7404863291</p>
                </div>
            </div>
            <div className="lg:border lg:border-richblack-500 rounded-xl w-[580px] px-5 py-8   flex flex-col items-center">
                <div className="text-[36px] text-richblack-5 font-semiBold text-center">
                    Got a Idea? We’ve got the skills. Let’s team up
                </div>
                <p className="text-[16px] text-richblack-300 mt-1 text-center">
                    Tall us more about yourself and what you’re got in mind.
                </p>
                <ContactForm/>
            </div>

            </div>
            <Footer/>

        </div>
    )
}

export default Contact;