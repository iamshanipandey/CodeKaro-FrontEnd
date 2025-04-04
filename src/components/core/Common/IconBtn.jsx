import React from "react";

function IconBtn({
    text, 
    onClick,
    children,
    disabled,
    outline= false,
    type,
    customCss
}){
    return(
        <button
            type={type}
            onClick={onClick}
            className={customCss}
        >
            {
                children? (
                    <>
                        <span>
                            {text}
                        </span>
                         {children}
                    </>
                )
                :(text)
            }
        </button>
    )
}

export default IconBtn;