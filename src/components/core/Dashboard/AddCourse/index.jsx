import { useSelector } from "react-redux"
import RenderSteps from "./RenderSteps"

export default function AddCourse(){

    const {step, editCourse} = useSelector((state)=>state.course);

    return(
        < div className="w-full relative items-center flex flex-col">
            <div className="text-richblack-5 lg:p-10 md:p-5 sm:p-2  w-11/12 max-w-[1250px] flex-wrap flex">
                <div className="text-[30px] ml-10 text-richblack-5 font-kamBold">
                       {editCourse? ("Edit Course"):("Add Course")}
                </div>
                <div className="flex flex-wrap gap-5 w-full  justify-center">
                    <div className="flex lg:w-[65%] w-full flex-col">
                        <div className="flex w-full flex-col">
                            <RenderSteps/>
                        </div>
                    </div>
                    { step === 1 ? (
                    <div className="flex flex-col w-[350px] items-center relative"> 
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