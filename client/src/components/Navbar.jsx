import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar.jsx";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Button } from "./ui/button.jsx";
import { LogOut, User2 } from "lucide-react";
import { Link } from "react-router-dom";

const Navbar = () => {

  let loged=false;
  return (
    <div>
      <div className="flex mx-10 my-3 justify-between items-center">
        <h1 className="font-bold text-xl">
          Job<span className="text-red-500">Portal</span>
        </h1>
        <div className="flex items-center gap-5">
          <ul className="font-medium flex gap-6">
            <li>Home</li>
            <li>Jobs</li>
            <li>Browse</li>
          </ul>
           

           {
            loged?(
                <Popover>
            <PopoverTrigger>
              <Avatar className="cursor-pointer">
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </PopoverTrigger>
            <PopoverContent>
              <div className="flex gap-2">
                <Avatar className="cursor-pointer size-10">
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>

                <div className="flex flex-col">
                    <h4 className=" text-sm font-semibold">
                        UserName
                    </h4>
                    <h6 className="font-light text-sm">User's Bio</h6>
                </div>
              </div>
              <div className="flex flex-col items-start gap-0 mt-1.5 ">
                        <Button className="  size-{1px} " variant="link"  >
                           <User2/> View Profile
                        </Button>
                         <Button className="  size-{1px}" variant="link" >
                            <LogOut/>
                            Logout
                        </Button>
                    </div>
            </PopoverContent>
          </Popover>
            ):(
              <div className="flex gap-1.5  items-center">
                <Link to="/login">
                  <Button className="w-20 " variant="outline">Login</Button>
                </Link>
                <Link to="/register">
                  <Button className="w-20 bg-purple-700  hover:bg-purple-800 ">SignUp</Button>
                </Link>

                
              </div>
            )
           }
         
        </div>
      </div>
    </div>
  );
};

export default Navbar;
