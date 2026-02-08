import React, { useState } from "react";
import Navbar from "../../components/general/Navbar";
import JobCard from "../../components/jobPage/JobCard";
import Footer from "../../components/general/Footer";
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

      <div className="bg-gray-50 min-h-screen">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row gap-6">

            {/* LEFT FILTER */}
            <div className="w-full md:w-[25%] bg-white border rounded-2xl p-5 h-fit shadow-sm md:sticky md:top-24">
              <h2 className="font-semibold text-lg mb-5 text-[#6A38C2]">
                Filter Jobs
              </h2>

              {/* Search */}
              <input
                type="text"
                placeholder="Search job title..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full border rounded-lg px-3 py-2 text-sm mb-4 focus:outline-none focus:ring-2 focus:ring-[#6A38C2]/30"
              />

              {/* Location */}
              <div className="mb-4">
                <label className="text-sm font-medium text-gray-700">
                  Location
                </label>
                <select
                  className="w-full border rounded-lg px-3 py-2 text-sm mt-1 focus:outline-none focus:ring-2 focus:ring-[#6A38C2]/30"
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
                <label className="text-sm font-medium text-gray-700">
                  Job Type
                </label>
                <select
                  className="w-full border rounded-lg px-3 py-2 text-sm mt-1 focus:outline-none focus:ring-2 focus:ring-[#6A38C2]/30"
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
                <label className="text-sm font-medium text-gray-700">
                  Experience
                </label>
                <select
                  className="w-full border rounded-lg px-3 py-2 text-sm mt-1 focus:outline-none focus:ring-2 focus:ring-[#6A38C2]/30"
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
            <div className="w-full md:w-[75%]">
              <h2 className="font-semibold text-2xl mb-6 text-[#6A38C2]">
                Available Jobs ({filteredJobs.length})
              </h2>

              {filteredJobs.length === 0 ? (
                <div className="bg-white border rounded-2xl p-10 text-center text-gray-500 shadow-sm">
                  No jobs found matching your filters.
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {filteredJobs.map((job) => (
                    <JobCard key={job._id} job={job} />
                  ))}
                </div>
              )}
            </div>

          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Jobs;
