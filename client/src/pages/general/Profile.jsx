import React, { useState } from "react";
import Navbar from "../../components/general/Navbar";
import Footer from "../../components/general/Footer";
import UpdateProfile from "../../components/general/UpdateProfile";
import { Button } from "../../components/ui/button";
import { Mail, Phone, Briefcase } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import MYCompany from "../../components/admin/MYCompany";
import useGetCompany from "../../hooks/useGetCompany";

const Profile = () => {
  const navigate = useNavigate();
  useGetCompany();
  const [open, setOpen] = useState(false);
  const user = useSelector((state) => state.auth.user);
  const role = user?.role;

  // ✅ GUARD: prevent crash on first render
  if (!user || !user.profile) {
    return (
      <>
        <Navbar />
        <div className="flex justify-center items-center h-[60vh]">
          <p className="text-gray-500 text-lg">Loading profile...</p>
        </div>
        <Footer />
      </>
    );
  }


  return (
    <>
      <Navbar />

      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="bg-white rounded-2xl border p-6">
          {/* Top Section */}
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
            <img
              src={user?.profile?.profilePhoto || "/default-avatar.png"}
              alt="Profile"
              className="w-32 h-32 rounded-full border object-cover"
            />

            <div className="flex-1 text-center sm:text-left">
              <h2 className="text-2xl font-bold">{user.fullname}</h2>
              <p className="text-[#6A38C2] font-semibold">{user.role}</p>

              <div className="flex flex-col sm:flex-row gap-4 mt-3 text-sm text-gray-600">
                <span className="flex items-center gap-2">
                  <Mail size={16} /> {user.email}
                </span>
                <span className="flex items-center gap-2">
                  <Phone size={16} /> {user.mobile}
                </span>
              </div>
            </div>

            <Button
              variant="outline"
              className="border-[#6A38C2] text-[#6A38C2]"
              onClick={() => setOpen(true)}
            >
              Edit Profile
            </Button>
          </div>

          {/* Bio */}
          {role === "Student" && (
            <div className="mt-6">
              <h3 className="font-semibold text-lg mb-2">Bio</h3>
              <p className="text-gray-600">
                {user?.profile?.bio || "No bio added"}
              </p>
            </div>
          )}

          {/* Skills */}
          {role === "Student" && (
            <div className="mt-6">
              <h3 className="font-semibold text-lg mb-2">Skills</h3>
              <div className="flex flex-wrap gap-2">
                {user?.profile?.skills?.length > 0 ? (
                  user.profile.skills.map((skill, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 text-sm rounded-full bg-gray-100"
                    >
                      {skill}
                    </span>
                  ))
                ) : (
                  <p className="text-gray-500 text-sm">No skills added</p>
                )}
              </div>
            </div>
          )}

          {/* Resume */}
          {role === "Student" && (
            <div className="mt-6">
              <h3 className="font-semibold text-lg mb-2">Resume</h3>
              {user?.profile?.resume ? (
                <a
                  href={user.profile.resume}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#6A38C2] font-semibold underline"
                >
                  {user.profile.resumename}
                </a>
              ) : (
                <p className="text-gray-500">No resume uploaded</p>
              )}
            </div>
          )}

          {/* Applied Jobs Button */}
          {role === "Student" && (
            <div className="mt-6">
              <button
                onClick={() => navigate("/applications")}
                className="border border-[#6A38C2] text-[#6A38C2] px-5 py-2 rounded-md hover:bg-[#6A38C2] hover:text-white transition"
              >
                View Applied Jobs
              </button>
            </div>
          )}

        </div>
      </div>

     
      <UpdateProfile open={open} setOpen={setOpen} />
      {role === "Recruiter" && <MYCompany />}
      <Footer />
    </>
  );
};

export default Profile;
