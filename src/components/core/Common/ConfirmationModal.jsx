import React from "react";
import IconBtn from "./IconBtn";

function ConfirmationModal({modalData}){
    return(
        <div className={`fixed top-0 left-0 w-screen h-screen flex justify-center items-center z-50 backdrop-blur-md bg-transparent`}>
            <div className="sm:w-[350px] lg:w-[400px] md:w-[400px] border-2 rounded-xl py-8 border-richblack-700 bg-richblack-900 p-5 items-center flex flex-col">
                <p className="text-richblack-5 text-[18px] font-kamBold">{modalData.text1} ?</p>

                <p className="text-richblack-100">{modalData.text2}</p>

                <div className="mt-5 flex w-full gap-5 justify-center">
                    <IconBtn
                        onClick={modalData?.btn1Handler}
                        text={modalData.btn1Text}
                        customCss={"bg-yellow-50 px-6 flex py-2 text-richblack-900 font-kamBold rounded-lg"}
                    />
                    <IconBtn
                        onClick={modalData?.btn2Handler}
                        text={modalData.btn2Text}
                        customCss={"bg-richblack-700 border border-richblack-500 px-6 flex py-2 text-richblack-100 font-kamBold rounded-lg"}
                    />
                </div>
            </div>            
        </div>
    )
}

export default ConfirmationModal;