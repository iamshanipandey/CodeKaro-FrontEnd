import React from "react";
import { useSelector } from "react-redux";
import { IoMdCheckmark } from "react-icons/io";
import CreateCourseForm from "./CreateCourseForm";
import CreateCourseConent from "./CourseContent/CreateCourseConent";
import PublishCourse from "./PublishCourse";




function RenderSteps(){

    const {step} = useSelector((state)=>state.course);;
    const steps = [
        {
            id: 1,
            title: "Course Information",
        
        },
        {
            id: 2,
            title: "Course Builder",
        },
        {
            id:3 ,
            title: "Publish",
        }
    ]

    return(
        <div className="flex w-full flex-col gap-10 items-center" >
            <div className="flex relative w-[80%] justify-between pt-10">
                {
                    steps.map((item)=>(
                        <div key={item.id} className="flex items-center flex-col gap-3 ">
                            <div className={`absolute left-[57px] z-1 w-[37%] bottom-[15px] ${step>1? ("text-yellow-50 "):("")}`}><p className="truncate flex ">- - - - - - - - - - - - - - - - - - - - - - - - - - - - - -</p></div>
                            <div className={`absolute right-[52px] z-1  w-[37%] bottom-[15px] ${step>2 ?("text-yellow-50"):("")}`}><p className="truncate flex ">- - - - - - - - - - - - - - - - - - - - - - - - - - - -</p></div>
                            <div  className={`flex border-2 w-[54px] z-10 justify-center items-center h-[54px] rounded-full ${item.id === step? ("bg-yellow-900 border-yellow-50 text-yellow-50")
                                            :("border-richblack-700 bg-richblack-800 text-richblack-300")}`}>
                                            
                                    {
                                        item.id<step? (<IoMdCheckmark className="bg-yellow-50 text-richblack-900 rounded-full w-full h-full p-[10px]" />):(<p className="text-[24px] font-kamBold">{item.id}</p>)

                                    }

                                
                            </div>
                            {/* <div className={` sm:hidden ${item.id === step? ("text-richblack-5 font-kamBold"):("text-richblack-300")}`}>
                                <p>{item.title}</p>
                            </div> */}
                        </div>
                        
                        
                    ))
                }
                
            </div>
            <div className="lg:w-[90%] md:w-[90%] sm:w-full">
                {step === 1 && <CreateCourseForm/>}
                {step === 2 && <CreateCourseConent/>}
                {step === 3 && <PublishCourse/>}
            </div>
           
            
        </div>
    )
}

export default RenderSteps;