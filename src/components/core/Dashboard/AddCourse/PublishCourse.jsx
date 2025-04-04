import React from "react"
import { useForm } from "react-hook-form";
import { setResetCourse, setStep } from "../../../../Slices/courseReducer";
import { useDispatch, useSelector } from "react-redux";
import IconBtn from "../../Common/IconBtn";
import { COURSE_STATUS } from "../../../../Utils/contraints";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { publishCourseAPI } from "../../../../Services/Operations/authApi";

function PublishCourse(){

    const {
        register, 
        setValue,
        getValues,
        handleSubmit,
    } = useForm();
    let dispatch = useDispatch();
    const {course} = useSelector((state)=>state.course);
    const {token} = useSelector((state)=>state.auth);
    let navigate = useNavigate();

    function goToCourses(){
        navigate("/dashboard/my-courses")
        dispatch(setResetCourse())
        return
    }

    async function onSubmit(data){

        if(course?.status === "Draft" && !getValues("public") || course?.status === "Publish" && getValues("public"))
        {
            goToCourses();
            toast.success("Saved");
            return;
        }
        const formData = new FormData();
        formData.append("courseId", course._id)
        formData.append("status", data.public? (COURSE_STATUS.PUBLISH):(COURSE_STATUS.DRAFT))
        formData.append("token", token);
        const apiCall = dispatch(publishCourseAPI(formData, navigate))
        await toast.promise(
            apiCall,
            {
              loading: "Saving",
              success: (message)=>message,
              error: (errorMessage)=>errorMessage,
            }
        )
        goToCourses();
    }

    return(
        <div>   
            <form onSubmit={handleSubmit(onSubmit)}>
                <label className="flex flex-col gap-5 border-2 border-richblack-700 bg-richblack-800 rounded-lg p-5 my-5">
                    <p className="text-[24px] font-kamBold">Publish Setting</p>
                    <div className="flex gap-2 items-center">
                        <input
                        type="checkbox"
                        className="w-[16px] cursor-pointer h-[16px] rounded-xl"
                        {...register("public")}
                        />
                        <p className="text-richblack-200 text-[15px] font-kamBold">Make this Course Public</p>
                    </div>
                </label>
                <div className="flex gap-5 justify-end">
                    <button onClick={()=>{dispatch(setStep(2))}} className="px-5 py-2 bg-richblack-700 text-richblack-25 rounded-lg">
                        Back
                    </button>
                    <IconBtn
                    type={"submit"}
                    onClick={()=>PublishCourse}
                    customCss={"px-5 py-2 rounded-lg bg-yellow-50 text-richblack-900 font-kamBold"}>
                        Save
                    </IconBtn>
                </div>
            </form>
        </div>
    )
}

export default PublishCourse;