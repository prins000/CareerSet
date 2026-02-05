import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Navbar from "../../components/general/Navbar";
import Footer from "../../components/general/Footer";
import { Button } from "../../components/ui/button";
import { Badge } from "../../components/ui/badge";
import { Mail, Phone, FileText } from "lucide-react";
import { APPLICATION_API_ENDPOINT } from "../../utils/endpoints";
import { toast } from "sonner";

const AdminApplicants = () => {
  const { jobId } = useParams();
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchApplicants = async () => {
      try {
        setLoading(true);
        const res = await axios.get(
          `${APPLICATION_API_ENDPOINT}/applicants/${jobId}`,
          { withCredentials: true },
        );
        if (res.data.success) {
          setApplications(res.data.app);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchApplicants();
  }, [jobId]);

  const updateStatus = async (applicationId, status) => {
    try {
      const res = await axios.put(
        `${APPLICATION_API_ENDPOINT}/update/${applicationId}`,
        { status },
        { withCredentials: true },
      );

      if (res.data.success) {
        setApplications((prev) =>
          prev.map((app) =>
            app._id === applicationId ? { ...app, status } : app,
          ),
        );
        toast.success(res.data.message);
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to update application status");
    }
  };

  return (
    <>
      <Navbar />

      <div className="max-w-6xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6">Applicants</h1>

        {loading ? (
          <p className="text-gray-500">Loading applicants...</p>
        ) : applications.length === 0 ? (
          <p className="text-gray-500">No applicants yet.</p>
        ) : (
          <div className="space-y-4">
            {applications.map((app) => {
              const user = app.applicant;

              return (
                <div
                  key={app._id}
                  className="bg-white rounded-xl border p-5 flex flex-col sm:flex-row gap-5 sm:items-center justify-between"
                >
                  {/* Left */}
                  <div className="flex gap-4 items-center">
                    <img
                      src={user.profile?.profilePhoto}
                      alt="profile"
                      className="w-14 h-14 rounded-full object-cover border"
                    />

                    <div>
                      <h3 className="font-semibold">{user.fullname}</h3>

                      <div className="text-sm text-gray-500 flex flex-col gap-1">
                        <span className="flex items-center gap-2">
                          <Mail size={14} /> {user.email}
                        </span>
                        <span className="flex items-center gap-2">
                          <Phone size={14} /> {user.mobile}
                        </span>
                      </div>

                      {/* Skills */}
                      <div className="flex flex-wrap gap-2 mt-2">
                        {user.profile.skills?.slice(0, 4).map((skill, i) => (
                          <span
                            key={i}
                            className="text-xs px-2 py-1 bg-gray-100 rounded-full"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Right */}
                  <div className="flex flex-col sm:items-end gap-3">
                    {/* Status */}
                    <Badge
                      className={`w-fit ${
                        app.status === "Accepted"
                          ? "bg-green-100 text-green-700"
                          : app.status === "Rejected"
                            ? "bg-red-100 text-red-700"
                            : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {app.status}
                    </Badge>

                    {/* Resume */}
                    {user.profile.resume && (
                      <a
                        href={user.profile.resume}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-sm text-[#6A38C2] underline"
                      >
                        <FileText size={14} />
                        {user.profile.resumename || "View Resume"}
                      </a>
                    )}

                    {/* Actions */}
                    {app.status === "Pending" && (
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          className="bg-green-600 hover:bg-green-700"
                          onClick={() => updateStatus(app._id, "Accepted")}
                        >
                          Accept
                        </Button>

                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => updateStatus(app._id, "Rejected")}
                        >
                          Reject
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      <Footer />
    </>
  );
};

export default AdminApplicants;
