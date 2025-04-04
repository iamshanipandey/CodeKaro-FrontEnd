import {React, useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import { sidebarLinks } from "../../../data/DashboardLinks";
import SidebarLinks from "./SidebarLinks";
import { useNavigate } from "react-router-dom";
import { logoutAPI } from "../../../Services/Operations/authApi";
import ConfirmationModal from "../Common/ConfirmationModal";
import { VscSignOut } from "react-icons/vsc";


function Sidebar(){

    const{loading:authLoading} = useSelector((state)=>state.auth);
    const {loading: profileLoading, user} = useSelector((state)=>state.profile);
    const [modalData, setModalData] = useState(null);
    let dispatch = useDispatch();
    let nevigate = useNavigate();

    if(authLoading || profileLoading)
    {
        return(
            <div>
                Loading...
            </div>
        )
    }

    return(
        <div className="flex sidebarDisplay  min-w-[222px] flex-col border-r-[1px] border-r-richblack-700 h-[calc(100vh-3.5rem)] bg-richblack-800 text-richblack-5">
            <div className="flex flex-col mt-8">
                {
                    sidebarLinks.map((link)=>{
                        if(link.type && link.type !== user.accountType)
                        {
                            return null;
                        }
                        return(
                            <SidebarLinks link={link} iconName={link.icon} key={link.id}/>
                        )
                    })
                }
            </div>
            <div className="mx-auto mt-6 mb-6 h-[1px] w-11/12 bg-richblack-600"></div>
            
            <div className="flex flex-col mt-8">

                <SidebarLinks 
                link={{name:"Settings", path:"dashboard/settings"}} iconName="VscSettingsGear"/>
             
                <button onClick={()=> setModalData({
                    text1 : "Are you sure",
                    text2 : "You will be logged out from the account",
                    btn1Text : "Logout",
                    btn2Text : "Cancel",
                    btn1Handler : ()=>dispatch(logoutAPI(nevigate)),
                    btn2Handler : ()=> setModalData(null),
                })} 
                className="flex gap-3 mt-2 mx-8 items-center">
                    <VscSignOut />
                    <span>
                        Logout
                    </span>
                </button>
              
            </div>  
        {
            modalData&& <ConfirmationModal modalData={modalData}/>
        }
        </div>
    )
}

export default Sidebar;