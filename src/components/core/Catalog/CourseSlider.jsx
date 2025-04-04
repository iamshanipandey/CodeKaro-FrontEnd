import React from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import CourseCard from "./CourseCard";
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';
import {Autoplay, FreeMode, Navigation, Pagination } from "swiper/modules";


function CourseSlider({courseDetails}){

    return(
        <Swiper
            loop={true}
            slidesPerView={1}
            spaceBetween={30}
            freeMode={true}
            modules={[FreeMode, Autoplay]}
            autoplay={{
                delay: 1000,
                disableOnInteraction: false,
            }}
            breakpoints={{
                1024:{slidesPerView: 3,},
            }}

            

            className="mySwiper">
                {
                    courseDetails.map((course)=>(
                        <SwiperSlide key={course._id}>
                            {course.status === "Published" &&  <CourseCard course={course}/>}
                        </SwiperSlide>                                                                                                                          
                    ))
                }
        </Swiper>
    )
}

export default CourseSlider;
