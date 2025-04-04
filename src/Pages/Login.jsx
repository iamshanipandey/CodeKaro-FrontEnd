import React from "react";
import image from "../assests/Login-Signup/login.png"
import Template from "../components/core/Login-Signup/Template";
import Footer from "../components/core/HomePage/Footer";

function Login(props){
    return (
        <div className="w-full flex bg-richblack-900 flex-col items-center mt-[100px]">
            <div className="w-11/12 max-w-[1250px] flex justify-center">
                <Template
                heading={"Welcome Back"}
                image={image}
                setIsLoggedIn ={props}
                formType = {"login"}
                />
            </div>
            <Footer/>
        </div>
        
    )
}

export default Login;