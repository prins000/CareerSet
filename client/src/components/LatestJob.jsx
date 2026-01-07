import React from "react";
import JobCard from "./JobCard";

const LatestJobs = () => {
  // Dummy latest jobs data (replace with API later)
  const latestJobs = [
    {
      id: 1,
      title: "Frontend Developer",
      company: "Google",
      location: "Bangalore, India",
      type: "Full Time",
      salary: "18 LPA",
    },
    {
      id: 2,
      title: "Backend Engineer",
      company: "Amazon",
      location: "Hyderabad, India",
      type: "Full Time",
      salary: "22 LPA",
    },
    {
      id: 3,
      title: "Full Stack Developer",
      company: "Microsoft",
      location: "Remote",
      type: "Full Time",
      salary: "25 LPA",
    },
    {
      id: 4,
      title: "React Developer",
      company: "Flipkart",
      location: "Bangalore, India",
      type: "Internship",
      salary: "8 LPA",
    },
    {
      id: 5,
      title: "Software Engineer",
      company: "Uber",
      location: "Pune, India",
      type: "Full Time",
      salary: "20 LPA",
    },
    {
      id: 6,
      title: "SDE Intern",
      company: "Swiggy",
      location: "Remote",
      type: "Internship",
      salary: "6 LPA",
    },
  ];

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
        {latestJobs.slice(0, 6).map((job) => (
          <JobCard key={job.id} job={job} />
        ))}
      </div>
    </section>
  );
};

export default LatestJobs;
