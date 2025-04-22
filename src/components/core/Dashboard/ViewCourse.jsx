import React, { useState } from "react";

function ViewCourse(){

    const [reviewModal, setReviewModal] = useState(); 

    return(
        <div>
            <VideoDetailsSideBar setReviewModal={setReviewModal}/>
            <div>
                <Outlet/>
            </div>
            {reviewModal && <ReviewModal setReviewModal={setReviewModal}/>}
        </div>
    )
}

export default ViewCourse;
