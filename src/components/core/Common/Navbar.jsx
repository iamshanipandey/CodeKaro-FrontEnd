import React, { useEffect, useState } from "react";
import { Link, matchPath, useNavigate } from "react-router-dom";
import logo from "../../../assests/Logo/logo.png"
import { NavbarLinks } from "../../../data/NavbarLinks";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { RiArrowDownSLine } from "react-icons/ri";
import { apiConnector } from "../../../Services/apiConnector";
import { categories } from "../../../Services/apis";
import { logoutAPI} from "../../../Services/Operations/authApi";

function Navbar(){    

    const [subLink, setSubLink] = useState([]);
    const {token} = useSelector((state)=> state.auth);
    const {user} = useSelector((state)=> state.profile);
    const {totalItems} = useSelector((state)=>state.cart);
    const [profilePicture, setProfilePicture] = useState(null);
    let dispatch = useDispatch();
    let nevigate = useNavigate();
    let location = useLocation();


    const fetchCatagories = async () =>{
        try
        {
            const result = await apiConnector("GET", categories.CATEGORIES_API)
            setSubLink(result.data.allCategory);
        }
        catch(error)
        {
            console.log(error);
        }
    }

    useEffect(()=>{
        fetchCatagories();
        function fetchProfilePicture(){
            if(user)
                setProfilePicture(user.profilePicture);
        }
        fetchProfilePicture();
            
    },[user,token]);

    function matchRoute(route){
        return matchPath({path:route},location.pathname)
    }

    function logoutHandler(){
        dispatch(logoutAPI(nevigate))
    }

    return(
        <div className="flex items-center text-richblack-50 justify-center border-b border-richblack-600 h-14">
            <div className="w-11/12 max-w-[1250px] flex justify-between">
                <Link to={"/"}>
                    <img src={logo} alt="logo" width="220px" />
                </Link>
                <div className="flex gap-4 items-center z-10">
                    {
                        NavbarLinks.map((link, index)=>(
                            link.title === "Catalog"? 
                            (
                            <div key={index} className="flex relative items-center group">
                                <p className="cursor-pointer">{link.title}</p>
                                <RiArrowDownSLine className="cursor-pointer" />

                                <div className="invisible absolute top-[35px] left-[-90px] flex flex-col rounded-md
                                                bg-richblack-5 p-4 w-[300px] text-richblack-900 opacity-0 transition-all
                                                duration-200 group-hover:visible hover:visible hover:opacity-100 group-hover:opacity-100">
                                
                                <div className=" absolute top-[-10px] left-[138px] flex rounded-md bg-richblack-5 w-[30px] h-[30px]  rotate-45 
                                                transition-all duration-200"></div>

                                    {
                                        subLink && (
                                            subLink.map((link, index)=>(
                                                <Link to={`/categorypage/${link._id}`} className="hover:text-richblack-900 transition-all duration-300 hover:scale-105 text-richblack-900 font-semiBold gap-1" key={index}>
                                                    {link.name}
                                                </Link>
                                            ))
                                        )
                                    }
                                </div>
                                
                            </div>
                            )
                            
                            :(
                                <Link to={link?.path} key={index} >
                                    <p className={`${matchRoute(link.path)? "text-yellow-25":"text-richblack-50"}`}>
                                    {link.title}
                                    </p>
                                </Link>
                            )
                        ))
                    }
                </div>
                <div className="flex items-center">
                    <div className="flex gap-10 ">
                        {
                            user && user?.accountType!=="Instructor" && (
                                <Link to="/dashboard/cart" className="relative flex items-center">
                                    <AiOutlineShoppingCart className="text-[24px]" />
                                    {
                                        totalItems>0 ? 
                                        <span>{totalItems}</span>
                                        : (<div></div>)
                                    }
                                </Link>
                            )
                        }
                        {
                            token===null && (
                                <Link to={"/login"}>
                                    <button className="px-[12px] py-[8px] bg-richblack-800 border-richblack-700 rounded-md
                                                     border text-richblack-100 transition-all duration-200 hover:scale-95"
                                                     >
                                        Log in 
                                    </button>
                                </Link>
                                
                            )
                        }
                        {
                            token===null && (
                                <Link to={"/signup"}>
                                    <button className="px-[12px] py-[8px] bg-richblack-800 border-richblack-700 rounded-md border
                                                    text-richblack-100 transition-all duration-200 hover:scale-95">
                                        Sign up 
                                    </button>
                                </Link>
                                
                            )
                        }
                        {
                            token!==null && (
                                <div className="relative group z-10">
                                    <img className="rounded-full cursor-pointer object-cover aspect-square w-[32px]" src={profilePicture} alt="pf" />
                                    
                                    <div className="invisible border-b-2 border-richblack-300 mb-10 absolute top-[45px] left-[-20px] flex flex-col rounded-md
                                                bg-richblack-700 p-4 w-[200px]  text-richblack-5 opacity-0 transition-all
                                                duration-200 group-hover:visible hover:visible hover:opacity-100 group-hover:opacity-100">
                                
                                    <div className=" absolute top-[-10px] left-[28px] flex rounded-sm bg-richblack-700 w-[20px] h-[20px]  rotate-45 
                                                    transition-all duration-200"></div>
                                    
                                                <Link to={"/dashboard"}>
                                                   <p className="hover:text-yellow-25 hover:scale-105 transition-all duration-200">Dashboard</p>
                                                </Link>
                                                <Link to={"/dashboard/my-profile"}>
                                                <p className="hover:text-yellow-25 hover:scale-105 transition-all duration-200">Profile</p>
                                                </Link>
                                                <Link to={"/dashboard/change-password"}>
                                                   <p className="hover:text-yellow-25 hover:scale-105 transition-all duration-200">Change Password</p>
                                                </Link>
                                                <Link onClick={logoutHandler}>
                                                <p className="hover:text-yellow-25 hover:scale-105 transition-all duration-200">Logout</p>
                                                </Link>
                                                
                                    </div>

                                    
                                    
                                </div>
                            )
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Navbar;