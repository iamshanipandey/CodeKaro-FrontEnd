import React from "react";

function Vectors({image, heading, subHeading}){
    return(
        <div className="flex flex-row gap-x-5">
                        <div className="w-[52px] h-[52px] rounded-full bg-white items-center flex justify-center">
                            <img src={image} alt=""/>
                        </div>
                        <div className="flex flex-col">
                            <div className=" text-[18px] text-richblack-800 ">
                                {heading}
                            </div>
                            <div className=" text-[14px] text-richblack-700">
                                {subHeading}
                            </div>
                        </div>
                    </div>
    );
}

export default Vectors;