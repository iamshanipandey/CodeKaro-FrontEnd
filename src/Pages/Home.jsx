import React from "react";
import { Link } from "react-router-dom";
import { BiRightArrowAlt } from "react-icons/bi";
import HighlightText from "../components/core/HomePage/HighlightText"
import CTAbutton from "../components/core/HomePage/Button";
import Banner from "../assests/Home/Banner.mp4"
import CodeBlock from "../components/core/HomePage/CodeBlock.jsx";
import QualitySection from "../components/core/HomePage/QualitySection.jsx";
import CompareSection from "../components/core/HomePage/CompareSection.jsx";
import instructorImage from "../assests/Home/Frame 51 (1).png"
import ExploreMore from "../components/core/HomePage/ExploreMore.jsx";
import Footer from "../components/core/HomePage/Footer.jsx";


function Home(){
    return(
        <div>
            
            {/* *********************************************************************************************************************
                                                        Section 1
            ********************************************************************************************************************* */}

            <div className="relative mx-auto flex flex-col w-11/12 max-w-[1250px] mt-5 items-center text-white
                            justify-between ">
                
                <Link to={"/signup"}>
                
                    <div className="mx-auto border-b-[1px] flex flex-row text-[16px] items-center rounded-full bg-richblack-800 font-bold px-10 py-[10px] 
                                   gap-x-2 mt-16 text-richblack-200 transition-all duration-200 hover:scale-95 w-fit ">
                        <p>Become an Instructor</p>
                        <BiRightArrowAlt className="text-[20px]" />
                    </div>
                
                </Link>

           
                
                <div className="text-[36px] font-semiBold text-center mt-5">
                    Empower Your Future With 
                    <HighlightText text={"Coding Skills"}/>
                </div>
                <div className="text-center font-semiBold text-lg text-richblack-300">
                    With our online coding courses, you can learn at your own pace, from anywhere in the world, and get access to a wealth of resources, including hands-on projects, quizzes, and personalized feedback from instructors. 
                </div>
                <div className="flex flex-row gap-x-3 mt-10">
                    <CTAbutton active={true} link={"/signup"}>
                        Learn More
                    </CTAbutton>
                    <CTAbutton active={false} link={"/login"}>
                        Book a Demo
                    </CTAbutton>
                </div>
                                  
                <video className="w-11/12 flex flex-col items-center  z-10 max-w-[1250px] mt-16 shadow-[20px_20px_0px_#FFFFFF]"
                    autoPlay
                    loop
                    muted>
                    <source src={Banner} />
                </video>
           
            {/* CodeBlock-1 */}
                <div className="mt-20 items-center text-cen">
                      <CodeBlock
                        position={"lg:flex-row"}
                        heading={
                            <div>
                                Unlock Your
                                <HighlightText text={"Coding Potential "}/>
                                with our online courses
                            </div>
                        }
                        subHeading = {
                            "Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you." 
                        }
                        codeColor={
                            "text-yellow-25"
                        }
                        codeBlock={
                            `<!DOCTYPE html>\n<html>\nhead><title>Example</\ntitle><linkrel="stylesheet"href="styles.css">\n/head>\nbody>\nh1><ahref="/">Header</a>\n/h1>\nnav><ahref="one/">One</a><ahref="two/">Two</\na><ahref="three/">Three</a>\n/nav>`
                        }
                        ctabtn1={
                            {
                                btnText: "Try it Yourself",
                                linkTo: "/signup",
                                active: true
                            }
                        }
                        ctabtn2={
                            {
                                btnText: "Learn More",
                                linkTo: "/login",
                                active: false
                            }
                        }
                        gradient={`bg-custom-gradient-1`}
                        
                        
                      />  
                </div>

            {/* CodeBlock-2 */}
                <div className="">
                      <CodeBlock
                        position={"lg:flex-row-reverse"}
                        heading={
                            <div>
                                Start
                                <HighlightText text={"Coding in Seconds "}/>
                            </div>
                        }
                        subHeading = {
                            "Go ahead, give it a try. Our hands-on learning environment means you'll be writing real code from your very first lesson." 
                        }
                        codeColor={
                            "text-pink-25"
                        }
                        gradient={
                            "bg-custom-gradient-2"
                        }
                        codeBlock={
                            `<!DOCTYPE html>\n<html>\nhead><title>Example</\ntitle><linkrel="stylesheet"href="styles.css">\n/head>\nbody>\nh1><ahref="/">Header</a>\n/h1>\nnav><ahref="one/">One</a><ahref="two/">Two</\na><ahref="three/">Three</a>\n/nav>`
                        }
                        ctabtn1={
                            {
                                btnText: "Continue Lesson",
                                linkTo: "/login",
                                active: true
                            }
                        }
                        ctabtn2={
                            {
                                btnText: "Learn More",
                                linkTo: "/signup",
                                active: false
                            }
                        }
                        
                        
                      />  
                      
                </div>
                <ExploreMore/>              
            </div>

            {/* Section 2 */}

            <div className="bg-pure-greys-5 -mt-40 text-richblack-700">
                <div className="homepage_bg h-[310px]">
                    <div className="w-11/12 max-w-[1260px] flex items-center mx-auto gap-5">
                        <div className="h-[450px]"></div>
                        <div className=" section-2-1-CTAbutton flex gap-x-7 mx-auto">
                            <CTAbutton active={true} linkTo={"./signup"}>
                                <div className="flex gap-x-3 items-center" >
                                    Expolore Full Catalog
                                    <BiRightArrowAlt/>
                                </div>
                            </CTAbutton>
                            <CTAbutton active={false} linkTo={"./login"}>
                                <div className="flex gap-x-3 items-center" >
                                    Learn More
                                </div>
                            </CTAbutton>
                        </div>


                    </div>

                </div>

                <div className="w-11/12  max-w-[1250px] flex items-center mx-auto flex-col justify-between gap-7">
                    <div className="flex section-2-2 flex-row  w-[100%] mt-[95px] mb-12">
                        <div>
                            <div className="text-[36px] font-semiBold">
                            Get the skills you need for a
                            <HighlightText text={"job that is in demand."}/>
                            </div>
                        </div>
                        <div className="flex flex-col items-start">
                            <div className="text-richblack-500 font-semiBold text-[16px] mb-12">
                                The modern CodeKaro is the dictates its own terms. Today, to be a competitive specialist requires more than professional skills.
                            </div>
                            <div>
                                <CTAbutton active={true} linkTo={"./signup"}>
                                    Learn More
                                </CTAbutton>
                            </div>
                        </div>
                    </div>

                </div>

                <QualitySection/>
                <CompareSection/>
            </div>
            
            {/* Section 3 */}
            <div className="bg-richblack-900 text-richblack-5 py-20">
                <div className="w-11/12 max-w-[1250px] BecomeInstructor flex flex-row items-center justify-between mx-auto">
                    <div>
                        <img src={instructorImage} alt="" />
                    </div>
                    <div className="max-w-[500px]">
                        <div>
                            <div className="text-[36px] font-semiBold">
                                Become and <br/> <HighlightText text={"instructor"}/>
                            </div>
                            <div className="text-[16px] text-richblack-300 font-semiBold">
                                Instructors from around the world teach millions of students on StudyNotion. We provide the tools and skills to teach what you love.
                            </div>
                            <div className="flex mt-16 ">
                                <CTAbutton active={true} linkTo={"./signup"}>
                                    <div className="flex gap-x-2 items-center">
                                        Start Teaching Today
                                        <BiRightArrowAlt/>
                                    </div>

                                </CTAbutton>
                            </div>
                        </div>
                        
                    </div>

                </div>
                
            </div>
            <Footer/>
        </div>
    );
}

export default Home;