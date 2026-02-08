import React, { useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Plus, Briefcase, MoreHorizontal } from "lucide-react";
import { JOB_API_ENDPOINT } from "../../utils/endpoints";
import Navbar from "../../components/general/Navbar";
import Footer from "../../components/general/Footer";
import { Button } from "../../components/ui/button";

const AdminJobs = () => {
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const dropdownRef = useRef(null);

  // 🔒 Protect route
  useEffect(() => {
    if (user?.role !== "Recruiter") {
      navigate("/");
    }
  }, [user, navigate]);

  // 📦 Fetch admin jobs
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`${JOB_API_ENDPOINT}/myjob`, {
          withCredentials: true,
        });
        if (res.data.success) {
          setJobs(res.data.jobs);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpenDropdown(null);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  const toggleDropdown = (e, jobId) => {
    e.stopPropagation();
    setOpenDropdown(openDropdown === jobId ? null : jobId);
  };

  return (
    <div>
      <Navbar />
      <div className="min-h-screen bg-gray-50 p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-xl sm:text-2xl font-bold flex items-center gap-2">
            <Briefcase className="w-6 h-6" />
            My Jobs
          </h1>

          <button
            onClick={() => navigate("/admin/jobs/create")}
            className="flex items-center gap-2 bg-black text-white px-3 py-1 sm:px-4 sm:py-2 rounded-lg hover:opacity-90"
          >
            <Plus className="w-4 h-4" />
            Create Job
          </button>
        </div>

        {/* Content */}
        {loading ? (
          <p className="text-gray-500">Loading jobs...</p>
        ) : jobs.length === 0 ? (
          <div className="bg-white p-6 rounded-xl text-center">
            <p className="text-gray-600 mb-4">
              You haven’t created any jobs yet.
            </p>
            <button
              onClick={() => navigate("/admin/jobs/create")}
              className="bg-black text-white px-4 py-2 rounded-lg"
            >
              Create your first job
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4">
            {jobs.map((job) => (
              <div
                key={job._id}
                className="bg-white rounded-xl p-5 flex justify-between items-center shadow-sm hover:shadow-md transition"
              >
                <div>
                  <h2 className="text-[18px] sm:text-lg font-semibold">
                    {job.title}
                  </h2>
                  <p className="text-sm text-gray-500">
                    {job.company?.name} • {job.location}
                  </p>
                  <p className="text-sm text-gray-500">
                    Applicants: {job.applications?.length || 0}
                  </p>
                </div>

                <div className="sm:flex hidden gap-3">
                  <button
                  
                    onClick={() => navigate(`/admin/${job._id}/applications`)}
                    className="px-3 py-1 text-sm border rounded-lg hover:bg-gray-100"
                  >
                    Applicants
                  </button>
                  <button
                    onClick={() => navigate(`/admin/job/${job._id}`)}
                    className="px-3 text-purple-700 py-1 text-sm border rounded-lg hover:bg-gray-100"
                  >
                    View
                  </button>
                </div>

                <div className="sm:hidden flex" ref={dropdownRef}>
                  <div className="relative">
                    <Button
                      variant="ghost"
                      className="h-8 w-8 p-0"
                      onClick={(e) => toggleDropdown(e, job._id)}
                    >
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>

                    {openDropdown === job._id && (
                      <div className="absolute right-0 top-10 bg-white border border-gray-200 rounded-lg shadow-lg z-50 min-w-[120px]">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            navigate(`/admin/${job._id}/applications`);
                            setOpenDropdown(null);
                          }}
                          className="w-full text-left px-3 py-2 text-sm hover:bg-gray-100 rounded-t-lg"
                        >
                          Applicants
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            navigate(`/admin/job/${job._id}`);
                            setOpenDropdown(null);
                          }}
                          className="w-full text-left px-3 py-2 text-sm hover:bg-gray-100 rounded-b-lg"
                        >
                          View
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default AdminJobs;
