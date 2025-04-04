import React from "react";
import image from "../assests/Login-Signup/signup.png"
import Template from "../components/core/Login-Signup/Template";
import Footer from "../components/core/HomePage/Footer";

function Signup(props){
    return (
        <div className="w-full h-max flex flex-col items-center mt-[100px]">
            <div className="w-11/12 max-w-[1250px] flex justify-center">
                <Template
                heading={"Welcome To the CodeKaro"}
                image={image}
                setIsLoggedIn ={props}
                formType = {"signup"}
                />
            </div>
           <Footer/>
        </div>
        
    )
}

export default Signup;