import React from "react";
import Navbar from "../../components/general/Navbar";
import Footer from "../../components/general/Footer";
import { useState } from "react";
import { USER_API_ENDPOINT } from "../../utils/endpoints.js";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useSelector, useDispatch } from "react-redux";
import { setLoading, setUser } from "../../redux/slices/authSlice";
import { Loader2 } from "lucide-react";

const Login = () => {
  let navigate = useNavigate();
  let auth = useSelector((state) => state.auth.loading);

  let dispatch = useDispatch();

  let [input, setInput] = useState({
    email: "",
    password: "",
    role: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInput({ ...input, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      dispatch(setLoading(true));
      const res = await axios.post(`${USER_API_ENDPOINT}/login`, input, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });

      if (res.data.success) {
        toast.success(res.data.message);
        dispatch(setUser(res.data.existingUser));
          navigate("/"); 
      }

      setInput({
        email: "",
        password: "",
        role: "",
      });
    } catch (error) {
      toast.error(error.response?.data?.message);
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <div>
      <Navbar />

      <div className="flex flex-col justify-start items-center   mt-10">
        <form
          className="w-full flex items-center justify-center sm:w-[90%] md:w-[70%] lg:w-[40%]"
          onSubmit={handleSubmit}
        >
          <div
            className="
              flex flex-col
  
              w-[92%]
              sm:w-[90vw]
              md:w-[60vw]
              lg:w-[40vw]
              p-6
              bg-[#f7f6f6]
              border-gray-300
              rounded-2xl
            "
          >
            <h2 className="font-bold text-3xl mb-6 text-center">Login</h2>

            <div className="flex flex-col gap-5">
              {/* Email */}
              <div className="flex flex-col">
                <label className="font-semibold text-sm text-gray-700" htmlFor="email">
                  Email
                </label>
                <input
                  className="border border-gray-300 rounded-lg p-3 text-base h-12 focus:outline-none focus:ring-2 focus:ring-[#6A38C2]"
                  type="email"
                  name="email"
                  value={input.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                />
              </div>

              {/* Password */}
              <div className="flex flex-col">
                <label className="font-semibold text-sm text-gray-700" htmlFor="password">
                  Password
                </label>
                <input
                  className="border border-gray-300 rounded-lg p-3 text-base h-12 focus:outline-none focus:ring-2 focus:ring-[#6A38C2]"
                  type="password"
                  name="password"
                  value={input.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                />
              </div>

              {/* Role */}
              <div className="flex gap-6 items-center">
                <div className="flex gap-2">
                  <label className="font-semibold text-sm text-gray-700">Student</label>
                  <input
                    type="radio"
                    name="role"
                    value="Student"
                    checked={input.role === "Student"}
                    onChange={handleChange}
                  />
                </div>

                <div className="flex gap-2">
                  <label className="font-semibold text-sm text-gray-700">Recruiter</label>
                  <input
                    type="radio"
                    name="role"
                    value="Recruiter"
                    checked={input.role === "Recruiter"}
                    onChange={handleChange}
                  />
                </div>
              </div>

              {/* Button */}
              <div className="flex justify-center items-center flex-col">
                {auth ? (
                  <button
                    type="button"
                    className="border-2 w-full p-2 text-white rounded-md bg-black flex items-center justify-center gap-2"
                  >
                    <Loader2 className="animate-spin text-white h-4 w-4" />
                    <span>Please wait</span>
                  </button>
                ) : (
                  <input
                    type="submit"
                    className="border-2 w-full text-white p-2 rounded-md bg-black"
                    value="Login"
                  />
                )}
              </div>

              {/* Register */}
              <span className="text-sm">
                Don't have an account?{" "}
                <Link to="/register" className="text-blue-500">
                  Sign up
                </Link>
              </span>
            </div>
          </div>
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default Login;
