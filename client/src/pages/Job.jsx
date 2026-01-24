import React, { useState } from "react";
import Navbar from "@/components/general/Navbar";
import JobCard from "@/components/jobPage/JobCard";
import Footer from "@/components/general/Footer";
import { useSelector } from "react-redux";

const Jobs = () => {
const dummyJobs = useSelector((state) => state.job.allJobs);
  const [search, setSearch] = useState("");
  const [location, setLocation] = useState("All");
  const [type, setType] = useState("All");
  const [experience, setExperience] = useState("All");


  const filteredJobs = dummyJobs.filter((job) => {
  return (
    job.title.toLowerCase().includes(search.toLowerCase()) &&
    (location === "All" ||
      job.location.toLowerCase().includes(location.toLowerCase())) &&
    (type === "All" ||
      job.jobType.toLowerCase() === type.toLowerCase())
  );
});


  return (
    <>
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-6">

          {/* LEFT FILTER */}
          <div className="w-full md:w-[25%]   border rounded-xl p-4 h-fit">
            <h2 className="font-bold text-lg mb-4">Filter Jobs</h2>

            {/* Search */}
            <input
              type="text"
              placeholder="Search job title..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full border rounded-md px-3 py-2 text-sm mb-4"
            />

            {/* Location */}
            <div className="mb-4">
              <label className="text-sm font-semibold">Location</label>
              <select
                className="w-full border rounded-md px-2 py-1 text-sm mt-1"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              >
                <option>All</option>
                <option>Remote</option>
                <option>Bangalore</option>
                <option>Hyderabad</option>
                <option>Noida</option>
              </select>
            </div>

            {/* Job Type */}
            <div className="mb-4">
              <label className="text-sm font-semibold">Job Type</label>
              <select
                className="w-full border rounded-md px-2 py-1 text-sm mt-1"
                value={type}
                onChange={(e) => setType(e.target.value)}
              >
                <option>All</option>
                <option>Full-Time</option>
                <option>Internship</option>
                <option>Part-Time</option>
              </select>
            </div>

            {/* Experience */}
            <div>
              <label className="text-sm font-semibold">Experience</label>
              <select
                className="w-full border rounded-md px-2 py-1 text-sm mt-1"
                value={experience}
                onChange={(e) => setExperience(e.target.value)}
              >
                <option>All</option>
                <option>Fresher</option>
                <option>1-3 Years</option>
                <option>3+ Years</option>
              </select>
            </div>
          </div>

          {/* RIGHT JOB LIST */}
          <div className="w-full md:w-[75%] md:max-h-screen overflow-y-auto">
            <h2 className="font-bold text-xl mb-4">
              Available Jobs ({filteredJobs.length})
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {filteredJobs.map((job) => (
                <JobCard key={job._id} job={job} />
              ))}
            </div>
          </div>

        </div>
      </div>
      <Footer/>
    </>
  );
};

export default Jobs;