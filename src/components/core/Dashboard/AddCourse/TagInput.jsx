import React, { useEffect } from "react";
import { RxCross2 } from "react-icons/rx";
import { useSelector } from "react-redux";


function TagInput({register,handleSubmit, setValue, customCSS, title, placeholder, name, values, setValues}){
   

    const addValue = (value)=>{
        if(value && !values.includes(value))
        {
            setValues((prevValues)=>[...prevValues, value])
        }
        setValue(`${name}`, "")
    }

    const onSubmit = (data)=>{
        if(data)
        {
            addValue(data);
        }
    }

    return(
        <div>
            <div>
                
                <label>
                    <p className="text-richblack-5 mt-3 text-[16px]">{title} <sup className="text-[#FF0000]">*</sup></p>
                    <input
                    className="text-richblack-5 border-b border-richblack-300 bg-richblack-700 rounded-md outline-none mt-2 p-2 text-[18px] pl-3 w-full"
                    name={name}
                    id={name}
                    placeholder={placeholder}
                    onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault(); 
                          handleSubmit(onSubmit(e.target.value)); 
                        }}}
                    {...register(`${name}`, {required:false, message: `Enter atleast one ${name} & Press Enter`})}
                    />
                    {
                        values&& values.map((singleValue, index)=>{
                            return(
                                <div className={customCSS} key={index}>
                                    <p>{singleValue}</p>
                                    <RxCross2 className="cursor-pointer" onClick={()=>{
                                        setValues((prevValues)=>prevValues.filter((value)=> value !== singleValue))
                                    }}/>
                                </div>
                            )
                        })
                    }
                </label>
            </div>
        </div>
    )
}

export default TagInput;