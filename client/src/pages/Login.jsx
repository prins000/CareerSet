import React from "react";
import Navbar from "@/components/Navbar";
import { useState } from "react";
import { USER_API_ENDPOINT } from "@/utils/endpoints.js";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
const Login= () => {
    let navigate=useNavigate();
   let [input,setInput]= useState({
     
     email:"",
    
     password:"",
     role:""
   });
   
   const  handleChange=(e)=>{
     const {name,value}=e.target;
     setInput({...input,[name]:value});
   }
   const handleSubmit=async (e)=>{
     e.preventDefault();
     try {
      const res= await axios.post(`${USER_API_ENDPOINT}/login`,input,{
        headers:{
          "Content-Type":"application/json"
        },
        withCredentials:true
      });

      if(res.data.success){
        
        toast.success(res.data.message);
         navigate("/");
         
      }
      console.log(" successfully logged", res.data);
      setInput({
        
        email:"",
        password:"",
        role:""
      });
    } catch (error) {
      console.log("Error during login", error);
            toast.error(error.response.data.message);

    }

   }

  return (
    <div>
      <Navbar />
      <div className="flex flex-col justify-start mt-15 items-center  h-screen gap-5 ">
        <form onSubmit={handleSubmit} action="/login" method="post">
          <div className="flex flex-col border-1xl w-[40vw] p-6  bg-[#f7f6f6] border-gray-300 rounded-2xl">
            <h2 className="font-bold text-2xl mb-5">Login</h2>
            <div className="flex flex-col gap-5 ">
              

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

             

              <div className="flex flex-col  ">
                <label className="font-bold  " htmlFor="password">
                  Password
                </label>
                <input
                  className=" border-1 border-black rounded-sm p-1 text-sm h-8"
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={input.password}
                  onChange={handleChange}
                />
              </div>

              <div className="flex gap-3 items-center ">
                <div className="flex gap-1">
                  <label className="font-bold " htmlFor="role">
                    Student
                  </label>
                  <input type="radio" name="role" value="Student" checked={input.role==="Student"} onChange={handleChange} />
                </div>
                <div className="flex gap-1">
                  <label className="font-bold " htmlFor="role">
                    Recruiter
                  </label>
                  <input type="radio" name="role" value="Recruiter" checked={input.role==="Recruiter"} onChange={handleChange} />
                </div>
              </div>

              <div className="flex justify-center items-center flex-col ">
                {" "}
                <input
                  type="submit"
                  className="border-2 w-full text-white  p-2  rounded-md bg-black  w-fit"
                  value="Login"
                />

                
              </div>
              <span className="text-sm">Don't have an account? <Link to="/register" className="text-blue-500">Sign up</Link></span>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
