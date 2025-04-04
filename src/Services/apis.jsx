const BASE_URL = process.env.REACT_APP_BASE_URL

export const categories = {
    CATEGORIES_API : BASE_URL + "/courses/showAllCategories",
    CATEGORY_COURSE_API : BASE_URL + "/categoryCourse"
}

export const auth = {
    RESET_PASSWORD_LINK : BASE_URL + "/auth/reset-password-link",
    LOGIN_API : BASE_URL + "/auth/login",
    SIGNUP_API : BASE_URL + "/auth/signup",
    RESET_PASSWORD_API : BASE_URL + "/auth/reset-password",
    OTP_API : BASE_URL + "/auth/sentotp",
    CHANGE_PASSWORD_API : BASE_URL + "/user/change-password",
}

export const ContactForm = {
    SUBMIT_API : BASE_URL + "/contact-form/submit",
}

export const profileAPI = {
    UPDATE_PROFILE_API : BASE_URL + "/updateProfile",
    REMOVE_PROFILE_API : BASE_URL + "/removeProfile",
    DELETE_ACCOUNT_API : BASE_URL + "/deleteAccount"
}

export const courseAPI = {
    CREATE_COURSE_API : BASE_URL + "/createcourse",
    UPDATE_COURSE_API : BASE_URL + "/updateCourse",
    DELETE_COURSE_API : BASE_URL + "/deleteCourse",
    PUBLISH_COURSE_API : BASE_URL + "/publishCourse",
    CREATE_SECTION_API : BASE_URL + "/course/createSection",
    UPDATE_SECTION_API : BASE_URL + "/course/updateSection",
    DELETE_SECTION_API : BASE_URL + "/course/deleteSection",
    CREATE_SUBSECTION_API : BASE_URL + "/section/createSubSection",
    UPDATE_SUBSECTION_API : BASE_URL + "/section/updateSubSection",
    DELETE_SUBSECTION_API : BASE_URL + "/section/deleteSubSection",
    GET_INSTRUCTOR_COURSE_API : BASE_URL + "/getInstructorCourses",
    GET_ALL_COURSES_API : BASE_URL + "/showallcourse",
    GET_COURSE_DETAILS : BASE_URL + "/getCourseDetails"

}

export const coursePurchaseAPI = {
    CAPTURE_PAYMENT_API : BASE_URL + "/capturePayment",
    VERIFY_PAYMENT_API : BASE_URL + "/verifySignature",
    PAYMENT_CONFIRMATION_EMAIL : BASE_URL + "/sendPaymentSuccessfullEmail",
}