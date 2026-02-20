import React, { useEffect, useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import Navbar from "../../components/general/Navbar";
import Footer from "../../components/general/Footer";
import axios from "axios";
import {
  APPLICATION_API_ENDPOINT,
  JOB_API_ENDPOINT,
} from "../../utils/endpoints";
import { toast } from "sonner";
import { useSelector } from "react-redux";

const JobDetails = () => {
  const { id } = useParams();

  const [job, setJob] = useState(null);
  const [isApplied, setIsApplied] = useState(false);
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);

  /* ---------------- FETCH JOB ---------------- */
  useEffect(() => {
    const findJob = async () => {
      try {
        const res = await axios.get(`${JOB_API_ENDPOINT}/${id}`, {
          withCredentials: true,
        });

        if (res.data.success) {
          setJob(res.data.job);
        }
      } catch (error) {
        console.log(error);
      }
    };

    findJob();
  }, [id, isApplied]);

  /* -------- CHECK IF USER HAS APPLIED -------- */
  useEffect(() => {
    if (!job || !user) return;

    const applied = job.applications.some(
      (app) => app.applicant === user._id
    );

    setIsApplied(applied);
  }, [job, user]);

  /* ---------------- APPLY HANDLER ---------------- */
  const applyhandeler = async () => {
    if(!user || user.role !== "Student"){
      toast.error("Please login first");
      navigate("/login");
      return;
    }

    if(!user.profile.resume){
      toast.error("Please upload your resume first");
      navigate("/profile");
      return;
    }
    try {
      const res = await axios.get(
        `${APPLICATION_API_ENDPOINT}/apply/${id}`,
        { withCredentials: true }
      );

      if (res.data.success) {
        toast.success(res.data.message);
        setIsApplied(true);
      }
    } catch (error) {
       console.log(error);
      toast.error("Something went wrong");
    }
  };

  /* ---------------- DATE HELPER ---------------- */
  const posted = (date) => {
    const createdAt = new Date(date);
    const currentDate = new Date();
    const diffTime = Math.abs(currentDate - createdAt);
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  if (!job) {
    return <div className="text-center mt-20">Loading...</div>;
  }

  return (
    <>
      <Navbar />

      {/* Hero Section */}
      <div className="bg-[#6A38C2]/10 border-b">
        <div className="max-w-6xl mx-auto px-6 py-12 flex flex-col md:flex-row gap-8 items-center">
          <img
            src={job.company.logo}
            alt={job.company.name}
            className="h-24 w-24 bg-white  rounded-xl shadow-sm border object-cover"
          />

          <div className="flex-1">
            <h1 className="text-3xl font-bold text-[#6A38C2]">
              {job.title}
            </h1>
            <p className="text-gray-700 mt-1">{job.company.name}</p>
            <p className="text-sm text-gray-500 mt-2">
              {job.location} • {job.jobType}
            </p>
          </div>

          <div className="bg-white border px-4 py-2 rounded-full text-sm text-gray-600 shadow-sm">
            Posted{" "}
            {posted(job.createdAt) === 0
              ? "Today"
              : `${posted(job.createdAt)} days ago`}
          </div>
        </div>
      </div>

      {/* Page Background */}
      <div className="bg-gray-50">
        <div className="max-w-6xl mx-auto px-6 py-12 grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Left Section */}
          <div className="lg:col-span-2 space-y-8">

            {/* Job Overview */}
            <div className="bg-white rounded-2xl shadow-sm p-6 border">
              <h2 className="text-xl font-semibold mb-4 text-[#6A38C2]">
                Job Overview
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-700">
                <p>
                  <span className="font-semibold">Salary:</span> {job.salary}
                </p>
                <p>
                  <span className="font-semibold">Open Positions:</span>{" "}
                  {job.positions}
                </p>
                <p>
                  <span className="font-semibold">Total Applications:</span>{" "}
                  {job.applications.length}
                </p>
              </div>
            </div>

            {/* Description */}
            <div className="bg-white rounded-2xl shadow-sm p-6 border">
              <h2 className="text-xl font-semibold mb-3 text-[#6A38C2]">
                Job Description
              </h2>
              <p className="text-gray-700 leading-relaxed">
                {job.description}
              </p>
            </div>

            {/* Requirements */}
            <div className="bg-white rounded-2xl shadow-sm p-6 border">
              <h2 className="text-xl font-semibold mb-3 text-[#6A38C2]">
                Requirements
              </h2>
              <ul className="list-disc ml-5 space-y-2 text-gray-700">
                {job.requirements.map((req, index) => (
                  <li key={index}>{req}</li>
                ))}
              </ul>
            </div>

          </div>

          {/* Right Section */}
          <div className="space-y-6">

            {/* Application Status */}
            {user && isApplied && (
              <div className="bg-white rounded-2xl shadow-sm p-6 border">
                <h2 className="text-lg font-semibold mb-4 text-[#6A38C2]">
                  Application Status
                </h2>

                {(() => {
                  const myApplication = job.applications.find(
                    (app) => app.applicant === user?._id
                  );

                  const status = myApplication?.status || "pending";

                  return (
                    <span
                      className={`inline-block px-4 py-2 rounded-full text-sm font-semibold ${
                        status === "Accepted"
                          ? "bg-green-100 text-green-700"
                          : status === "Rejected"
                          ? "bg-red-100 text-red-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {status.toUpperCase()}
                    </span>
                  );
                })()}
              </div>
            )}

            {/* Apply Card */}
            <div className="bg-white rounded-2xl shadow-sm p-6 border">
              <button
                onClick={applyhandeler}
                disabled={isApplied}
                className={`w-full py-3 rounded-xl font-semibold text-white transition ${
                  isApplied
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-[#6A38C2] hover:opacity-90"
                }`}
              >
                {isApplied ? "Already Applied" : "Apply Now"}
              </button>

              <p className="text-xs text-gray-500 mt-3 text-center">
                Once applied, you can track your status here.
              </p>
            </div>

          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default JobDetails;
