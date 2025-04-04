import toast from "react-hot-toast";
import { setLoading, setToken } from "../../Slices/authReducer";
import { setProfile, setProfileLoading } from "../../Slices/profileReducer";
import { apiConnector } from "../apiConnector";
import { auth , ContactForm, profileAPI, courseAPI} from "../apis";
import { setStep, setCourseLoading, setEditCourse, setCourse } from "../../Slices/courseReducer";


export function getResetPasswordEmail (email, setEmailSent){
    return async(dispatch) =>{
        dispatch(setLoading(true))
        try
        {
            
            const response = await apiConnector("POST", auth.RESET_PASSWORD_LINK, {email})
            if(!response.data.success)
            {
                throw new Error(response.data.message);
                
            }
            setEmailSent(true);
            dispatch(setLoading(false))
            return response.data.message
        }
        catch(error)
        {
            console.log(error);
            throw error.response?.data?.message
        }
    }
    
}

export function loginAPI(formData, nevigate){
    return async(dispatch)=>{
        try
        {
            const response = await apiConnector("POST", auth.LOGIN_API, formData);
            if(!response.data.success)
                {
                    throw new Error(response.data.message);
                    
                }
                nevigate("/")
                dispatch(setProfile(response.data.user));
                dispatch(setToken(response.data.token));
                localStorage.setItem("token", JSON.stringify(response.data.token));
                localStorage.setItem("user", JSON.stringify(response.data.user));
                return response.data.message
            
        }
        catch(error)
        {
            console.log(error);
            throw error.response?.data?.message
        }
    }
}

export function resetPassword(password, confirmPassword, token, setResetDone){
    return async (dispatch)=>{
        dispatch(setLoading(true));
        try
        {
            console.log(token, password, confirmPassword)
            const response = await apiConnector("POST", auth.RESET_PASSWORD_API, {token, password, confirmPassword});
            if(!response.data.success)
                {
                    throw new Error(response.data.message);
                    
                }
            setResetDone(true);
            dispatch(setLoading(false))
            return response.data.message
            
        }
        catch(error)
        {
            console.log(error);
            throw error.response?.data?.message
        }
    }
}

export function sendOTP (email, nevigate){
    return async (dispatch)=>{
        try
        {
            const response = await apiConnector("POST", auth.OTP_API, {email});
            if(!response)
            {
                throw new Error(response);
            }
            nevigate("/verify-otp");
            return response.data.message

        }
        catch(error)
        {
            console.log("ye error hai ", error)
            throw error.response?.data?.message || "Failed to send OTP"
        }
    }
}

export function signupAPI(
    firstName,
    lastName,
    email,
    password,
    confirmPassword,
    accountType,
    otp,
    nevigate){

    return async(dispatch)=>{

        try
        {
            const response = await apiConnector("POST", auth.SIGNUP_API, {
                                                                            firstName,
                                                                            lastName,
                                                                            email,
                                                                            password,
                                                                            confirmPassword,
                                                                            accountType,
                                                                            otp} )
            if(!response)
            {
                throw new Error(response)
            }
            dispatch(setProfile(response.data.user));
            console.log(response.data)
            dispatch(setToken(response.data.user.token));
            localStorage.setItem("token", JSON.stringify(response.data.user.token));
            localStorage.setItem("user", JSON.stringify(response.data.user));
            nevigate("/dashboard/my-profile")
            return response.data.message;
        }
        catch(error)
        {
            console.log(error)
            throw error.response?.data?.message || "Unable to Verify";
        }
    }

}

export function logoutAPI(nevigate){
    return async(dispatch)=>{
        dispatch(setToken(null))
        localStorage.clear();
        dispatch(setProfile(null))
        toast.success("Logged out")
        nevigate("/")
    }
}

export function changePasswordAPI(password, newPassword, confirmNewPassword, email, setChanged, token, nevigate){

    return async(dispatch)=>{
        try
        {
            const response = await apiConnector("POST", auth.CHANGE_PASSWORD_API, {password, newPassword, confirmNewPassword, email, token})
            if(!response)
            {
                console.log(response)
                throw new Error(response.data.message)
            }   
            setChanged(true)
            return response.data.message
        }
        catch(error)
        {
            console.log(error)
            if(error.response.data.message === "Invalid Token")
            {
                setToken(null);
                setProfile(null);
                localStorage.clear();
                await dispatch(logoutAPI(nevigate));
            }
            if(error.response.data.message === "Token not found")
                {
                    setToken(null);
                    setProfile(null);
                    localStorage.clear();
                    await dispatch(logoutAPI(nevigate));
                }
            throw error.response?.data?.message
        }
    }
}

export const contactFormSubmitAPI = (data)=>{
    return async(dispatch)=>{
        try
        {
            const response = await apiConnector("POST",ContactForm.SUBMIT_API, data)
            if(!response){
                throw new Error(response);
            }
            return response.data.message;
        }
        catch(error)
        {
            console.log(error)
            throw error.response?.data?.message;
        }
    }
}

export const profileUpdateAPI = (formData, nevigate)=>{
    return async(dispatch)=>{
        dispatch(setProfileLoading(true))
        try
        {
            console.log("formData");
            const response = await apiConnector("POST", profileAPI.UPDATE_PROFILE_API, formData);
            if(!response)
            {
                throw new Error(response);
            }
            localStorage.setItem("user", JSON.stringify(response.data.userDetails));
            dispatch(setProfileLoading(false))
            return response.data.message;
        }
        catch(error)
        {
            if(error.response.data.message === "Invalid Token")
                {
                    setToken(null);
                    setProfile(null);
                    localStorage.clear();
                    await dispatch(logoutAPI(nevigate));
                }
                if(error.response.data.message === "Token not found")
                    {
                        setToken(null);
                        setProfile(null);
                        localStorage.clear();
                        await dispatch(logoutAPI(nevigate));
                    }
            dispatch(setProfileLoading(false))
            throw error.response?.data?.message || "An unknown error occurred";
        }
        
    }
}

export const removeProfile = (token, nevigate)=>{
    return async(dispatch)=>{
        try
        {
            const response =  await apiConnector("POST", profileAPI.REMOVE_PROFILE_API , {token});
            if(!response)
            {
                throw new Error(response);
            }
            console.log(response)
            localStorage.setItem("user", JSON.stringify(response.data.user));
            return response.data.message || "Profile Picture Removed";
        }
        catch(error)
        {
            if(error.response.data.message === "Invalid Token")
                {
                    setToken(null);
                    setProfile(null);
                    localStorage.clear();
                    await dispatch(logoutAPI(nevigate));
                }
                if(error.response.data.message === "Token not found")
                    {
                        setToken(null);
                        setProfile(null);
                        localStorage.clear();
                        await dispatch(logoutAPI(nevigate));
                    }
            throw error?.resposne?.data?.message;
        }   
    }
}

export const deleteAccount = (token, nevigate)=>{
    return async(dispatch)=>{
        dispatch(setProfileLoading(true));
        console.log(token)
        try
        {
            const response = await apiConnector("POST", profileAPI.DELETE_ACCOUNT_API, {token});
            if(!response)
            {
                throw new Error(response);
            }
            dispatch(setProfileLoading(false));
            dispatch(logoutAPI(nevigate))
            return response?.data?.message || "Account Deleted Successfully";
        }
        catch(error)
        {
            if(error.response.data.message === "Invalid Token")
                {
                    setToken(null);
                    setProfile(null);
                    localStorage.clear();
                    await dispatch(logoutAPI(nevigate));
                }
                if(error.response.data.message === "Token not found")
                    {
                        setToken(null);
                        setProfile(null);
                        localStorage.clear();
                        await dispatch(logoutAPI(nevigate));
                    }
            dispatch(setProfileLoading(false));
            throw error?.response?.data?.message || "Unable to Delete Account";
        }
    }
}

export const createCourseAPI = (formData, nevigate)=>{
    return async(dispatch)=>{
        dispatch(setCourseLoading(true))
        try
        {
            const response = await apiConnector("POST", courseAPI.CREATE_COURSE_API, formData);
            if(!response)
            {
                throw new Error(response);
            }
            dispatch(setCourseLoading(false))
            console.log(response.data)
            dispatch(setEditCourse(true))
            dispatch(setCourse(response.data.data))
            dispatch(setStep(2));
            return response?.data?.message || "Course Created";
            
        }
        catch(error)
        {
            if(error.response.data.message === "Invalid Token")
                {
                    setToken(null);
                    setProfile(null);
                    localStorage.clear();
                    await dispatch(logoutAPI(nevigate));
                }
                if(error.response.data.message === "Token not found")
                    {
                        setToken(null);
                        setProfile(null);
                        localStorage.clear();
                        await dispatch(logoutAPI(nevigate));
                    }
            dispatch(setCourseLoading(false))
            throw error?.response?.data?.message || "Unable to Create Course"
        }
    }
}

export const updateCourseAPI = (formData, nevigate)=>{
    return async(dispatch)=>{
        dispatch(setCourseLoading(true))
        try
        {
            const response = await apiConnector("POST", courseAPI.UPDATE_COURSE_API, formData);
            if(!response)
            {
                throw new Error(response);
            }
            
            dispatch(setCourseLoading(false))
            console.log(response.data)
            dispatch(setEditCourse(true))
            dispatch(setCourse(response.data.data))
            dispatch(setStep(2));
            return response?.data?.message || "Course Updated";
            
        }
        catch(error)
        {
            if(error.response.data.message === "Invalid Token")
                {
                    setToken(null);
                    setProfile(null);
                    localStorage.clear();
                    await dispatch(logoutAPI(nevigate));
                }
                if(error.response.data.message === "Token not found")
                    {
                        setToken(null);
                        setProfile(null);
                        localStorage.clear();
                        await dispatch(logoutAPI(nevigate));
                    }
            dispatch(setCourseLoading(false))
            throw error?.response?.data?.message || "Unable to Update Course"
        }
    }
}

export const deleteCourseAPI = (formData, nevigate) =>{
    return async(dispatch)=>{
        dispatch(setCourseLoading(true));
        try
        {
            const response = await apiConnector("POST", courseAPI.DELETE_COURSE_API, formData);
            if(!response)
            {
                throw new Error(response);
            }
            dispatch(setCourse(null));
            dispatch(setStep(null));
            dispatch(setCourseLoading(false));
            console.log(response);
            return response.data.message || "Course Deleted"
        }
        catch(error)
        {
            if(error.response.data.message === "Invalid Token")
                {
                    setToken(null);
                    setProfile(null);
                    localStorage.clear();
                    await dispatch(logoutAPI(nevigate));
                }
                if(error.response.data.message === "Token not found")
                    {
                        setToken(null);
                        setProfile(null);
                        localStorage.clear();
                        await dispatch(logoutAPI(nevigate));
                    }
            dispatch(setCourseLoading(false))
            throw error?.response?.data?.message || "Unable to Delete Course"
        }
    }
}

export const publishCourseAPI =(formData, nevigate)=>{
    return async(dispatch)=>{
        try
        {
            const response = await apiConnector("POST", courseAPI.PUBLISH_COURSE_API, formData);
            if(!response)
            {
                throw new Error(response);
            }
            console.log(response?.data);
            return response?.data?.message || "Saved"
        }
        catch(error)
        {
            if(error.response.data.message === "Invalid Token")
                {
                    setToken(null);
                    setProfile(null);
                    localStorage.clear();
                    await dispatch(logoutAPI(nevigate));
                }
                if(error.response.data.message === "Token not found")
                    {
                        setToken(null);
                        setProfile(null);
                        localStorage.clear();
                        await dispatch(logoutAPI(nevigate));
                    }
            throw error?.response?.data?.message || "Unable to Save Settings"
        }
    }
}

export const createSectionAPI = (formData, nevigate)=>{
    return async(dispatch)=>{
        dispatch(setCourseLoading(true))
        try
        {
            const response = await apiConnector("POST", courseAPI.CREATE_SECTION_API, formData);
            if(!response)
            {
                throw new Error(response);
            }
            console.log(response.data.data);
            dispatch(setCourse(response.data.data));
            dispatch(setCourseLoading(false));
            return response?.data?.message || "Section Created"
        }
        catch(error)
        {
            if(error.response.data.message === "Invalid Token")
                {
                    setToken(null);
                    setProfile(null);
                    localStorage.clear();
                    await dispatch(logoutAPI(nevigate));
                }
                if(error.response.data.message === "Token not found")
                    {
                        setToken(null);
                        setProfile(null);
                        localStorage.clear();
                        await dispatch(logoutAPI(nevigate));
                    }
            dispatch(setCourseLoading(false))
            throw error?.response?.data?.message || "Unable to Create Section"
        }
    }
}

export const updateSectionAPI = (formData, nevigate)=>{
    return async(dispatch)=>{
        dispatch(setCourseLoading(true))
        try
        {   
            const response = await apiConnector("POST", courseAPI.UPDATE_SECTION_API, formData);
            if(!response)
            {
                throw new Error(response);
            }
            console.log(response);
            dispatch(setCourse(response.data.data));
            dispatch(setCourseLoading(false));
            return response?.data?.message || "Section Updated"

        }
        catch(error)
        {
            if(error.response.data.message === "Invalid Token")
                {
                    setToken(null);
                    setProfile(null);
                    localStorage.clear();
                    await dispatch(logoutAPI(nevigate));
                }
                if(error.response.data.message === "Token not found")
                    {
                        setToken(null);
                        setProfile(null);
                        localStorage.clear();
                        await dispatch(logoutAPI(nevigate));
                    }
            dispatch(setCourseLoading(false))
            throw error?.response?.data?.message || "Unable to Update Section"
        }
    }
}

export const deleteSectionAPI = (formData, nevigate)=>{
    return async(dispatch)=>{
        dispatch(setCourseLoading(true))

        try
        {
            const response = await apiConnector("POST", courseAPI.DELETE_SECTION_API, formData)
            if(!response)
            {
                throw new Error(response)
            }
            console.log(response)
            dispatch(setCourse(response.data.data));
            dispatch(setCourseLoading(false));
            return response?.data?.message || "Section Deleted" 
        }
        catch(error)
        {
            if(error.response.data.message === "Invalid Token")
                {
                    setToken(null);
                    setProfile(null);
                    localStorage.clear();
                    await dispatch(logoutAPI(nevigate));
                }
                if(error.response.data.message === "Token not found")
                    {
                        setToken(null);
                        setProfile(null);
                        localStorage.clear();
                        await dispatch(logoutAPI(nevigate));
                    }
            dispatch(setCourseLoading(false))
            throw error?.response?.data?.message || "Unable to Delete Section"
        }
    }
}

export const createSubSectionAPI = (formData, nevigate)=>{
    return async(dispatch)=>{
        try
        {
            const response = await apiConnector("POST", courseAPI.CREATE_SUBSECTION_API, formData);
            if(!response)
                {
                    throw new Error(response);
                }
                console.log(response.data.data);
                dispatch(setCourse(response.data.data));
                return response?.data?.message || "Sub Section Created"
        }
        catch(error)
        {
            if(error.response.data.message === "Invalid Token")
                {
                    setToken(null);
                    setProfile(null);
                    localStorage.clear();
                    await dispatch(logoutAPI(nevigate));
                }
                if(error.response.data.message === "Token not found")
                    {
                        setToken(null);
                        setProfile(null);
                        localStorage.clear();
                        await dispatch(logoutAPI(nevigate));
                    }
                    console.log(error);
            throw error?.response?.data?.message || "Unable to Create Sub Section"
        }
    }
}

export const updateSubSectionAPI = (formData, nevigate)=>{
    return async(dispatch)=>{
        try
        {
            const response = await apiConnector("POST", courseAPI.UPDATE_SUBSECTION_API, formData);
            if(!response)
                {
                    throw new Error(response);
                }
                console.log(response);
                dispatch(setCourse(response.data.data));
                return response?.data?.message || "Sub Section Updated"
        }
        catch(error)
        {
            if(error.response.data.message === "Invalid Token")
                {
                    setToken(null);
                    setProfile(null);
                    localStorage.clear();
                    await dispatch(logoutAPI(nevigate));
                }
                if(error.response.data.message === "Token not found")
                    {
                        setToken(null);
                        setProfile(null);
                        localStorage.clear();
                        await dispatch(logoutAPI(nevigate));
                    }
            throw error?.response?.data?.message || "Unable to Update Sub Section"
        }
    }
}

export const deleteSubSectionAPI = (subSectionId, token,courseId, nevigate)=>{
    return async(dispatch)=>{
        dispatch(setCourseLoading(true))

        try
        {
            const response = await apiConnector("POST", courseAPI.DELETE_SUBSECTION_API, {subSectionId, token, courseId})
            if(!response)
            {
                throw new Error(response)
            }
            console.log(response)
            dispatch(setCourse(response.data.data));
            dispatch(setCourseLoading(false));
            return response?.data?.message || "Sub Section Deleted" 
        }
        catch(error)
        {
            if(error.response.data.message === "Invalid Token")
                {
                    setToken(null);
                    setProfile(null);
                    localStorage.clear();
                    await dispatch(logoutAPI(nevigate));
                }
                if(error.response.data.message === "Token not found")
                    {
                        setToken(null);
                        setProfile(null);
                        localStorage.clear();
                        await dispatch(logoutAPI(nevigate));
                    }
            dispatch(setCourseLoading(false))
            throw error?.response?.data?.message || "Unable to Delete Sub Section"
        }
    }
}



