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
    <header className="border-b bg-white">
      <div className="flex items-center justify-between mx-4 sm:mx-6 md:mx-10 my-3">
        {/* Logo (Linked to Home) */}
        <Link
          to={role !== "Recruiter" ? "/" : "/profile"}
          className="font-bold text-2xl sm:text-3xl"
        >
          Job<span className="text-[#F83002]">Portal</span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-6">
          {role !== "Recruiter" ? (
            <ul className="flex gap-6 text-medium">
              <li className="cursor-pointer hover:text-[#6A38C2]">
                <Link to="/">Home</Link>
              </li>
              <li className="cursor-pointer hover:text-[#6A38C2]">
                <Link to="/jobs">Jobs</Link>
              </li>
              {role === "Student" && (
                <li className="cursor-pointer hover:text-[#6A38C2]">
                  <Link to="/applications">Actions</Link>
                </li>
              )}
            </ul>
          ) : (
            <ul className="flex gap-6 text-medium">
              <li className="cursor-pointer hover:text-[#6A38C2]">
                <Link to="/admin/jobs">Jobs</Link>
              </li>
            </ul>
          )}

          {loged ? (
            <Popover>
              <PopoverTrigger>
                <Avatar className="cursor-pointer">
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </PopoverTrigger>

              <PopoverContent className="w-56">
                <div className="flex gap-3 items-center">
                  <Avatar className="size-10">
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                  <div>
                    <h4 className="text-sm font-semibold">{loged.fullname}</h4>
                  </div>
                </div>

                <div className="flex flex-col mt-3">
                  <Link to="/profile">
                    <Button variant="ghost" className="justify-start gap-2">
                      <User2 size={16} /> View Profile
                    </Button>
                  </Link>

                  <Button
                    variant="ghost"
                    onClick={handleLogout}
                    className="justify-start gap-2"
                  >
                    <LogOut size={16} /> Logout
                  </Button>
                </div>
              </PopoverContent>
            </Popover>
          ) : (
            <div className="flex gap-2">
              <Link to="/login">
                <Button variant="outline">Login</Button>
              </Link>
              <Link to="/register">
                <Button className="bg-[#6A38C2] hover:bg-[#5a2fa8]">
                  Sign Up
                </Button>
              </Link>
            </div>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button className="md:hidden" onClick={() => setOpen(!open)}>
          {open ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {open && role === "Student" && (
        <div className="md:hidden mx-4 sm:mx-6 pb-4 flex flex-col gap-4">
          <ul className="flex flex-col gap-3">
            <li className="hover:text-[#6A38C2]">Home</li>
            <li className="hover:text-[#6A38C2]">Jobs</li>
            <li className="hover:text-[#6A38C2]">Browse</li>
          </ul>

          {!loged && (
            <div className="flex flex-col gap-2">
              <Link to="/login">
                <Button variant="outline" className="w-full">
                  Login
                </Button>
              </Link>
              <Link to="/register">
                <Button className="w-full bg-[#6A38C2] hover:bg-[#5a2fa8]">
                  Sign Up
                </Button>
              </Link>
            </div>
          )}
        </div>
      )}
    </header>
  );
};

export default Navbar;
