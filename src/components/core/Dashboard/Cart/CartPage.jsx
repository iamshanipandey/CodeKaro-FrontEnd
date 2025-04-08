import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { MdDelete } from "react-icons/md";
import { removeFromCart } from "../../../../Slices/cartReducer";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { buyCourse } from "../../../../Services/Operations/StudentFeaturesAPI";

function CartPage(){

    const {cart, totalBill} = useSelector((state)=>state.cart);
    const [loading, setLoading] = useState();
    let dispatch = useDispatch();
    const {token} = useSelector((state)=> state.auth)
    const {user} = useSelector((state)=>state.profile);
    let navigate = useNavigate();


    const handleBuyCourse = () =>{
            if(token){
                buyCourse(token, cart, user, navigate, dispatch, setLoading);
                return;
            }
            else
            {
                toast.error("You are not logged in")
            }
        }

    return(
        <div className="w-full">
            {loading? (<div className="absolute border w-[80%] h-[80vh] flex justify-center items-center">
                <div className="spinner"></div>
            </div>)
            :
            (
                <div className="w-full items-center flex flex-col">
                <div className="px-10 py-10 w-full  ">
                    <p className="text-[36px] text-richblack-5 font-kamBold">Cart</p>
                    {
                        !cart?.length ? (<p className="text-center text-richblack-5">Cart is Empty</p>):
                    (
                        <div className="flex flex-col items-center"> 
                        <div className="w-[100%] mt-10 gap-20 flex flex-wrap items-center justify-center relative">
                            <div className="min-w-[350px]">
                                {
                                    cart?.map((course)=>(
                                        <div className="flex flex-wrap py-5  items-center justify-center gap-5">
                                            <img src={course?.thumbnail} className="rounded-lg" alt="thumbnail-img" width="300px" height="100px" />
                                            <div className="text-richblack-5">
                                                <p>{course?.courseName.slice(0,40)}</p>
                                                <p className="text-richblack-300 max-w-[350px] my-2">{course?.courseDescription.slice(0,40)}..</p>
                                                <p className="text-richblack-300">Instructor : {course?.instructor?.firstName}</p>
                                            </div>
                                            <div className="flex flex-col gap-3 items-center"> 
                                                <p className="text-yellow-50 text-[24px]">Rs. {course?.price}</p>
                                                <div onClick={()=>{dispatch(removeFromCart(course))}} 
                                                    className="flex cursor-pointer gap-1 text-pink-300 bg-richblack-800 py-2 px-3 rounded-lg items-center font-kamBold border-richblack-700 border"><MdDelete className="text-[20px]"/><span>Remove</span></div>
                                            </div>
                                        </div>
                                    ))
                                }
                            </div>
                            
                            <div className="rounded-lg gap-3 h-fit text-richblack-5 flex flex-col border border-richblack-700 bg-richblack-800 p-8 top-5 left-[60%]">
                                <div className="font-kamBold text-[16px]">
                                    <p>Total: </p>
                                    <p className="text-yellow-50 text-[22px]">Rs. {totalBill}</p>
                                </div>
                                <button className="w-[250px] py-[8px] rounded-lg font-kamBold outline-none text-richblack-900 bg-yellow-50 border-b border-b-richblack-5" onClick={handleBuyCourse} >Buy Now</button>
                            </div>
                        </div>
                        </div>
                    )
                    }
                </div>
            </div>
            )
            }
            
        </div>
        
        
    )
}

export default CartPage;