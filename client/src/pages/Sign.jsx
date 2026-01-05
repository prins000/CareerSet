import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import { Link, useNavigate } from "react-router-dom";
import { USER_API_ENDPOINT } from "@/utils/endpoints.js";
import axios from "axios";
import { toast } from "sonner";

const Sign = () => {

  let navigate=useNavigate();
  let [input,setInput]= useState({
    fullname:"",
    email:"",
    mobile:"",
    password:"",
    role:""
  });
  
  const  handleChange=(e)=>{
    const {name,value}=e.target;
    setInput({...input,[name]:value});
  }
  const handleSubmit= async (e)=>{
    e.preventDefault();
    try {
      const res= await axios.post(`${USER_API_ENDPOINT}/register`,input,{
        headers:{
          "Content-Type":"application/json"
        },
        withCredentials:true
      });
      console.log("Form submitted successfully:", res.data);
      if(res.data.success){
        toast.success(res.data.message);
         navigate("/login");
         
      }
      setInput({
        fullname:"",
        email:"",
        mobile:"",
        password:"",
        role:""
      });
    } catch (error) {
      console.log("Error during form submission:", error);
      toast.error(error.response.data.message);
    }
  }

  return (
    <div>
      <Navbar />
      <div className="flex flex-col justify-start mt-8 items-center  h-screen gap-5 ">
        <form onSubmit={handleSubmit} action="/register" method="post">
          <div className="flex flex-col border-1xl w-[40vw] p-6  bg-[#f7f6f6] border-gray-300 rounded-2xl">
            <h2 className="font-bold text-2xl mb-5">Sign Up</h2>
            <div className="flex flex-col gap-5 ">
              <div className="flex flex-col ">
                <label className="font-bold  " htmlFor="Full Name">
                  Full Name
                </label>
                <input
                  className=" border-1 border-black rounded-sm p-1 text-sm h-8"
                  type="text"
                  name="fullname"
                  value={input.fullname}
                  onChange={handleChange}
                  placeholder="Full Name"
                />
              </div>

              <div className="flex flex-col ">
                <label className="font-bold  " htmlFor="email">
                  Email
                </label>
                <input
                  className=" border-1 border-black rounded-sm p-1 text-sm h-8"
                  type="text"
                  name="email"
                  value={input.email}
                  onChange={handleChange}
                  placeholder="email"
                />
              </div>

              <div className="flex flex-col ">
                <label className="font-bold  " htmlFor="mobile">
                  Mobile
                </label>
                <input
                  className=" border-1 border-black rounded-sm p-1 text-sm h-8 "
                  type="text"
                  value={input.mobile}
                  onChange={handleChange}
                  name="mobile"
                  placeholder="Mobile"
                />
              </div>

              <div className="flex flex-col  ">
                <label className="font-bold  " htmlFor="password">
                  Password
                </label>
                <input
                  className=" border-1 border-black rounded-sm p-1 text-sm h-8"
                  type="password"
                  name="password"
                  value={input.password}
                  onChange={handleChange}
                  placeholder="Password"
                  
                />
              </div>

              <div className="flex gap-3 items-center ">
                <div className="flex gap-1">
                  <label className="font-bold " htmlFor="role">
                    Student
                  </label>
                  <input type="radio" name="role" checked={input.role==="Student"} onChange={handleChange} value="Student"  />
                </div>
                <div className="flex gap-1">
                  <label className="font-bold " htmlFor="role">
                    Recruiter
                  </label>
                  <input type="radio" name="role" checked={input.role==="Recruiter"} onChange={handleChange} value="Recruiter"  />
                </div>
              </div>

              <div className="flex justify-center items-center flex-col ">
                {" "}
                <input
                  type="submit"
                  className="border-2 w-full text-white  p-2  rounded-md bg-black  w-fit"
                  value="Sign Up"
                />

                
              </div>
              <span className="text-sm">Already have an account? <Link to="/login" className="text-blue-500">Log in</Link></span>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Sign;
