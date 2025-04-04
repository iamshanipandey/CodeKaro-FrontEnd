import React, { useState } from "react";
import HighlightText from "../components/core/HomePage/HighlightText";
import image1 from "../assests/About us/Frame 37.png"
import image2 from "../assests/About us/Frame 46.png"
import image3 from "../assests/About us/Frame 47.png"
import image4 from "../assests/About us/HTML_source_code_example 1.png"
import CTAbutton from "../components/core/HomePage/Button";
import ContactForm from "../components/core/Common/ContactForm";
import Footer from "../components/core/HomePage/Footer";

function About(){

    const [formData, setFormData] = useState({
        firstName:"",
        lastName: "",
        email:"",
        contryCode: "",
        phoneNumber: "",
        message: "",
    })

    function onChangeHandler(event){
        setFormData((prevData)=>{
            return{
                ...prevData,
                [event.target.name] : event.target.value,
            }
        })
    }

    return(
        <div>
            <div className="bg-richblack-800 flex flex-col px-3 items-center pb-[150px] pt-[50px]">
                <div className="max-w-[800px] flex flex-col items-center text-center">
                    <p className="text-richblack-200 text-[16px] mb-10" >About us</p>
                    <p className="text-[36px] text-richblack-5">Driving Innovation in Online Education for a <HighlightText text={"Brighter Future"}/></p>
                    
                    <p className="text-richblack-200 text-[16px] mt-5">Studynotion is at the forefront of driving innovation in online education. We're passionate about creating a brighter future by offering cutting-edge courses, leveraging emerging technologies, and nurturing a vibrant learning community.</p>
                </div>
            </div>
            <div className="bg-richblack-900 flex flex-col items-center">
                <div className="w-11/12 max-w-[1250px] flex flex-col items-center -mt-[100px] text-center">
                    <div className="flex justify-center flex-wrap gap-5">
                        <img src={image1} alt="img-1"/>
                        <img src={image2} alt="img-2"/>
                        <img src={image3} alt="img-3"/>
                    </div>
                    <div>
                        <p className="text-[36px] text-richblack-100 mt-[100px] font-semiBold"><sup>"</sup> We are passionate about revolutionizing the way we learn. Our innovative platform <span className="bg-gradient-to-r from-[#1FA2FF] via-[#12D8FA] to-[#A6FFCB] text-transparent bg-clip-text">combines technology</span>, <span className="bg-gradient-to-r from-[#FF512F] to-[#FF512F] text-transparent bg-clip-text">expertise</span> and community to create an <span className="bg-gradient-to-r from-[#E65C00] to-[#F9D423] text-transparent bg-clip-text">unparalleled educational experience</span>. <sup>"</sup></p>
                    </div>
                </div>
            </div>
            <div className="bg-richblack-900 flex flex-col items-center mt-20 border-t-richblack-700 border">
                <div className="w-11/12 max-w-[1250px] flex flex-col mt-20 items-center">
                    <div className="flex flex-wrap gap-y-20 lg:justify-between md:justify-center sm:justify-center justify-center items-center ">
                        <div className="flex lg:px-10  sm:basis-[80%] lg:basis-[50%] flex-col  gap-y-5">
                            <p className="text-[36px] font-semiBold bg-gradient-to-r from-[#833AB4] via-[#FD1D1D] to-[#FCB045] text-transparent bg-clip-text">Our Founding Story </p>
                            <p className="text-richblack-300 text-[16px]">Our e-learning platform was born out of a shared vision and passion for transforming education. It all began with a group of educators, technologists, and lifelong learners who recognized the need for accessible, flexible, and high-quality learning opportunities in a rapidly evolving digital world.</p>
                            <p className="text-richblack-300 text-[16px]">As experienced educators ourselves, we witnessed firsthand the limitations and challenges of traditional education systems. We believed that education should not be confined to the walls of a classroom or restricted by geographical boundaries. We envisioned a platform that could bridge these gaps and empower individuals from all walks of life to unlock their full potential.</p>

                        </div>
                        <div>
                            <img width="100%" src={image4} alt="image-4" />
                        </div>
                    </div>
                    <div className="flex flex-wrap gap-y-20 lg:justify-between md:justify-center mt-20 py-20 lg:px-10 sm:px-3 md:px-5 sm:justify-center justify-center items-center ">
                        <div className="flex lg:px-10  sm:basis-[70%] lg:basis-[40%] flex-col  gap-y-5">
                            <p className="bg-gradient-to-r from-[#E65C00] to-[#F9D423] text-transparent bg-clip-text text-[36px] font-semiBold">Our Vision</p>
                            <p className="font-bold text-richblack-300 text-[16px]">With this vision in mind, we set out on a journey to create an e-learning platform that would revolutionize the way people learn. Our team of dedicated experts worked tirelessly to develop a robust and intuitive platform that combines cutting-edge technology with engaging content, fostering a dynamic and interactive learning experience.</p>
                        </div>
                        <div className="flex lg:px-10  sm:basis-[70%] lg:basis-[40%] flex-col  gap-y-5">
                            <p className="bg-gradient-to-r from-[#1FA2FF] via-[#12D8FA] to-[#A6FFCB] text-transparent bg-clip-text text-[36px] font-semiBold">Our Mission</p>
                            <p className="font-bold text-richblack-300 text-[16px]" >our mission goes beyond just delivering courses online. We wanted to create a vibrant community of learners, where individuals can connect, collaborate, and learn from one another. We believe that knowledge thrives in an environment of sharing and dialogue, and we foster this spirit of collaboration through forums, live sessions, and networking opportunities.</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="bg-richblack-800 flex flex-col items-center mt-20">
                <div className="w-11/12  max-w-[1250px] flex flex-col items-center">
                    <div className="py-[90px] lg:px-28 md:px-20 sm:px-10 w-full gap-20 flex flex-wrap lg:justify-between md:justify-center sm:justify-center justify-center">
                        <div className="flex flex-col items-center">
                            <h1 className="text-[30px] text-richblack-5 font-semiBold">5K</h1>
                            <p className="text-richblack-500 text-[16px]">Active Students</p>
                        </div>
                        <div>
                            <h1 className="text-[30px] text-richblack-5 font-semiBold">10+</h1>
                            <p className="text-richblack-500 text-[16px]">Mentors</p>
                        </div>
                        <div>
                            <h1 className="text-[30px] text-richblack-5 font-semiBold">200+</h1>
                            <p className="text-richblack-500 text-[16px]">Courses</p>
                        </div>
                        <div>
                            <h1 className="text-[30px] text-richblack-5 font-semiBold">50+</h1>
                            <p className="text-richblack-500 text-[16px]">Awards</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="bg-richblack-900 text-richblack-5 flex flex-col items-center mt-20">
                <div className="w-11/12  max-w-[1250px] flex flex-col items-center mb-20">
                    <div className="w-full flex flex-wrap lg:justify-between md:justify-center sm:justify-center justify-center gap-10">
                        <div className="flex flex-col lg:w-[45%] md:w-[90%] sm:w-[90%]">
                            <p className="text-[36px] font-semiBold ">World-Class Learning for <HighlightText text={"Anyone, Anywhere"}/></p>
                            <p className="text-richblack-300 text-[16px] mt-5 mb-10">Studynotion partners with more than 275+ leading universities and companies to bring flexible, affordable, job-relevant online learning to individuals and organizations worldwide.</p>
                            <div className="flex">
                                <CTAbutton active={true} link={"/signup"}>Learn More</CTAbutton>
                            </div>
                            
                        </div>
                        <div className=" flex flex-wrap lg:gap-0 md:gap-10 sm:gap-10 justify-center">
                            <div className="w-[295px] h-[295px]  p-10 bg-richblack-700">
                                <div className="text-[18px]">
                                    Curriculum Based on Industry Needs
                                </div>
                                <div className="text-[14px] mt-10 text-richblack-300">
                                    Save time and money! The Belajar curriculum is made to be easier to understand and in line with industry needs.
                                </div>
                            </div>
                            <div className="w-[295px] h-[295px]  p-10 bg-richblack-800">
                                <div className="text-[18px]">
                                Our Learning Methods
                                </div>
                                <div className="text-[14px] mt-10 text-richblack-300">
                                The learning process uses the namely online and offline.
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="w-full flex flex-wrap lg:justify-end md:justify-center sm:justify-center justify-center lg:mt-0 md:mt-10 sm:mt-10 gap-y-10 lg:gap-0 md:gap-10 sm:gap-10">
                        <div className="w-[295px] h-[295px]  p-10 bg-richblack-700">
                            <div className="text-[18px]">
                                Certification
                            </div>
                            <div className="text-[14px] mt-10 text-richblack-300">
                                You will get a certificate that can be used as a certification during job hunting.
                            </div>
                        </div>
                        <div className="w-[295px] h-[295px]  p-10 bg-richblack-800">
                            <div className="text-[18px]">
                                Rating "Auto-grading"
                            </div>
                            <div className="text-[14px] mt-10 text-richblack-300">
                                You will immediately get feedback during the learning process without having to wait for an answer or response from the mentor.
                            </div>
                        </div>
                        <div className="w-[295px] h-[295px]  p-10 bg-richblack-700">
                            <div className="text-[18px]">
                                Ready to Work
                            </div>
                            <div className="text-[14px] mt-10 text-richblack-300">
                                Connected with over 150+ hiring partners, you will have the opportunity to find a job after graduating from our program.
                            </div>
                        </div>
                    </div>

                    {/* Contact us Form */}
                    <div className="text-[36px] mt-[150px] text-richblack-5 font-semiBold text-center">
                        Get in Touch
                    </div>
                    <p className="text-[16px] mb-8 text-richblack-300 text-center">
                        We’d love to here for you, Please fill out this form.
                    </p>
                    <ContactForm/>
                </div>
            </div>
            <Footer/>
        </div>
    )
}

export default About;