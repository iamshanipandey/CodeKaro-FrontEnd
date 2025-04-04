import React from "react";
import { FaRegStar } from "react-icons/fa";
import { Link } from "react-router-dom";


function CourseCard({course}){

    return(
        
        
        <Link className="w-[380px] flex flex-col gap-1 mt-10" to={`/courses/${course._id}`}>
            <img src={course.thumbnail} alt="thumbnail-img " />
            <p className="text-[18px] mt-3">{course.courseName}</p>
            <div className="flex gap-2 items-center">
                <FaRegStar className={` text-richblack-300 ${course?.ratingAndReview === 1 && "bg-yellow-50"}`} />
                <FaRegStar className={` text-richblack-300 ${course?.ratingAndReview === 2 && "bg-yellow-50"}`} />
                <FaRegStar className={` text-richblack-300 ${course?.ratingAndReview === 3 && "bg-yellow-50"}`} />
                <FaRegStar className={` text-richblack-300 ${course?.ratingAndReview === 4 && "bg-yellow-50"}`} />
                <FaRegStar className={` text-richblack-300 ${course?.ratingAndReview === 5 && "bg-yellow-50"}`} />
                <p className="text-richblack-300">( Rating Count )</p>
            </div>
            <p className="text-[20px]">Rs. {course.price}</p>
        </Link>
        
    )
}

export default CourseCard;