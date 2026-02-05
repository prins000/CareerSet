import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../../components/general/Navbar";
import Footer from "../../components/general/Footer";
import { Badge } from "../../components/ui/badge";
import { Briefcase, MapPin, Calendar } from "lucide-react";
import { APPLICATION_API_ENDPOINT } from "../../utils/endpoints";
import { Link } from "react-router-dom";
import { Eye } from "lucide-react";

const MyApplications = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`${APPLICATION_API_ENDPOINT}/get`, {
          withCredentials: true,
        });
        if (res.data.success) {
          setApplications(res.data.app);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, []);

  return (
    <>
      <Navbar />

      <div className="max-w-5xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6">My Applications</h1>

        {loading ? (
          <p className="text-gray-500">Loading applications...</p>
        ) : applications.length === 0 ? (
          <p className="text-gray-500">You haven’t applied to any jobs yet.</p>
        ) : (
          <div className="space-y-4">
            {applications.map((app) => (
              <div
                key={app._id}
                className="bg-white border rounded-xl p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                {/* Left */}
                <div>
                  <h2 className="text-lg font-semibold">{app.job.title}</h2>

                  <p className="text-sm text-gray-500">
                    {app.job.company.name}
                  </p>

                  <div className="flex flex-wrap gap-4 text-sm text-gray-500 mt-2">
                    <span className="flex items-center gap-1">
                      <MapPin size={14} />
                      {app.job.location}
                    </span>

                    <span className="flex items-center gap-1">
                      <Briefcase size={14} />
                      {app.job.jobType}
                    </span>

                    <span className="flex items-center gap-1">
                      <Calendar size={14} />
                      {new Date(app.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>

                {/* Right */}
             
                <div className="flex items-center gap-3">
                  <Badge
                    className={`${
                      app.status === "Accepted"
                        ? "bg-green-100 text-green-700"
                        : app.status === "Rejected"
                          ? "bg-red-100 text-red-700"
                          : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {app.status}
                  </Badge>

                  <Link
                    to={`/jobs/${app.job._id}`}
                    className="flex items-center gap-1 rounded-xl 
               px-3 py-1.5 text-sm font-medium text-gray-700
               hover:bg-purple-50 transition"
                  >
                    <Eye size={16} />
                     
                  </Link>
                </div>

              </div>
            ))}
          </div>
        )}
      </div>

      <Footer />
    </>
  );
};

export default MyApplications;
