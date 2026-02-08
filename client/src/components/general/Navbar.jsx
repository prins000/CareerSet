import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { LogOut, User2, Menu, X } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import { setUser } from "../../redux/slices/authSlice";
import axios from "axios";
import { USER_API_ENDPOINT } from "../../utils/endpoints";
import { toast } from "sonner";
import { persistor } from "../../redux/store";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  let loged = useSelector((state) => state.auth.user);
  let dispatch = useDispatch();
  const navigate = useNavigate();
  const role = loged?.role;

  const handleLogout = async () => {
    console.log("Logging out...");
    try {
      const res = await axios.get(`${USER_API_ENDPOINT}/logout`, {
        withCredentials: true,
      });

      if (res.data.success) {
        dispatch(setUser(null));
        setOpen(false);
        await persistor.purge();
        toast.success("Logged out successfully");
        navigate("/");
      }
    } catch (error) {
      console.log(error);
      toast.error("Error logging out");
    }
  };

  return (
    <header className="bg-white shadow-sm border-b sticky top-0 z-50">
      <div className="flex items-center justify-between mx-4 sm:mx-6 md:mx-10 my-3">
        {/* Logo */}
        <Link
          to={role !== "Recruiter" ? "/" : "/profile"}
          className="font-bold text-2xl sm:text-3xl text-gray-800 hover:text-[#6A38C2] transition-colors"
        >
          Job<span className="text-[#6A38C2]">Portal</span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          {loged ? (
            <>
              {role !== "Recruiter" ? (
                <ul className="flex gap-8 text-medium font-medium">
                  <li className="hover:text-[#6A38C2] transition-colors">
                    <Link to="/">Home</Link>
                  </li>
                  <li className="hover:text-[#6A38C2] transition-colors">
                    <Link to="/jobs">Jobs</Link>
                  </li>
                  {role === "Student" && (
                    <li className="hover:text-[#6A38C2] transition-colors">
                      <Link to="/applications">Applications</Link>
                    </li>
                  )}
                </ul>
              ) : (
                <ul className="flex gap-8 text-medium font-medium">
                  <li className="hover:text-[#6A38C2] transition-colors">
                    <Link to="/admin/jobs">Jobs</Link>
                  </li>
                  <li className="hover:text-[#6A38C2] transition-colors">
                    <Link to="/profile#companies">Companies</Link>
                  </li>
                </ul>
              )}

              {/* User Profile */}
              <Popover>
                <PopoverTrigger>
                  <Avatar className="cursor-pointer ring-2 ring-gray-200 hover:ring-[#6A38C2] transition-all">
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback className="bg-[#6A38C2] text-white">
                      {loged.fullname?.charAt(0) || "U"}
                    </AvatarFallback>
                  </Avatar>
                </PopoverTrigger>

                <PopoverContent className="w-64 border-gray-200 shadow-lg">
                  <div className="flex gap-3 items-center pb-3 border-b">
                    <Avatar className="size-12 ring-2 ring-gray-100">
                      <AvatarImage src="https://github.com/shadcn.png" />
                      <AvatarFallback className="bg-[#6A38C2] text-white">
                        {loged.fullname?.charAt(0) || "U"}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h4 className="font-semibold text-gray-800">{loged.fullname}</h4>
                      <p className="text-sm text-gray-500">{loged.role}</p>
                    </div>
                  </div>

                  <div className="flex flex-col pt-2">
                    <Link to="/profile">
                      <Button variant="ghost" className="justify-start gap-3 w-full hover:bg-gray-50">
                        <User2 size={18} />
                        <span>View Profile</span>
                      </Button>
                    </Link>

                    <Button
                      variant="ghost"
                      onClick={handleLogout}
                      className="justify-start gap-3 w-full text-red-600 hover:text-red-700 hover:bg-red-50"
                    >
                      <LogOut size={18} />
                      <span>Logout</span>
                    </Button>
                  </div>
                </PopoverContent>
              </Popover>
            </>
          ) : (
            <>
              {/* Navigation for logged-out users */}
              <ul className="flex gap-8 text-medium font-medium">
                <li className="hover:text-[#6A38C2] transition-colors">
                  <Link to="/">Home</Link>
                </li>
                <li className="hover:text-[#6A38C2] transition-colors">
                  <Link to="/jobs">Jobs</Link>
                </li>
              </ul>

              {/* Auth Buttons */}
              <div className="flex gap-3">
                <Link to="/login">
                  <Button variant="outline" className="border-gray-300 hover:border-[#6A38C2] hover:text-[#6A38C2]">
                    Login
                  </Button>
                </Link>
                <Link to="/register">
                  <Button className="bg-[#6A38C2] hover:bg-[#5a2fa8]">
                    Sign Up
                  </Button>
                </Link>
              </div>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors" 
          onClick={() => setOpen(!open)}
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden fixed top-16 left-0 right-0 pb-2 bg-white border-t shadow-lg z-40">
          <div className="mx-4 sm:mx-6 pb-1">
            {loged ? (
              <div >
                {/* User Profile Section */}
                <div className="flex items-center gap-4 py-4 border-b bg-gray-50 -mx-4 px-4">
                  <Avatar className="ring-2 size-12 ring-white shadow-sm">
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback className="bg-[#6A38C2] text-white">
                      {loged.fullname?.charAt(0) || "U"}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h4 className="text-base font-semibold text-gray-800">{loged.fullname}</h4>
                    <p className="text-sm text-gray-500">{loged.role}</p>
                  </div>
                </div>

                {/* Navigation Links */}
                <div className="py-2">
                  {role !== "Recruiter" ? (
                    <ul>
                      <li className="hover:text-[#6A38C2] hover:bg-gray-50 px-3 py-1 rounded-lg transition-all">
                        <Link to="/" className="flex items-center gap-3 text-sm font-medium" onClick={() => setOpen(false)}>
                          <span className="w-2 h-2 bg-[#6A38C2] rounded-full"></span>
                          Home
                        </Link>
                      </li>
                      <li className="hover:text-[#6A38C2] hover:bg-gray-50 px-3 py-1 rounded-lg transition-all">
                        <Link to="/jobs" className="flex items-center gap-3 text-sm font-medium" onClick={() => setOpen(false)}>
                          <span className="w-2 h-2 bg-[#6A38C2] rounded-full"></span>
                          Jobs
                        </Link>
                      </li>
                      {role === "Student" && (
                        <li className="hover:text-[#6A38C2] hover:bg-gray-50 px-3 py-1 rounded-lg transition-all">
                          <Link to="/applications" className="flex items-center gap-3 text-sm font-medium" onClick={() => setOpen(false)}>
                            <span className="w-2 h-2 bg-[#6A38C2] rounded-full"></span>
                            Applications
                          </Link>
                        </li>
                      )}
                    </ul>
                  ) : (
                    <ul >
                      <li className="hover:text-[#6A38C2] hover:bg-gray-50 px-3 py-1 rounded-lg transition-all">
                        <Link to="/admin/jobs" className="flex items-center gap-3 text-sm font-medium" onClick={() => setOpen(false)}>
                          <span className="w-2 h-2 bg-[#6A38C2] rounded-full"></span>
                          Jobs
                        </Link>
                      </li>
                      <li className="hover:text-[#6A38C2] hover:bg-gray-50 px-3 py-1 rounded-lg transition-all">
                        <Link to="/profile#companies" className="flex items-center gap-3 text-sm font-medium" onClick={() => setOpen(false)}>
                          <span className="w-2 h-2 bg-[#6A38C2] rounded-full"></span>
                          Companies
                        </Link>
                      </li>
                    </ul>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col  pt-3 border-t">
                  <Link to="/profile">
                    <Button variant="ghost" className="justify-start gap-3 w-full hover:bg-gray-50">
                      <User2 size={18} />
                      <span>View Profile</span>
                    </Button>
                  </Link>
                  <Button
                    variant="ghost"
                    onClick={handleLogout}
              
                    className="justify-start gap-3 w-full text-red-600 hover:text-red-700 hover:bg-red-50"
                  >
                    <LogOut size={18} />
                    <span>Logout</span>
                  </Button>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                {/* Navigation Links for non-logged users */}
                <div className="">
                  <ul >
                    <li className="hover:text-[#6A38C2] hover:bg-gray-50 px-3 py-1 rounded-lg transition-all">
                      <Link to="/" className="flex items-center gap-3 text-sm font-medium" onClick={() => setOpen(false)}>
                        <span className="w-2 h-2 bg-[#6A38C2] rounded-full"></span>
                        Home
                      </Link>
                    </li>
                    <li className="hover:text-[#6A38C2] hover:bg-gray-50 px-3 py-1 rounded-lg transition-all">
                      <Link to="/jobs" className="flex items-center gap-3 text-sm font-medium" onClick={() => setOpen(false)}>
                        <span className="w-2 h-2 bg-[#6A38C2] rounded-full"></span>
                        Jobs
                      </Link>
                    </li>
                  </ul>
                </div>

                {/* Login/Sign Up Buttons */}
                <div className="flex flex-col gap-2 pt-3 border-t">
                  <Link to="/login">
                    <Button variant="outline" onClick={() => setOpen(false)} className="w-full border-gray-300 hover:border-[#6A38C2] hover:text-[#6A38C2] justify-center">
                      Login
                    </Button>
                  </Link>
                  <Link to="/register">
                    <Button onClick={() => setOpen(false)} className="w-full bg-[#6A38C2]  hover:bg-[#5a2fa8] justify-center">
                      Sign Up
                    </Button>
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
