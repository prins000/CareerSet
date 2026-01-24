import React from "react";
import JobCard from "./JobCard";
import { useSelector } from "react-redux";

const LatestJobs = () => {
  // Dummy latest jobs data (replace with API later)
  const latestJobs = useSelector((state) => state.job.allJobs);

  return (
    <section className="mx-4 sm:mx-6 md:mx-10 mt-16">
      
      {/* Heading */}
      <div className="text-center mb-10">
        <h2 className="text-3xl md:text-4xl font-bold">
          Latest <span className="text-[#F83002]">Jobs</span>
        </h2>
        <p className="text-gray-600 mt-2">
          Explore the most recently posted job opportunities
        </p>
      </div>

      {/* Jobs Grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {latestJobs.length==0?(<p>No Job Found</p>) : latestJobs.slice(0, 6).map((job) => (
          <JobCard key={job._id} job={job} />
        ))}
      </div>
    </section>
  );
};

export default LatestJobs;
