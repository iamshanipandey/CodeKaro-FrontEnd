import toast from "react-hot-toast";
import { courseAPI, coursePurchaseAPI } from "../apis";
import { apiConnector } from "../apiConnector";
import rzrpayLogo from "../../assests/Logo/logo-dark.svg"
import { resetCart, resetTotalItems, resetTotalBill, setRecentPurchase } from "../../Slices/cartReducer";
import { useSelector } from "react-redux";

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

export async function buyCourse(token, courses, userDetails, navigate, dispatch, setLoading){


    const toastId = toast.loading("Loading");
    setLoading(true);
    try
    {
        const response = await loadScript("https://checkout.razorpay.com/v1/checkout.js");
        if(!response)
        {
            toast.error("Razorpay SDK faild to laod")
            setLoading(false);
            toast.dismiss(toastId);
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
                sendPaymentSuccessfullEmail(response, orderResponse.data.data.amount, token, setLoading);

                // verify Payment
                verifyPayment({...response, courses}, token, navigate , dispatch, setLoading);
            }
        }
        const paymentObject = new window.Razorpay(options);
        paymentObject.open();
        paymentObject.on("payment.failed", function(resposne){
            toast.error("Payment Failed");
        })

        setLoading(false);
    }
    catch(error)
    {
        setLoading(false);
        console.log("Payment API Error", error);
        toast.error(error.response.data.message);
    }
    toast.dismiss(toastId);
}

async function sendPaymentSuccessfullEmail(response, amount, token, setLoading){
    setLoading(true)
    try
    {
        await apiConnector("POST", coursePurchaseAPI.PAYMENT_CONFIRMATION_EMAIL, {amount, token, order_id: response.razorpay_order_id, payment_id : response.razorpay_payment_id})
        toast.success("Payment Confirmation Email Sent")
        setLoading(false);
    }
    catch(error)
    {
        setLoading(false)
        console.log(error);
        return response.status(500).json({
            success: false,
            message : "Unable to send email",
            error: error.message,
        })

    }
}

async function verifyPayment(bodyData, token, navigate , dispatch, setLoading){
    setLoading(true)
    const toastId = toast.loading("Verifying Payment");
    const formData = new FormData();
    formData.append("token", token);
    formData.append("bodyData", bodyData);
    try
    {
        const response = await apiConnector("POST", coursePurchaseAPI.VERIFY_PAYMENT_API, {token, bodyData})
        if(!response)
        {
            console.log("Verify Payment Resposne", response)
            throw new Error(response);
        }
        toast.success("Payment Verified")
        console.log(response);
        console.log(response.data.enrollmentData);
        navigate("/dashboard/enrolled-courses")
        dispatch(resetCart(null))
        dispatch(resetTotalItems(0))
        dispatch(resetTotalBill(0))
        dispatch(setRecentPurchase(response.data.enrollmentData))
        localStorage.setItem("recentPurchase",JSON.stringify(response.data.enrollmentData))
        localStorage.setItem("cart",JSON.stringify(null) )
        localStorage.setItem("totalBill",JSON.stringify(null) )
        localStorage.setItem("totalItems",JSON.stringify(null) )
        setLoading(false)

    }
    catch(error)
    {
        setLoading(false)
        console.log(error);
    }
    toast.dismiss(toastId);
}