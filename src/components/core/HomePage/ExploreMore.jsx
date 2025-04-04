import React, { useState } from "react";
import { HomePageExplore } from "../../../data/HomePage_Explore";
import HighlightText from "./HighlightText";
import ExploreCards from "./ExploreCards";

const tabsName = [
    "Free",
    "New to coding",
    "Most popular",
    "Skill paths",
    "Career paths",
]

function ExploreMore(){

    const [currentTab, setCurrentTab] = useState(tabsName[0]);
    const [courses, setCourses] = useState(HomePageExplore[0].courses);
    const [currentCard, setCurrentCard] = useState(HomePageExplore[0].courses[0].heading);

    const setMyCard = (value) =>{
        setCurrentTab(value);
        const result = HomePageExplore.filter((courses) => courses.tag === value);
        setCourses(result[0].courses);
        setCurrentCard(result[0].courses[0].heading);
    }

    return (
        <div className="w-11/12 max-w-[1250px]">
            <div className="text-[36px] font-semiBold text-center ">
                Unlock the
                <HighlightText text={"Power of Code"} />
            </div>
            <div className="mb-3 text-[16px] text-center text-richblack-300 text">
                Learn to build anything you can imagine
            </div>
            <div className=" flex flex-col items-center">
                <div className="flex CarSelection flex-row mb-3 mt-5  rounded-full bg-richblack-800 px-3 py-1 gap-2">
                    {
                        tabsName.map((element , index)=>{
                            return(
                                <div className={`text-[16px] CarSelection flex flex-row items-center font-semiBold px-4 py-1
                                ${currentTab === element? "bg-richblack-900 text-richblack-5 "
                                                        :"text-richblack-200"} rounded-full transition-all
                                                            duration-200 cursor-pointer hover:bg-richblack-900 hover:text-richblack-5`}
                                key={index}
                                onClick={()=>setMyCard(element)}
                                >
                                {element}
                                
                            </div>
                                ) 
                        })
                    }
                </div>
                <div>
                    <ExploreCards props={courses}/>
                </div>
            </div>
            
        </div>
    )
}

export default ExploreMore;