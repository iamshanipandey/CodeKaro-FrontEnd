import {React} from "react";
import {TbCloudUpload} from "react-icons/tb";

function Upload({video, changeHandler, clearVideo, label}){
    return(
        <div className="w-full">
            <p className="text-richblack-5 mt-3 text-[16px]">
                {label} <sup className="text-[#FF0000]">*</sup>
            </p>
            <div className="border border-dashed p-8 mt-2 rounded-lg items-center flex flex-col">
                {
                    video? (<img src={video} alt="img" className="rounded-lg object-cover"/>) : 
                    (
                        <label htmlFor="video"> 
                            <div className="flex flex-col items-center gap-3">
                                <div className="w-[52px] h-[52px] bg-richblack-100 flex items-center justify-center text-richblack-900 rounded-full">   
                                    <TbCloudUpload className="text-[42px]"/>
                                </div>
                                <p>Drag and drop an image, or <span>Browse</span></p>
                                <div className="mt-3 flex gap-5 flex-wrap">
                                    <p>• Aspect ratio 16:9</p>
                                    <p>• Recommended size 1024x576</p>
                                </div>
                            </div>
                        </label>
                    )
                }
                                        
                <input
                    type="file"
                    id="video"
                    style={{display:"none"}}
                    onChange={changeHandler}
                />
               { video && 
                    <div className="underline mt-2" onClick={()=>clearVideo()}>
                        Clear
                    </div>  
                }                     
            </div>
        </div>
    )
}

export default Upload;