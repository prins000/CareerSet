import React from "react";
import { useParams } from "react-router-dom";
import Navbar from "@/components/general/Navbar";
import Footer from "@/components/general/Footer";


const JobDetails = () => {

 const jobs = [
  {
    _id: "1",
    title: "Frontend Developer",
    description:
      "We are looking for a Frontend Developer who is proficient in React and Tailwind CSS.",
    requirements: [
      "Strong knowledge of React",
      "Good understanding of JavaScript",
      "Experience with Tailwind CSS",
    ],
    salary: "10–15 LPA",
    location: "Remote",
    jobType: "Full-time",
    position: 2,
    company: {
      name: "Google",
      logo: "https://logo.clearbit.com/google.com",
    },
    createdBy: "admin",
    createdAt: "2026-01-08",
  },

  {
    _id: "2",
    title: "Backend Developer",
    description:
      "Backend developer needed with experience in Node.js and MongoDB.",
    requirements: [
      "Node.js",
      "MongoDB",
      "REST APIs",
    ],
    salary: "12–18 LPA",
    location: "Bangalore",
    jobType: "Full-time",
    position: 1,
    company: {
      name: "Microsoft",
      logo: "https://logo.clearbit.com/microsoft.com",
    },
    createdBy: "admin",
    createdAt: "2026-01-07",
  },
];



  const { id } = useParams();
  const job = jobs.find((job) => job._id == id);

  if (!job) {
    return <div className="text-center mt-20">Job not found</div>;
  }

  return (
    <>
      <Navbar />

      <div className="max-w-5xl mx-auto px-4 py-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row gap-6 items-start">
          <img
            src={job.company.logo}
            alt={job.company.name}
            className="w-20 h-20 object-contain"
          />

          <div>
            <h1 className="text-2xl font-bold">{job.title}</h1>
            <p className="text-gray-600">{job.company.name}</p>
            <p className="text-sm text-gray-500 mt-1">
              {job.location} • {job.jobType}
            </p>
          </div>
        </div>

        {/* Job Info */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          <p>
            <span className="font-semibold">Salary:</span> {job.salary}
          </p>
          <p>
            <span className="font-semibold">Open Positions:</span>{" "}
            {job.position}
          </p>
        </div>

        {/* Description */}
        <div className="mt-6">
          <h2 className="text-lg font-semibold mb-2">Job Description</h2>
          <p className="text-gray-700">{job.description}</p>
        </div>

        {/* Requirements */}
        <div className="mt-6">
          <h2 className="text-lg font-semibold mb-2">Requirements</h2>
          <ul className="list-disc ml-5 text-gray-700">
            {job.requirements.map((req, index) => (
              <li key={index}>{req}</li>
            ))}
          </ul>
        </div>

        {/* Apply Button */}
        <div className="mt-8">
          <button className="bg-[#6A38C2] text-white px-6 py-3 rounded-md hover:opacity-90 transition">
            Apply Now
          </button>
        </div>
      </div>

      <Footer/>
    </>
  );
};

export default JobDetails;
