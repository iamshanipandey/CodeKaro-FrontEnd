import React from "react";
import Button from "./Button";
import { BiRightArrowAlt } from "react-icons/bi";
import {TypeAnimation} from "react-type-animation";

function CodeBlock({position, heading, subHeading, codeColor, codeBlock, ctabtn1, ctabtn2, gradient }) {
    
    
    
    return (
        <div className={` codeBlock flex ${position} my-20 gap-10 justify-between `}>
            {/* Section 1 */}
            <div className=" codeBlockSection-1 w-[50%] flex flex-col gap-8">
                <div className="text-[35px]">
                    {heading}
                </div>
                <div className="text-[16px] font-semiBold text-richblack-300 ">
                    {subHeading}
                </div>
                <div className="flex gap-7 mt-7 ">
                    <div>
                        <Button link={ctabtn1.linkTo} active={ctabtn1.active}>
                           <div className="flex items-center gap-x-1">
                                {ctabtn1.btnText}
                                {<BiRightArrowAlt/>}
                           </div>                         
                        </Button>

                    </div>
                    <div>
                        <Button link={ctabtn2.linkTo} active={ctabtn2.active}>
                            <div className="flex items-center gap-x-1">
                                {ctabtn2.btnText}
                           </div>
                        </Button>
                    </div>
                    
                </div>
            </div>
            
           
            {/* Second Block */}
            <div className="codeBlockSection-2 mainFram w-full">
                
                <div className="elips-cover"></div>
                <div className={`elips ${gradient}`}></div>
                

                <div className=" p-[4px]  text-center  z-20 text-richblack-400  font-bold">
                    <div>1</div>
                    <div>2</div>
                    <div>3</div>
                    <div>4</div>
                    <div>5</div>
                    <div>6</div>
                    <div>7</div>
                    <div>8</div>
                    <div>9</div>
                    <div>10</div>
                    <div>11</div>
                </div>
                <div className={`w-[500px] m-1 z-20 font-ultraBold font-mono   whitespace-pre-wrap ${codeColor} `}>
                <TypeAnimation
                    sequence={[codeBlock, 1000, ""]}
                    repeat={Infinity}
                    cursor={true}
                    omitDeletionAnimation = {true}
                />
                </div>

            </div>
            
        </div>
    );
}

export default CodeBlock;



