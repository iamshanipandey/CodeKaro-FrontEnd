import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import Navbar from "./components/core/Common/Navbar";
import ForgotPassword from "../src/Pages/ForgotPassword";
import ResetPassword from "./Pages/ResetPassword";
import VerifyOTP from "./Pages/VerifyOTP";
import ChangePassword from "./Pages/ChangePassword";
import About from "./Pages/About";
import Contact from "./Pages/Contact";
import MyProfile from "./components/core/Dashboard/MyProfile";
import Dashboard from "./Pages/Dashboard";
import PrivateRoute from "./components/core/Auth/PrivateRoute";
import Error from "./components/core/Auth/Error";
import OpenRoute from "./components/core/Auth/OpenRoute";
import Setting from "./components/core/Dashboard/Setting";
import AddCourse from "./components/core/Dashboard/AddCourse/index";
import MyCourses from "./components/core/Dashboard/MyCourses";
import CategoryPage from "./Pages/CategoryPage";
import Coursepage from "./Pages/CoursePage";

// Figma : https://www.figma.com/design/Mikd0FjHKAofUlWQSi70nf/StudyNotion_shared?node-id=11167-17977&t=2xPCQ8S1ajmp5DBB-0


function App() {

  return (
    <div className="w-screen min-h-screen bg-richblack-900 flex flex-col font-inter">
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home/>}/>

        <Route 
          path="/login" element={<OpenRoute><Login/></OpenRoute>}
        />

        <Route 
          path="/signup" element={<OpenRoute><Signup/></OpenRoute>}
        />

        <Route 
          path="/forgot-password" element={<OpenRoute><ForgotPassword/></OpenRoute>}
        />

        <Route 
          path="/reset-password/:id" element={<OpenRoute><ResetPassword/></OpenRoute>}
        />

        <Route 
          path="/verify-otp" element={<OpenRoute><VerifyOTP/></OpenRoute>}
        />

        <Route 
          path="/CategoryPage/:id" element={<CategoryPage/>}
        />

        <Route 
          path="/courses/:courseId" element={<Coursepage/>}
        />

        <Route path="/about-us" element={<About/>}/>
        
        <Route path="contact-us" element={<Contact/>}/>

        <Route path="*" element={<Error/>}/>

        <Route 
          path="dashboard/change-password" element={<PrivateRoute><ChangePassword/></PrivateRoute>}
        />

        <Route
          element={
            <PrivateRoute>
              <Dashboard/>
            </PrivateRoute>
          }>
            <Route path="/dashboard/my-profile" element={<MyProfile/>} />
            <Route path="/dashboard/settings" element={<Setting/>} />
            <Route path="dashboard/add-course" element={<AddCourse/>}/>
            <Route path="dashboard/my-courses" element={<MyCourses/>}/>
          </Route>

      
          
      </Routes>

    </div>
    
  );
}

export default App;
