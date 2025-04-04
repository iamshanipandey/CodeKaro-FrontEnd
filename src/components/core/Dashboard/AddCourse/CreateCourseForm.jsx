
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { HiOutlineCurrencyRupee } from "react-icons/hi";
import { apiConnector } from "../../../../Services/apiConnector";
import { categories } from "../../../../Services/apis";
import TagInput from "./TagInput";
import { IoIosArrowForward } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import {
  createCourseAPI,
  logoutAPI,
  updateCourseAPI,
} from "../../../../Services/Operations/authApi";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Upload from "./CourseContent/Upload";
import { COURSE_STATUS } from "../../../../Utils/contraints";

function CreateCourseForm() {
  const { course, editCourse } = useSelector((state) => state.course);
  const [tags, setTags] = useState([]);
  const [instructions, setInstructions] = useState([]);
  const [category, setCategory] = useState(null);
  let dispatch = useDispatch();
  let navigate = useNavigate();
  const { token } = useSelector((state) => state.auth);
  const [video, setVideo] = useState(null)
  const [videoFile, setVideoFile] = useState(null)


  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      courseName: course?.courseName,
      courseDescription: course?.courseDescription,
      whatYouWillLearn: course?.whatYouWillLearn,
      price: course?.price,
      category: course?.category?.name,
    },
  });

  useEffect(()=>{
      
  })

  async function fetchCategories() {
    try {
      const response = await apiConnector("GET", categories.CATEGORIES_API);
      setCategory(response.data.allCategory);
    } catch (error) {
      console.log("error", error);
    }
  }

  useEffect(() => {
    fetchCategories();
    if (editCourse) {
      setTags(course.tag);
      setInstructions(course.instructions);
    }
    setVideo(course?.thumbnail)
  }, []);

  function changeHandler(event){
    const file = event.target.files[0];
    setVideo(URL.createObjectURL(file));
    setVideoFile(file)
}

  function isThumbnailChanged(){
    if(course?.thumbnail === video)
      return false
  }

  async function submitHandler(data) {

    if(
      !data.courseName ||
      !data.courseDescription ||
      !data.whatYouWillLearn ||
      !data.price ||
      !data.category ||
      !video 
    )
    {
       toast.error("All Fields are Required")
       return
    }

    const formData = new FormData();
    formData.append("token", token);
    formData.append("courseName", data.courseName);
    formData.append("courseDescription", data.courseDescription);
    formData.append("whatYouWillLearn", data.whatYouWillLearn);
    formData.append("price", data.price);
    formData.append("tag", JSON.stringify(tags));
    formData.append("category", data.category);
    console.log(data.category)
    formData.append("instructions", JSON.stringify(instructions));
    console.log(COURSE_STATUS.DRAFT)
    formData.append("status", COURSE_STATUS.DRAFT)

    if (editCourse) {
      formData.append("courseId", course._id);
    }
    if(!isThumbnailChanged())
    {
      console.log("thumbnailImage ki value gyi ", videoFile)
      formData.append("thumbnailImage", videoFile);
    }
    if (!token) {
      console.error("Session Expired, logging out...");
      dispatch(logoutAPI(navigate));
      return;
    }

    try {
      let apiCall;
      if (!editCourse) {
        apiCall = dispatch(createCourseAPI(formData, navigate));
        toast.promise(apiCall, {
          loading: "Creating Course",
          success: (message) => message,
          error: (errorMessage) => errorMessage,
        });
      }
      if (editCourse) {
        apiCall = dispatch(updateCourseAPI(formData, navigate));
        toast.promise(apiCall, {
          loading: "Saving Changes",
          success: (message) => message,
          error: (errorMessage) => errorMessage,
        });
      }

      
    } catch (error) {
      console.log(error);
    }
  }

  function clearVideo() {
    setVideo(null);
    document.getElementById("video").value = ""; 
}

  return (
      <div className="flex sm:p-1 md:p-8 lg:p-12">
        <form
          onSubmit={handleSubmit(submitHandler)}
          className="bg-richblack-800 border border-richblack-600 flex flex-col gap-4 rounded-lg w-[100%] max-w-3xl p-6">
          <div>
          <label>
            <p className="text-richblack-5 mt-3 text-[16px]">
              Course Title <sup className="text-[#FF0000]">*</sup>
            </p>
            <input
              className="text-richblack-5 border-b border-richblack-300 bg-richblack-700 rounded-md outline-none mt-2 p-2 text-[18px] pl-3 w-full"
              type="text"
              name="courseName"
              id="courseName"
              placeholder="Enter Course Title"
              {...register("courseName", {
                required: true,
                message: "Please Enter Course Title",
              })}
            />
            {errors.courseName && (
              <p className="text-red-500">{errors.courseName.message}</p>
            )}
          </label>
          </div>
          <div>
          <label>
            <p className="text-richblack-5 mt-3 text-[16px]">
              Course Description <sup className="text-[#FF0000]">*</sup>
            </p>
            <textarea
              className="text-richblack-5 border-b border-richblack-300 bg-richblack-700 rounded-md outline-none mt-2 p-2 text-[18px] pl-3 w-full"
              name="courseDescription"
              id="courseDescription"
              rows={5}
              placeholder="Enter Description"
              {...register("courseDescription", {
                required: true,
                message: "Please Enter Course Description",
              })}
            />
            {errors.courseDescription && (
              <p className="text-red-500">{errors.courseDescription.message}</p>
            )}
          </label>
          </div>
          <div className="relative">
          <label>
            <p className="text-richblack-5 mt-3 text-[16px]">
              Price <sup className="text-[#FF0000]">*</sup>
            </p>
            <input
              className="text-richblack-5 border-b border-richblack-300 bg-richblack-700 rounded-md outline-none mt-2 p-2 text-[18px] pl-10 w-full"
              type="number"
              name="price"
              id="price"
              placeholder="Enter Price"
              {...register("price", {
                required: true,
                message: "Please Enter Course Price",
              })}
            />
            <HiOutlineCurrencyRupee className="absolute top-[54px] left-2 text-[22px] text-richblack-300" />
            {errors.price && (
              <p className="text-red-500">{errors.price.message}</p>
            )}
          </label>
          </div>
          <div>
          <label>
            <p className="text-richblack-5 mt-3 text-[16px]">
              Categories <sup className="text-[#FF0000]">*</sup>
            </p>
            <select
              className="text-richblack-5 border-b border-richblack-300 bg-richblack-700 rounded-md outline-none mt-2 p-2 text-[18px] pl-3 w-full"
              {...register("category", {
                required: true,
                message: "Please Choose Category",
              })}
            >
              <option>Choose a Category</option>
              {category &&
                category.map((cat) => {
                  return (
                    <option key={cat._id} value={cat._id}>
                      {cat.name}
                    </option>
                  );
                })}
              {errors.category && (
                <p className="text-red-500">{errors.category.message}</p>
              )}
            </select>
          </label>
          </div>
          <TagInput
            register={register}
            handleSubmit={handleSubmit}
            setValue={setValue}
            values={tags}
            setValues={setTags}
            title={"Tag"}
            name={"tag"}
            placeholder={"Choose a Tag"}
            customCSS={
            "bg-yellow-25 my-2 text-richblack-900 flex gap-1 items-center font-kamBold w-fit px-3 rounded-full"
            }
          />
          <div className="w-[100%]">

          <Upload 
          changeHandler={changeHandler}
          clearVideo={clearVideo}
          video={video}
          label={"Lecture Video"}
          />

          </div>
          <div>
          <label>
            <p className="text-richblack-5 mt-3 text-[16px]">
              Benefits of the course <sup className="text-[#FF0000]">*</sup>
            </p>
            <textarea
              className="text-richblack-5 border-b border-richblack-300 bg-richblack-700 rounded-md outline-none mt-2 p-2 text-[18px] pl-3 w-full"
              name="whatYouWillLearn"
              id="whatYouWillLearn"
              rows={5}
              placeholder="Enter Benefits of the course"
              {...register("whatYouWillLearn", {
                required: true,
                message: "Please Provide Benefits of the course",
              })}
            />
            {errors.whatYouWillLearn && (
              <p className="text-red-500">{errors.whatYouWillLearn.message}</p>
            )}
          </label>
          </div>
          <TagInput
          register={register}
        handleSubmit={handleSubmit}
        setValue={setValue}
        values={instructions}
        setValues={setInstructions}
        title={"Requirements/Instructions"}
        name={"instuctions"}
        placeholder={"Enter Benefits of the course"}
          customCSS={"my-2 text-richblack-50 flex gap-1 items-center font-kamBold w-fit px-3 rounded-full"}
          />
          <div className="w-full flex flex-col pt-10 items-end">
          <button type="submit" className="flex gap-1 items-center border-b-2 border-yellow-5 px-3 py-2 bg-yellow-50 text-richblack-900 font-kamBold cursor-pointer rounded-lg">
              <p>{editCourse? ("Save Changes"):("Next")}</p>
              <IoIosArrowForward/>
          </button>
          </div>
        </form>
      </div>
  )
 }

 export default CreateCourseForm;

