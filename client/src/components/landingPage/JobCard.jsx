import React from "react";
import { Button } from "../ui/button";
import { MapPin, Briefcase } from "lucide-react";
import { Link } from "react-router-dom";

const JobCard = ({ job }) => {
  const id = job._id;

  return (
    <div className="border border-gray-200 rounded-xl p-5 flex flex-col gap-4 bg-white hover:shadow-sm transition">

      {/* Company */}
      <div>
        <h3 className="text-lg font-semibold text-gray-800">
          {job.title}
        </h3>
        <p className="text-sm text-gray-500">
          {job.company.name}
        </p>
      </div>

      {/* Meta */}
      <div className="flex flex-wrap gap-4 text-sm text-gray-600">
        <span className="flex items-center gap-1">
          <MapPin className="w-4 h-4 text-[#6A38C2]" />
          {job.location}
        </span>
        <span className="flex items-center gap-1">
          <Briefcase className="w-4 h-4 text-[#6A38C2]" />
          {job.jobType}
        </span>
      </div>

     

      {/* Actions */}
      <div className="mt-auto">
        <Link to={`/jobs/${id}`}>
          <Button
            variant="ghost"
            className="w-full text-[#6A38C2] bg-[#6A38C2]/10 hover:bg-[#6A38C2]/20"
          >
            View Details
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default JobCard;
