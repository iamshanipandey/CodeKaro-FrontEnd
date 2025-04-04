import React from "react";
import HighlightText from "./HighlightText";
import image1 from "../../../assests/Home/Frame 55.png"
import image2 from "../../../assests/Home/Frame 57.png"
import image3 from "../../../assests/Home/Frame 74.png"
import CTAbutton from "./Button";

function CompareSection() {
    return (
        <div className="w-11/12 max-w-[1250px] pb-20 mt-16 mx-auto items-center flex CompareSection flex-col">
            <div className="items-center flex flex-col ">
                <div className="text-[36px] font-semiBold text-richblack-800">
                    Your swiss knife for {<HighlightText text={"learning any language"}/>}
                </div>
                <div className="text-[16px] CompareSectionSubHeading text-richblack-700 text-center w-[70%]">
                    "Using spin making learning multiple languages easy. with 20+ languages realistic voice-over, progress tracking, custom schedule and more."
                </div>
            </div>
            <div className="flex CompareSectionCards flex-row mt-5">
                <div className="translate-x-[25%] CompareSectionCard mt-10 z-0">
                    <img src={image1} alt="" />
                </div>
                <div className="z-10">
                    <img src={image3} alt="" />
                </div>
                <div className="translate-x-[-28%] CompareSectionCard z-20">
                    <img src={image2} alt="" />
                </div>

            </div>
            <div>
                <CTAbutton active={true} linkTo={"/signup"}>
                    {"Learn More"}
                </CTAbutton>
            </div>

        </div>
    )
}

export default CompareSection;