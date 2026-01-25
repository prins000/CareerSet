import React, { useState } from "react";
import Navbar from "@/components/general/Navbar";
import { Link, useNavigate } from "react-router-dom";
import { USER_API_ENDPOINT } from "@/utils/endpoints.js";
import axios from "axios";
import { toast } from "sonner";
import { useSelector, useDispatch } from "react-redux";
import { setLoading } from "@/redux/slices/authSlice";
import { Loader2 } from "lucide-react";

const Sign = () => {
  const navigate = useNavigate();
  const auth = useSelector((state) => state.auth.loading);
  const dispatch = useDispatch();

  const [input, setInput] = useState({
    fullname: "",
    email: "",
    mobile: "",
    password: "",
    role: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInput({ ...input, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(setLoading(true));
      const res = await axios.post(`${USER_API_ENDPOINT}/register`, input, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });

      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/login");
        dispatch(setLoading(false));
      }

      setInput({
        fullname: "",
        email: "",
        mobile: "",
        password: "",
        role: "",
      });
    } catch (error) {
       dispatch(setLoading(false)); 
       toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <>
      <Navbar />

      <div className="flex justify-center items-start min-h-screen px-4 py-10">
        <form
          onSubmit={handleSubmit}
          className="w-full sm:w-[90%] md:w-[70%] lg:w-[40%]"
        >
          <div className="bg-[#f7f6f6] border border-gray-300 rounded-2xl p-6">
            <h2 className="font-bold text-2xl mb-6 text-center">Sign Up</h2>

            <div className="flex flex-col gap-4">
              {/* Full Name */}
              <div className="flex flex-col">
                <label className="font-semibold text-sm mb-1">Full Name</label>
                <input
                  className="border border-black rounded-sm p-2 text-sm"
                  type="text"
                  name="fullname"
                  value={input.fullname}
                  onChange={handleChange}
                  placeholder="Full Name"
                />
              </div>

              {/* Email */}
              <div className="flex flex-col">
                <label className="font-semibold text-sm mb-1">Email</label>
                <input
                  className="border border-black rounded-sm p-2 text-sm"
                  type="email"
                  name="email"
                  value={input.email}
                  onChange={handleChange}
                  placeholder="Email"
                />
              </div>

              {/* Mobile */}
              <div className="flex flex-col">
                <label className="font-semibold text-sm mb-1">Mobile</label>
                <input
                  className="border border-black rounded-sm p-2 text-sm"
                  type="text"
                  name="mobile"
                  value={input.mobile}
                  onChange={handleChange}
                  placeholder="Mobile"
                />
              </div>

              {/* Password */}
              <div className="flex flex-col">
                <label className="font-semibold text-sm mb-1">Password</label>
                <input
                  className="border border-black rounded-sm p-2 text-sm"
                  type="password"
                  name="password"
                  value={input.password}
                  onChange={handleChange}
                  placeholder="Password"
                />
              </div>

              {/* Role */}
              <div className="flex gap-6">
                <label className="flex items-center gap-2 text-sm font-semibold">
                  <input
                    type="radio"
                    name="role"
                    value="Student"
                    checked={input.role === "Student"}
                    onChange={handleChange}
                  />
                  Student
                </label>

                <label className="flex items-center gap-2 text-sm font-semibold">
                  <input
                    type="radio"
                    name="role"
                    value="Recruiter"
                    checked={input.role === "Recruiter"}
                    onChange={handleChange}
                  />
                  Recruiter
                </label>
              </div>

              {/* Button */}
              {auth ? (
                <button
                  type="button"
                  className="w-full bg-black text-white py-2 rounded-md flex items-center justify-center gap-2"
                >
                  <Loader2 className="animate-spin w-4 h-4" />
                  Please wait
                </button>
              ) : (
                <button
                  type="submit"
                  className="w-full bg-black text-white py-2 rounded-md hover:bg-gray-900 transition"
                >
                  Sign Up
                </button>
              )}

              {/* Login link */}
              <p className="text-sm text-center">
                Already have an account?{" "}
                <Link to="/login" className="text-purple-600 font-semibold">
                  Log in
                </Link>
              </p>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default Sign;
