import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Button } from "./ui/button";
import { LogOut, User2, Menu, X } from "lucide-react";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const loged = false; // later replace with auth state

  return (
    <header className="border-b bg-white">
      <div className="flex items-center justify-between mx-4 sm:mx-6 md:mx-10 my-3">
        
        {/* Logo (Linked to Home) */}
        <Link to="/" className="font-bold text-2xl sm:text-3xl">
          Job<span className="text-[#F83002]">Portal</span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-6">
          <ul className="flex gap-6 text-medium">
            <li className="cursor-pointer hover:text-[#6A38C2]">Home</li>
            <li className="cursor-pointer hover:text-[#6A38C2]">Jobs</li>
            <li className="cursor-pointer hover:text-[#6A38C2]">Browse</li>
          </ul>

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
                    <h4 className="text-sm font-semibold">User Name</h4>
                    <p className="text-xs text-gray-500">User Bio</p>
                  </div>
                </div>

                <div className="flex flex-col mt-3">
                  <Button variant="ghost" className="justify-start gap-2">
                    <User2 size={16} /> View Profile
                  </Button>
                  <Button variant="ghost" className="justify-start gap-2">
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
        <button
          className="md:hidden"
          onClick={() => setOpen(!open)}
        >
          {open ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
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
