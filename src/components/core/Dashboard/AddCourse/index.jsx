import { useSelector } from "react-redux"
import RenderSteps from "./RenderSteps"

export default function AddCourse(){

    const {step, editCourse} = useSelector((state)=>state.course);

    return(
        <div class="w-full relative flex flex-col items-center lg:items-start">
            <div className="text-richblack-5  pt-5 px-3  w-11/12 max-w-[1350px] fullw-class flex-wrap flex">
                <div className="text-[30px] ml-10 text-richblack-5 font-kamBold">
                       {editCourse? ("Edit Course"):("Add Course")}
                </div>
                <div className="flex flex-wrap gap-2 lg:ml-10 justify-center  w-full  lg:justify-between">
                    <div className="flex max-w-[1050px] lg:w-[700px] flex-col">
                        <div className="flex w-full flex-col">
                            <RenderSteps/>
                        </div>
                    </div>
                    { step === 1 ? (
                    <div className="flex flex-col w-[350px] mt-10 items-center relative"> 
                        <div className="w-[350px] border-2 p-6 border-richblack-600 bg-richblack-800 rounded-xl text-[12px] gap-3">
                            <p className="text-[18px]">⚡Course Upload Tips</p>
                            <ul className="flex flex-col mt-4 gap-3 text-richblack-25">
                                <li>• Set the Course Price option or make it free.</li>
                                <li>• Standard size for the course thumbnail is 1024x576.</li>
                                <li>• Video section controls the course overview video.</li>
                                <li>• Course Builder is where you create & organize a course.</li>
                                <li>• Add Topics in the Course Builder section to create lessons, quizzes, and assignments.</li>
                                <li>• Information from the Additional Data section shows up on the course single page.</li>
                                <li>• Make Announcements to notify any important</li>
                                <li>• Notes to all enrolled students at once.</li>
                            </ul>
                        </div>
                    </div>) : (<div></div>)
                    }
                </div>
                
                
                
            </div>
        </div>
    )
}