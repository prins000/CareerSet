import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "@/components/general/Navbar";
import Footer from "@/components/general/Footer";
import axios from "axios";
import { JOB_API_ENDPOINT } from "@/utils/endpoints";


const JobDetails = () => { 
  const { id } = useParams();
  const [job, setJob] = useState(null);
  
   useEffect(()=>{
    const findJob=async()=>{
      try {
         const res= await axios.get(`${JOB_API_ENDPOINT}/${id}`,{
          withCredentials:true,
         });

         console.log(res.data);
         
         if(res.data.success){
          setJob(res.data.job);
         }
      } catch (error) {
        console.log(error);
      }
     }
     findJob();
   },[])

  if (!job) {
    return <div className="text-center mt-20">Job not found</div>;
  }

  let posted =(date)=>{
    const createdAt= new Date(date);
    const currentDate= new Date();
    const diffTime= Math.abs(currentDate - createdAt);
    const diffDays= Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
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
          <span className="px-3 py-1 rounded-full bg-gray-100">
          Posted {posted(job.createdAt)==0?"Today": posted(job.createdAt)+" days ago"}
        </span>
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
