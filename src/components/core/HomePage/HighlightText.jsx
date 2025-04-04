import React from "react";

function HighlightText({text}){
    return(
        <span className="font-semiBold text-[36px] bg-gradient-to-r from-[#1FA2FF] via-[#12D8FA] to-[#A6FFCB] 
                            text-transparent bg-clip-text">
         {" "}   {text}
        </span>
    )
}


export default HighlightText;