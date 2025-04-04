import React from "react";
import { Link } from "react-router-dom";

function button({children , active, link} ){
    return(
        <div className={`CTAbutton cursor-pointer rounded-md py-[12px] px-[24px] mr-4 font-semiBold transition-all duration-200 hover:scale-95 border-white border-b-[1px] border-r-[1px]
            ${active? "bg-yellow-50 text-richblack-900":"bg-richblue-900 text-richblack-100"}`}>

            <Link to={link}>
                {children}
            </Link>

        </div>
        
    )

}

export default button;