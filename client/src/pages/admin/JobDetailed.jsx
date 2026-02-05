import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { JOB_API_ENDPOINT } from "../../utils/endpoints";
import UpdateJob from "../../components/admin/UpdateJob.jsx";
import {
  ArrowLeft,
  Loader2,
  MapPin,
  Users,
  IndianRupee,
  CalendarDays,
  PenIcon,
} from "lucide-react";
import { toast } from "sonner";

const JobDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  let [open, setOpen] = useState(false);

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const res = await axios.get(`${JOB_API_ENDPOINT}/${id}`, {});

        if (res.data.success) {
          setJob(res.data.job);
        }
      } catch {
        toast.error("Unable to load job details");
      } finally {
        setLoading(false);
      }
    };

    fetchJob();
  }, [id]);

  if (loading) {
    return (
      <div className="flex h-[70vh] items-center justify-center">
        <Loader2 className="h-7 w-7 animate-spin text-purple-800" />
      </div>
    );
  }

  if (!job) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-purple-100 px-6 py-10">
      <div className="mx-auto max-w-6xl space-y-8">
        {/* Back */}

        <div className="flex justify-between items-center mb-6">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-purple-800 font-medium hover:underline"
          >
            <ArrowLeft size={18} />
            Back
          </button>

          <button
            onClick={() => setOpen(true)}
            className="flex items-center gap-2 rounded-xl px-3 py-1.5 text-sm font-medium
             text-purple-700 bg-purple-50 border border-purple-200
             hover:bg-purple-100 hover:shadow-sm transition"
          >
            <PenIcon className="size-4" />
            Edit
          </button>
        </div>

        {/* Hero */}
        <div className="rounded-3xl bg-white/80 backdrop-blur p-8 shadow-lg border border-purple-100">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 tracking-tight">
                {job.title}
              </h1>
              <p className="mt-2 text-gray-600 text-lg">
                {job.company?.name} • {job.location}
              </p>
            </div>

            <div className="flex gap-3 flex-wrap">
              <span className="rounded-full bg-purple-100 px-4 py-1 text-sm font-medium text-purple-700">
                {job.jobType}
              </span>

              <span className="rounded-full bg-purple-100 px-4 py-1 text-sm font-medium text-purple-700">
                {job.positions} Positions
              </span>
            </div>
          </div>
        </div>

        {/* Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="rounded-2xl bg-white p-6 shadow-md border">
            <IndianRupee className="text-purple-800 mb-2" />
            <p className="text-sm text-gray-500">Salary</p>
            <p className="font-semibold text-gray-900">
              {job.salary || "Not disclosed"}
            </p>
          </div>

          <div className="rounded-2xl bg-white p-6 shadow-md border">
            <Users className="text-purple-800 mb-2" />
            <p className="text-sm text-gray-500">Applicants</p>
            <p className="font-semibold text-gray-900">
              {job.applications?.length || 0}
            </p>
          </div>

          <div className="rounded-2xl bg-white p-6 shadow-md border">
            <MapPin className="text-purple-800 mb-2" />
            <p className="text-sm text-gray-500">Location</p>
            <p className="font-semibold text-gray-900">{job.location}</p>
          </div>

          <div className="rounded-2xl bg-white p-6 shadow-md border">
            <CalendarDays className="text-purple-800 mb-2" />
            <p className="text-sm text-gray-500">Posted On</p>
            <p className="font-semibold text-gray-900">
              {new Date(job.createdAt).toLocaleDateString()}
            </p>
          </div>
        </div>

        {/* Description */}
        <div className="rounded-3xl bg-white p-8 shadow-lg border">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            Job Description
          </h2>
          <p className="text-gray-600 leading-relaxed text-[15px]">
            {job.description}
          </p>
        </div>

        {/* Requirements */}
        <div className="rounded-3xl bg-white p-8 shadow-lg border">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            Requirements
          </h2>
          <div className="space-y-3">
            {job.requirements?.map((req, index) => (
              <div
                key={index}
                className="flex gap-3 items-start rounded-xl bg-purple-50 px-4 py-3 text-gray-700"
              >
                <span className="text-purple-800 font-bold">•</span>
                <span>{req}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-wrap gap-4">
          <button
            onClick={() => navigate(-1)}
            className="rounded-xl border px-8 py-3 text-gray-600 hover:bg-gray-100 transition"
          >
            Back
          </button>

          <button
            onClick={() => navigate(`/admin/${job._id}/applications`)}
            className="rounded-xl text-purple-600 border px-2 font-medium hover:bg-gray-100 transition"
          >
            View Applicants
          </button>

        </div>
      </div>
      <UpdateJob open={open} setOpen={setOpen} job={job} />
    </div>
  );
};

export default JobDetail;
