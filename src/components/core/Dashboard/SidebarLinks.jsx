import React from "react";
import { useDispatch } from "react-redux";
import { NavLink, useLocation, matchPath } from "react-router-dom";
import * as Icons from "react-icons/vsc";

function SidebarLinks({link, iconName}){

    let location = useLocation();
    let dispatch = useDispatch();
    const Icon = Icons[iconName];

    function matchRoute(route){
        return matchPath(route, location.pathname)
    }

    return(
        <NavLink
        to={link.path}
        className={`relative px-8 py-2 text-sm font-kamBold  ${matchRoute(link.path)? ("bg-yellow-800"):("bg-opacity-0")}`}
        >
            <span className={`absolute left-0 top-0 h-full w-[.2rem] bg-yellow-50 ${matchRoute(link.path)? "opacity-100" : "opacity-0"} `}>
                
            </span>
            <div className="flex gap-3 items-center">
                <Icon className="text-[16px]" />
                <span>
                    {link.name}
                </span>
            </div>
        </NavLink>
    )
}

export default SidebarLinks;