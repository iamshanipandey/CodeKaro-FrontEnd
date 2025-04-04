import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RxDropdownMenu } from "react-icons/rx";
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { deleteSectionAPI, deleteSubSectionAPI } from "../../../../../Services/Operations/authApi";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { FaCaretDown, FaPlus } from "react-icons/fa";
import SubSectionModal from "./SubSectionModal";
import ConfirmationModal from "../../../Common/ConfirmationModal";


function NestedView({handelEditSectionName}){

    const {course} = useSelector((state)=>state.course);
    const [modalData, setModalData] = useState(null);
    const [editModalData, setEditModalData] = useState(null);
    const [createModalData, setCreateModalData] = useState(null);
    const [viewModalData, setViewModalData] = useState(null);
    const {token} = useSelector((state)=>state.auth);
    let navigate = useNavigate();
    let dispatch = useDispatch();

    function deleteSection(sectionId)
    {
        const formData = new FormData();
        formData.append("sectionId", sectionId);
        formData.append("token", token);
        formData.append("courseId", course._id)
        const apiCall = dispatch(deleteSectionAPI(formData, navigate))
        toast.promise(apiCall, {
            loading: "Deleting Section",
            success: (message) => message,
            error: (errorMessage) => errorMessage,
          });
        setModalData(null)
    }

    async function deleteSubSection(subSectionId)
    {

        const apiCall = dispatch(deleteSubSectionAPI(subSectionId, token, course._id, navigate))
        toast.promise(
            apiCall,
            {
              loading: "Wait a moment",
              success: (message)=>message,
              error: (errorMessage)=>errorMessage,
            }
        )
        setModalData(null)
    }

    return(
        <div className="border-2 border-richblack-600 w-full p-3 pt-0 pb-5 rounded-lg bg-richblack-700 mt-10">
            <div>
                    {
                        course?.courseContent.map((section, index)=>(  
                            <details open key={index}>
                            <summary className="flex justify-between gap-2 px-2 select-none border-b border-richblack-500 pb-2 mt-3" >
                                <div className="flex items-center gap-2">
                                    <RxDropdownMenu className="text-[24px] cursor-pointer text-richblack-300"/>
                                    <div key={index} className="cursor-pointer text-richblack-25">
                                        {section?.sectionName}
                                    </div>
                                </div>
                                <div className="flex gap-2 text-[22px] items-center text-richblack-300">
                                    <MdEdit className="cursor-pointer"
                                        onClick={()=>handelEditSectionName(section._id, section.sectionName)}/>
                                    <MdDelete className="cursor-pointer"
                                    onClick={()=>setModalData({
                                        text1: "Are You Sure",
                                        text2: "You Video Will be Permanently Deleted",
                                        btn1Text: "Delete",
                                        btn2Text: "Cancel",
                                        btn1Handler: ()=>deleteSection(section._id),
                                        btn2Handler: ()=>setModalData(null)
                                    })}/>
                                    <span className="text-richblack-600 select-none"> | </span>
                                    <FaCaretDown className="cursor-pointer"/>
                                </div>
                            </summary>
                                <div className="ml-[5%] mt-3 select-none">
                                    {
                                        section?.subSection?.map((subSection, index)=>(
                                            <div className="flex justify-between gap-2 mt-2 px-2 text-richblack-300" key={index}>
                                                <div className="flex gap-2">
                                                    <RxDropdownMenu className="text-[24px] cursor-pointer"/>
                                                    <p className="text-richblack-25 cursor-pointer select-none"
                                                        onClick={()=>setViewModalData(subSection)}
                                                    >{subSection?.title}</p>
                                                </div>
                                                <div className="flex gap-2 text-[22px]">
                                                    <MdEdit className="cursor-pointer"
                                                        onClick={()=>setEditModalData({...subSection, sectionId:section._id})}
                                                        />
                                                    <MdDelete className="cursor-pointer"
                                                        onClick={()=>setModalData({
                                                            text1: "Are You Sure",
                                                            text2: "You Video Will be Permanently Deleted",
                                                            btn1Text: "Delete",
                                                            btn2Text: "Cancel",
                                                            btn1Handler: ()=>deleteSubSection(subSection._id),
                                                            btn2Handler: ()=>setModalData(null),
                                                        })}
                                                    />
                                                </div>
                                            </div>
                                        ))
                                    }
                                </div>
                                <div className="cursor-pointer flex gap-1 text-yellow-50 font-kamBold mt-3 ml-2 items-center"
                                    onClick={()=>setCreateModalData(section)}   
                                    >
                                    <FaPlus/>
                                    <p>Add Lecture</p>
                                </div>
                            </details>
                        ))
                       
                    }
            </div>
            {
                viewModalData? (<SubSectionModal
                                modalData={viewModalData}
                                setModalData={setViewModalData}
                                view = {true}
                                />)
                :editModalData? (<SubSectionModal
                                modalData={editModalData}
                                setModalData={setEditModalData}
                                edit = {true}
                                />)
                :createModalData? (<SubSectionModal
                                modalData={createModalData}
                                setModalData={setCreateModalData}
                                create = {true}
                                />)
                :(<div></div>)
            }
            {
                modalData? (<ConfirmationModal modalData={modalData}/>) : (<div></div>)
            }
        </div>
    )
}

export default NestedView;