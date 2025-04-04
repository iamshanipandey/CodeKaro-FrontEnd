import toast from "react-hot-toast";
import { coursePurchaseAPI } from "../apis";
import { apiConnector } from "../apiConnector";
import rzrpayLogo from "../../assests/Logo/logo-dark.svg"

function loadScript(src){
    return new Promise((resolve)=>{
        const script = document.createElement("script");
        script.src = src;

        script.onload = ()=>{
            resolve(true);
        }
        script.onerror = ()=>{
            resolve(false);
        }
        document.body.appendChild(script);
    })
}

export async function buyCourse(token, courses, userDetails, navigate, dispatch){

    const toastId = toast.loading("Loading");

    try
    {
        const response = await loadScript("https://checkout.razorpay.com/v1/checkout.js");
        if(!response)
        {
            toast.error("Razorpay SDK faild to laod")
            return;
        }

        // initial order

        const orderResponse = await apiConnector("POST", coursePurchaseAPI.CAPTURE_PAYMENT_API, {courses, token});
        if(!orderResponse.data.success)
        {
            console.log(orderResponse.data.message)
            throw new Error(orderResponse);
            
        }
        const options = {
            key: process.env.REACT_APP_RAZORPAY_KEY,
            currency: orderResponse.data.data.currency,
            amount : `${orderResponse.data.data.price}`,
            order_id : orderResponse.data.data.id,
            name : "CodeKaro",
            description: "Thank Your For Purchasing Course",
            image: rzrpayLogo,
            prefill: {
                name : `${userDetails.firstName}`,
                email : `${userDetails.email}`,
            },
            handler: function (response)
            {
                // send successfully email  
                sendPaymentSuccessfullEmail(response, orderResponse.data.data.amount, token);

                // verify Payment
                verifyPayment({...response, courses}, token, navigate , dispatch);
            }
        }
        const paymentObject = new window.Razorpay(options);
        paymentObject.open();
        paymentObject.on("payment.failed", function(resposne){
            toast.error("Payment Failed");
        })
    }
    catch(error)
    {
        console.log("Payment API Error", error);
        toast.error(error.response.data.message);
    }
    toast.dismiss(toastId);
}

async function sendPaymentSuccessfullEmail(response, amount, token){
    try
    {
        await apiConnector("POST", coursePurchaseAPI.PAYMENT_CONFIRMATION_EMAIL, {amount, token, order_id: response.razorpay_order_id, payment_id : response.razorpay_payment_id})
        toast.success("Payment Confirmation Email Sent")
    }
    catch(error)
    {
        console.log(error);
        return response.status(500).json({
            success: false,
            message : "Unable to send email",
            error: error.message,
        })
    }
}

async function verifyPayment(bodyData, token, navigate , dispatch){
    const toastId = toast.loading("Verifying Payment");
    const formData = new FormData();
    formData.append("token", token);
    formData.append("bodyData", bodyData);
    try
    {
        const response = await apiConnector("POST", coursePurchaseAPI.VERIFY_PAYMENT_API, {token, bodyData})
        if(!response)
        {
            throw new Error(response);
        }
        toast.success("Payment Verified")
        navigate("/dashboard/enrolled-courses")
        // dispatch(resetCart());
    }
    catch(error)
    {
        console.log(error);
    }
    toast.dismiss(toastId);
}