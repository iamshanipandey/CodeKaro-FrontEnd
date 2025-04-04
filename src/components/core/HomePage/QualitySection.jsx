import React from "react";
import image1 from "../../../assests/Home/Vector.png"
import image2 from "../../../assests/Home/Vector (1).png"
import image3 from "../../../assests/Home/Vector (2).png"
import image4 from "../../../assests/Home/Subtract.png"
import Vectors from "./Vectors";
import lineImage from "../../../assests/Home/Line 3.png"
import secondSectionImage from "../../../assests/Home/Frame 51.png"

function QualitySection(){
    return (
        <div className="bg-pure-greys-5 text-richblack-700 pb-20 font-inter">
            <div className="w-11/12 relative  max-w-[1250px] h-fit flex flex-row flex-wrap gap-y-10 justify-between items-center mx-auto">
                <div className="flex flex-col gap-y-3">
                    <div>
                        <Vectors image={image1} heading={"Leadership"} subHeading={"Fully committed to the success company"}
                        />
                    </div>
                    <div className="ml-6">
                        <img src={lineImage} alt=""/>
                    </div>
                    <div>
                        <Vectors image={image2} heading={"Responsibility"} subHeading={"Students will always be our top priority"}
                        />
                    </div>
                    <div className="ml-6">
                        <img src={lineImage} alt=""/>
                    </div>
                    <div>
                        <Vectors image={image3} heading={"Flexibility"} subHeading={"The ability to switch is an important skills"}
                        />
                    </div>
                    <div className="ml-6">
                        <img src={lineImage} alt=""/>
                    </div>
                    <div>
                        <Vectors image={image4} heading={"Solve the problem"} subHeading={"Code your way to a solution"}
                        />
                    </div>
                </div>
                <div className="absolute QualitySectionCard left-[625px] top-[480px] z-20 w-[511px] h-[128px] p-[42px] 
                                gap-[52px] bg-[#014A32] flex justify-between">
                        <div className="flex text-pure-greys-5 gap-x-5 items-center">
                            <div className="text-[36px] font-semiBold">10</div>
                            <div className="text-[#05A77B] text-[14px] ">YEARS <br/> EXPERIENCES</div>
                        </div>
                        <img className="lineImageQualitySection" src={lineImage} alt="" />
                        <div className="flex text-pure-greys-5 gap-x-5 items-center">
                            <div className="text-[36px] font-semiBold">250</div>
                            <div className="text-[#05A77B] text-[14px] ">TYPES OF <br/>COURSES</div>
                        </div>

                </div>
                <div className="elips-second-section-1 bg-custom-gradient-2"></div>
                <div className="elips-second-section-2 bg-custom-gradient-2"></div>
                <div className=" z-10">   
                    <img className="QualitySectionImage" src={secondSectionImage} alt="" />
                </div>
            </div>
            
        </div>
    )
}

export default QualitySection;