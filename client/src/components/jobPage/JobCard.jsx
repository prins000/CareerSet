import React from "react";
import { Link } from "react-router-dom";

const JobCard = ({ job }) => {
 
  let posted =(date)=>{
    const createdAt= new Date(date);
    const currentDate= new Date();
    const diffTime= Math.abs(currentDate - createdAt);
    const diffDays= Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  }

  let id=job._id ;
  return (
    <div className="border rounded-2xl p-5 bg-white hover:shadow-lg transition flex flex-col gap-4">
      
      {/* Top Section */}
      <div className="flex items-start gap-4">
        <img
          src={job.logo}
          alt={job.company}
          className="w-14 h-14 rounded-lg object-contain border bg-white"
        />

        <div className="flex-1">
          <h3 className="font-semibold text-lg">{job.title}</h3>
          <p className="text-sm text-gray-500">
            {job.company.name} • {job.location}
          </p>
        </div>
      </div>

      {/* Job Meta */}
      <div className="flex flex-wrap gap-2 text-xs">
        <span className="px-3 py-1 rounded-full bg-gray-100">
          {job.type}
        </span>
        <span className="px-3 py-1 rounded-full bg-gray-100">
          {job.experience}
        </span>
        <span className="px-3 py-1 rounded-full bg-gray-100">
          ₹ {job.salary || "Not Disclosed"}
        </span>
        <span className="px-3 py-1 rounded-full bg-gray-100">
          Posted {posted(job.createdAt)==0?"Today": posted(job.createdAt)+" days ago"}
        </span>
      </div>

      {/* Description */}
      <p className="text-sm text-gray-600 line-clamp-3">
        {job.description}
      </p>

      {/* Actions */}
      <div className="flex gap-3 mt-2">
        <Link
          to={`/jobs/${id}`}
          className="px-4 py-2 text-sm font-semibold border border-[#6A38C2] text-[#6A38C2] rounded-md hover:bg-[#6A38C2] hover:text-white transition"
        >
          View Details
        </Link>
       
        <Link
          to={`/jobs/${id}`}
        >
          <button
            className="px-4 py-2 text-sm font-semibold bg-[#6A38C2] text-white rounded-md hover:bg-[#5b2fb3] transition"
          >
            Apply Now
          </button>
        </Link>
      </div>
    </div>
  );
};

export default JobCard;
