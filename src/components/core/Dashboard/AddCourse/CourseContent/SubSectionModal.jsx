import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { createSubSectionAPI, updateSubSectionAPI } from "../../../../../Services/Operations/authApi";
import { RxCross2 } from "react-icons/rx";
import {TbCloudUpload} from "react-icons/tb";
import Upload from "./Upload";


function SubSectionModal({modalData, setModalData, view=false, edit= false, create=false}){

    const {
        handleSubmit,
        setValue,
        getValues,
        register,
        formState : {errors},
    } = useForm();

    let dispatch = useDispatch();
    let navigate = useNavigate();
    const {course} = useSelector((state)=>state.course);
    const [videoFile, setVidoeFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const {token} = useSelector((state)=>state.auth);
    const [video , setVideo] = useState(null);

    useEffect(()=>{
        if (view || edit)
        {
            setValue("name", modalData.title)
            setValue("description",modalData.description)
            setVideo(modalData.videoUrl)
        }
    }, [view, edit, modalData])

    function isFormChanged(){
        const currentData = getValues()
        if(
            currentData.name !== modalData.title ||
            currentData.description !== modalData.description ||
            modalData.videoUrl !== video
        )
        {
            // Changes were made
            return true;
        }
        else
        {
            toast.error("No Changes Saved");
            setModalData(null)
            return false;
        }
    }

    function handleEditSubmit(data){
    
        const formData = new FormData();
        
        formData.append("sectionId", modalData.sectionId);
        formData.append("subSectionId", modalData._id);
        formData.append("token", token);
        formData.append("courseId", course._id);
        formData.append("title", data.name);
        formData.append("description", data.description);
        if(modalData.videoUrl !== video)
        {
            formData.append("video", videoFile);
        }
        //api call
        setLoading(true)
        
        const apiCall = dispatch(updateSubSectionAPI(formData, navigate));
        toast.promise(apiCall, {
            loading: "Saving Changes",
            success: (message) => message,
            error: (errorMessage) => errorMessage?.message || "An error occurred",
          });
        setLoading(false);
        setModalData(null);
    }

    function changeHandler(event){
        const file = event.target.files[0];
        setVideo(URL.createObjectURL(file));
        setVidoeFile(file)
    }

    async function onSubmit(data){

        if(!data.name || !data.description || !video)
        {
            toast.error("All Field Required");
            return
        }

        if(view)
        {
            return
        }
        if(edit)
        {
            if(!isFormChanged())
            {
                return
            }
            handleEditSubmit(data);
            return;
        }
  
        const formData = new FormData();
    
        formData.append("sectionId", modalData._id)
        formData.append("name", data.name);
        formData.append("description", data.description);
        formData.append("video", videoFile);
        formData.append("token", token)
        formData.append("courseId", course._id)
        
        setLoading(true)
        // api call

        const apiCall = dispatch(createSubSectionAPI(formData, navigate));
        await toast.promise(apiCall, {
            loading: "Creating Sub Section",
            success: (message) => message,
            error: (errorMessage) => errorMessage?.message || "An error occurred",
          });
        setLoading(false);
        setModalData(null);
    }    
  

    function clearVideo() {
        setVideo(null);
        document.getElementById("video").value = ""; 
    }

    return(
        <div className="fixed top-0 left-0 w-screen h-screen flex justify-center items-center z-50 backdrop-blur-md bg-transparent">
            <div className="border border-richblack-600 bg-richblack-700 w-[700px] subSectionModal rounded-lg">
                <div className="flex justify-between py-3 rounded-lg px-2 text-[20px] font-kamBold">
                    <p>{view? "View Lecture" : edit?  "Editing Lecture" : create?  "Create New Lecture" : ""}</p>
                    <RxCross2
                        onClick={()=>setModalData(null)}
                        className="cursor-pointer"
                    />
                </div>
                <div>
                    <form onSubmit={handleSubmit(onSubmit)} className="p-2 mt-0 pt-5 flex flex-col gap-3 bg-richblack-800 px-8">

                        <Upload 
                        changeHandler={changeHandler}
                        clearVideo={clearVideo}
                        video={video}
                        label={"Lecture Video"}
                        />

                        <div>
                            <label>
                            <p className="text-richblack-5 mt-3 text-[16px]">
                                Lecture Title <sup className="text-[#FF0000]">*</sup>
                            </p>
                                <input
                                className="text-richblack-5 border-b border-richblack-300 bg-richblack-700 rounded-md outline-none mt-2 p-2 text-[18px] pl-3 w-full"
                                name="name"
                                type="text"
                                placeholder="Enter Lecture Title"
                                {...register("name", {required:true})}
                                />
                                {errors.name && <span className="text-red-500">Please Enter Lecture Title</span>}
                            </label>
                        </div>
                        <div>
                            <label>
                            <p className="text-richblack-5 mt-3 text-[16px]">
                                Lecture Description <sup className="text-[#FF0000]">*</sup>
                            </p>
                                <textarea
                                className="text-richblack-5 border-b border-richblack-300 bg-richblack-700 rounded-md outline-none mt-2 p-2 text-[18px] pl-3 w-full"
                                name="description"
                                rows={5}
                                placeholder="Enter Lecture Description"
                                {...register("description", {required:true})}
                                />
                                {errors.description && <span className="text-red-500">Please Enter Lecture Description</span>}
                            </label>
                        </div>
                        { !view &&
                            <div className="flex gap-5 justify-end">
                                <button className="py-2 px-4 bg-richblack-500 rounded-lg " onClick={()=>setModalData(null)}>
                                    {
                                        !view && ("Cancel")
                                    }
                                </button>
                                <button type="submit" className="px-5 py-2 bg-yellow-50 rounded-lg font-kamBold text-richblack-900">
                                    {
                                        create? ("Save") : edit ? ("Save Changes") : ""
                                    }
                                </button>
                            </div>
                        }

                    </form>
                </div>
            </div>
        </div>
        
    )
}

export default SubSectionModal;