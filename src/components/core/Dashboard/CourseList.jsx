import React, { useState } from "react";
import { FaCheckCircle } from "react-icons/fa";
import { MdEdit, MdDelete } from "react-icons/md";
import { FaClock } from "react-icons/fa6";
import { setCourse, setEditCourse, setStep } from "../../../Slices/courseReducer";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import ConfirmationModal from "../Common/ConfirmationModal";
import { deleteCourseAPI } from "../../../Services/Operations/authApi";
import toast from "react-hot-toast";

function CourseList({course}){

    const {token} = useSelector((state)=>state.auth);
    let navigate = useNavigate();
    let dispatch = useDispatch();
    const [confirmationModal, setConfirmationModal] = useState(null);

    function courseEdit(){
        console.log(course[0]);
        dispatch(setStep(1));
        dispatch(setEditCourse(true));
        dispatch(setCourse(course));
        dispatch(navigate("/dashboard/add-course"));
    }

    async function deleteCourseHandler(){
        const formData = new FormData();
        formData.append("token", token);
        formData.append("courseId", course._id);
        const apiCall = dispatch(deleteCourseAPI(formData, navigate));
        await toast.promise(
            apiCall,
            {
              loading: "Loading",
              success: (message)=>message,
              error: (errorMessage)=>errorMessage,
            }
        )
        window.location.reload();
        setConfirmationModal(null);
    }

    return(
        <div className="flex justify-between  gap-5 py-5">
            <div className="flex gap-5 pr-14 ">
                <img src={course?.thumbnail} alt="course-img" className="max-w-[300px] max-h-[250px] rounded-xl object-cover" />
                <div className="flex flex-col justify-between">
                    <p className="text-richblack-5 font-kamBold text-[20px]">{course?.courseName}</p>
                    <p className="text-richblack-300 text-[14px]">{course?.courseDescription.slice(0,100)}</p>
                    <p className="text-richblack-25 text-[14px]">Created: March 19, 2025 | 08:25 PM </p>
                    {
                        course.status === "Published" ? 
                        (   <p className="flex gap-[5px] w-fit px-3 text-[14px] mt-2 rounded-full bg-richblack-700 items-center text-yellow-50">
                               <FaCheckCircle/>
                               {course.status}
                            </p>
                        ):
                        (
                            <p className="flex gap-[7px] w-fit px-3 text-[14px] mt-2 rounded-full bg-richblack-700 items-center text-pink-100">
                                <FaClock className="text-pink-50"/>
                                {course.status}
                            </p> 
                        )
                    }
                </div>
            </div>
            <div className="flex items-center gap-10"> 
                <span className="">{"2hour31minuts"}</span>
                <p className="text-[18px]">₹{course.price}</p>
                <div className="flex gap-2 text-[28px]">
                    <MdEdit onClick={()=>courseEdit()} className="cursor-pointer"/>
                    <MdDelete onClick={()=>setConfirmationModal(
                        {
                        text1:"Are You Sure",
                        text2:"You Course will be Permanent Deleted",
                        btn1Text: "Delete",
                        btn2Text: "Cancel",
                        btn1Handler: ()=>deleteCourseHandler(),
                        btn2Handler: ()=>setConfirmationModal(null),
                        }
                    )} className="cursor-pointer"/>
                </div>
            </div>
            {
               confirmationModal && <ConfirmationModal modalData={confirmationModal}/>
            }
        </div>
    )
}

export default CourseList;












































// import React, { useState } from "react";
// import { Table, Thead, Tbody, Tr, Th, Td } from "react-super-responsive-table";
// import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";
// import { FaCheckCircle } from "react-icons/fa";
// import { MdEdit, MdDelete } from "react-icons/md";
// import { FaClock } from "react-icons/fa6";
// import { setCourse, setEditCourse, setStep } from "../../../Slices/courseReducer";
// import { useNavigate } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import ConfirmationModal from "../Common/ConfirmationModal";
// import { deleteCourseAPI } from "../../../Services/Operations/authApi";
// import toast from "react-hot-toast";
// import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css'

// function CourseList({ courses }) {
//   const { token } = useSelector((state) => state.auth);
//   let navigate = useNavigate();
//   let dispatch = useDispatch();
//   const [confirmationModal, setConfirmationModal] = useState(null);

//   // Handlers
//   function courseEdit(course) {
//     dispatch(setStep(1));
//     dispatch(setEditCourse(true));
//     dispatch(setCourse(course));
//     dispatch(navigate("/dashboard/add-course"));
//   }

//   async function deleteCourseHandler(courseId) {
//     const formData = new FormData();
//     formData.append("token", token);
//     formData.append("courseId", courseId);
//     const apiCall = dispatch(deleteCourseAPI(formData, navigate));
//     await toast.promise(apiCall, {
//       loading: "Deleting...",
//       success: "Course deleted successfully!",
//       error: "Failed to delete course",
//     });
//     window.location.reload();
//     setConfirmationModal(null);
//   }

//   return (
//     <div className="overflow-x-auto">
//       <Table className="table-auto min-w-full text-left">
//         <Thead className=" text-richblack-5 border-b-2 border-richblack-800">
//           <Tr>
//             <Th className="px-4 py-2">COURSES</Th>
//             <Th className="px-4 py-2">DURATION</Th>
//             <Th className="px-4 py-2">PRICE</Th>
//             <Th className="px-4 py-2">ACTIONS</Th>
//           </Tr>
//         </Thead>
//         <Tbody className="">
//           {courses?.map((course) => (
//             <Tr key={course._id}>
//               <Td className="px-4 py-3">
//                 <div className="flex gap-5">
//                     <img
//                       src={course?.thumbnail}
//                       alt="course-img"
//                       className="max-w-[300px] max-h-[250px] rounded-xl object-cover"
//                     />                
//                     <div>
//                     <p className="text-richblack-5 font-kamBold text-[18px]">{course?.courseName}</p>
//                     <p className="text-richblack-300 text-[14px]">{course?.courseDescription.slice(0, 100)}</p>

//                     {course.status === "Published" ? (
//                       <p className="flex gap-[5px] w-fit px-3 text-[14px] mt-2 rounded-full bg-richblack-700 items-center text-yellow-50">
//                         <FaCheckCircle />
//                         {course.status}
//                       </p>
//                     ) : (
//                       <p className="flex gap-[7px] w-fit px-3 text-[14px] mt-2 rounded-full bg-richblack-700 items-center text-pink-100">
//                         <FaClock className="text-pink-50" />
//                         {course.status}
//                       </p>
//                     )}
//                     </div>
//                 </div>
//               </Td>
//               <Td className="px-5">2h 32min</Td>
//               <Td className="px-4 py-3 text-[18px]">₹{course.price}</Td>
//               <Td className="px-4 py-3">
//                 <div className="flex gap-2 text-[24px]">
//                   <MdEdit onClick={() => courseEdit(course)} className="cursor-pointer" />
//                   <MdDelete
//                     onClick={() =>
//                       setConfirmationModal({
//                         text1: "Are You Sure",
//                         text2: "Your course will be permanently deleted",
//                         btn1Text: "Delete",
//                         btn2Text: "Cancel",
//                         btn1Handler: () => deleteCourseHandler(course._id),
//                         btn2Handler: () => setConfirmationModal(null),
//                       })
//                     }
//                     className="cursor-pointer"
//                   />
//                 </div>
//               </Td>
//             </Tr>
//           ))}
//         </Tbody>
//       </Table>
//       {confirmationModal && <ConfirmationModal modalData={confirmationModal} />}
//     </div>
//   );
// }

// export default CourseList;
