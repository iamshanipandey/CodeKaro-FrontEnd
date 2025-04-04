import React, { useState } from "react";
import { useForm } from "react-hook-form";
import IconBtn from "../../../Common/IconBtn";
import { MdAddCircleOutline } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import NestedView from "./NestedView";
import { setStep } from "../../../../../Slices/courseReducer";
import { createSectionAPI, updateSectionAPI } from "../../../../../Services/Operations/authApi";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { IoIosArrowForward } from "react-icons/io";



function CreateCourseConent(){

    const {
        register,
        handleSubmit,
        setValue,
        formState : {error},
    } = useForm();
    const [editSection, setEditSection] = useState(null);
    const {course} = useSelector((state)=>state.course);
    const {token} = useSelector((state)=>state.auth);
    let dispatch = useDispatch();
    let navigate = useNavigate();

    function goNext(){
        dispatch(setStep(3))
    }

    const onSectionSubmit = async(data)=>{
        if(editSection)
        {
            const formData = new FormData();
            formData.append("sectionId",editSection)
            formData.append("token", token)
            formData.append("sectionName", data?.sectionName);
            formData.append("courseId", course._id);
            const apiCall = dispatch(updateSectionAPI(formData, navigate));
            toast.promise(apiCall, {
                loading: "Saving Changes",
                success: (message) => message,
                error: (errorMessage) => errorMessage,
              });
            setEditSection(null);
            setValue("sectionName" , "")
        }
        if(!editSection)
        {
            const formData = new FormData();
            console.log(course);
            formData.append("courseId",course._id)
            formData.append("token", token)
            formData.append("sectionName", data?.sectionName);
            const apiCall = dispatch(createSectionAPI(formData, navigate));
            toast.promise(apiCall, {
                loading: "Creating Section",
                success: (message) => message,
                error: (errorMessage) => errorMessage,
              });
            setValue("sectionName", "");
        }
    }

    function handelEditSectionName(sectionId, sectionName){
        setEditSection(sectionId)
        setValue("sectionName", sectionName)
    }

    return(
        <div className="flex w-full sm:p-1 md:p-8 lg:p-12">
            <div className="bg-richblack-800 border border-richblack-600 flex flex-col gap-4 rounded-lg w-full max-w-3xl p-6">
                <div>
                    <p>Course Builder</p>
                </div>
                <form className="flex w-full flex-col gap-5" onSubmit={handleSubmit(onSectionSubmit)}>
                    <div>
                        <label>
                            <input
                            className="text-richblack-5 border-b border-richblack-300 bg-richblack-700 rounded-md outline-none mt-2 p-2 text-[18px] pl-3 w-full"
                            type="text"
                            id="sectionName"
                            placeholder="Add a section to build your course"
                            {...register("sectionName", {required:true, message: "Please enter section name"})}
                            />
                        </label>
                        {error && <p>Please enter section name</p>}
                    </div>
                    <div className="flex gap-3">
                        <IconBtn
                            type={"submit"}
                            text={editSection? ("Save Changes"): ("Create Section")}
                            outline={true}
                            customCss={"px-3 rounded-lg flex items-center text-[18px] py-2 gap-2 border-2 border-yellow-50 text-yellow-50 bg-richblack-900"}
                        >
                            {!editSection && <MdAddCircleOutline className="text-yellow-50 text-[20px]"/>}
                        </IconBtn>
                        {editSection && 
                            <button 
                            onClick={()=>{setEditSection(null) 
                                            setValue("sectionName","")
                                        }}
                            className="cursor-pointer text-richblack-500 underline text-[14px]">
                                Cancel Edit
                            </button>
                        }
                    </div>
                </form>
                {course?.courseContent?.length > 0 && <NestedView handelEditSectionName={handelEditSectionName}/>}
                <div className="flex justify-end gap-3 mt-5">
                    <button className="px-3 py-2 rounded-lg cursor-pointer bg-richblack-500 text-richblack-100" onClick={()=>{dispatch(setStep(1))}}>
                        Go back
                    </button>
                    <IconBtn
                        text={"Next"} 
                        onClick={goNext}
                        customCss={"px-5 py-2 bg-yellow-50 flex rounded-lg flex items-center font-kamBold text-richblack-900"}
                    >
                        <IoIosArrowForward className="text-richblack-900 text-[18px]"/>
                    </IconBtn>
                </div>
            </div>
        </div>
    )
}

export default CreateCourseConent;