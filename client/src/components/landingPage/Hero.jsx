import React, { useState } from "react";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";
import { Search } from "lucide-react";

const Hero = () => {
  const [query, setQuery] = useState("");

  return (
    <section className="mx-4 sm:mx-6 md:mx-10 mt-12 md:mt-16">
      <div className="flex flex-col items-center text-center gap-5 md:gap-6">

        {/* Badge */}
        <span className="px-4 py-1 rounded-full bg-[#6A38C2]/10 text-[#6A38C2] text-xs sm:text-sm font-medium">
          #1 Job Portal for Developers
        </span>

        {/* Heading */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight max-w-3xl">
          Find Your <span className="text-[#F83002]">Dream Job</span> <br />
          Build Your Career with{" "}
          <span className="text-[#6A38C2]">JobPortal</span>
        </h1>

        {/* Description */}
        <p className="text-gray-600 text-sm sm:text-base max-w-xl md:max-w-2xl">
          Explore thousands of job opportunities from top companies.
          Apply easily, track your applications, and get hired faster.
        </p>

        {/* Search Box */}
        <div className="w-full max-w-xl mt-2">
          <div className="flex items-center bg-white border rounded-full px-4 py-2 shadow-sm">
            <Search className="text-gray-400 w-4 h-4 mr-2" />
            <input
              type="text"
              placeholder="Search jobs by title, company, or skill"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full outline-none text-sm sm:text-base"
            />
          </div>
        </div>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-3 md:mt-4 w-full sm:w-auto">
          <Link to={`/jobs?search=${query}`} className="w-full sm:w-auto">
            <Button className="w-full sm:w-auto bg-[#6A38C2] hover:bg-[#5a2fa8] px-6 py-5 text-sm sm:text-base">
              Browse Jobs
            </Button>
          </Link>

          <Link to="/register" className="w-full sm:w-auto">
            <Button
              variant="outline"
              className="w-full sm:w-auto px-6 py-5 text-sm sm:text-base border-[#6A38C2] text-[#6A38C2] hover:bg-[#6A38C2]/10"
            >
              Get Started
            </Button>
          </Link>
        </div>

      </div>
    </section>
  );
};

export default Hero;
