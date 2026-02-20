import React, { useState, useEffect } from "react";
import Navbar from "../../components/general/Navbar";
import Footer from "../../components/general/Footer";
import UpdateProfile from "../../components/general/UpdateProfile";
import { Button } from "../../components/ui/button";
import { Mail, Phone } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import MYCompany from "../../components/admin/MYCompany";
import useGetCompany from "../../hooks/useGetCompany";

const Profile = () => {
  const navigate = useNavigate();
  useGetCompany();
  const [open, setOpen] = useState(false);
  const user = useSelector((state) => state.auth.user);
  const role = user?.role;

  // Handle hash scrolling to companies section
  useEffect(() => {
    const scrollToCompanies = () => {
      if (window.location.hash === "#companies") {
        const element = document.getElementById("companies");
        if (element) {
          setTimeout(() => {
            element.scrollIntoView({ behavior: "smooth" });
          }, 100);
        }
      }
    };

    // Check on mount
    scrollToCompanies();

    // Listen for hash changes
    window.addEventListener("hashchange", scrollToCompanies);
    
    // Cleanup listener
    return () => window.removeEventListener("hashchange", scrollToCompanies);
  }, []);

  // Prevent crash on first render
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

      <div className="bg-gray-50 h-fit">
        <div className="max-w-5xl mx-auto px-4 py-10">
          <div className="bg-white rounded-2xl border shadow-sm p-6 md:p-8">

            {/* Top Section */}
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
              <img
                src={user?.profile?.profilePhoto || "/default-avatar.png"}
                alt="Profile"
                className="w-32 h-32 rounded-full border-2 border-gray-100 object-cover shadow-sm"
              />

              <div className="flex-1 text-center sm:text-left">
                <h2 className="text-3xl font-bold text-gray-800">
                  {user.fullname}
                </h2>
                <p className="text-[#6A38C2] font-semibold text-lg mt-1">
                  {user.role}
                </p>

                <div className="flex flex-col sm:flex-row gap-4 mt-4 text-sm text-gray-600">
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
                className="border-[#6A38C2] text-[#6A38C2] hover:bg-[#6A38C2] hover:text-white transition"
                onClick={() => setOpen(true)}
              >
                Edit Profile
              </Button>
            </div>

            {/* Bio */}
            {role === "Student" && (
              <div className="mt-8">
                <h3 className="font-semibold text-xl mb-2 text-[#6A38C2]">
                  Bio
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {user?.profile?.bio || "No bio added"}
                </p>
              </div>
            )}

            {/* Skills */}
            {role === "Student" && (
              <div className="mt-8">
                <h3 className="font-semibold text-xl mb-3 text-[#6A38C2]">
                  Skills
                </h3>

                <div className="flex flex-wrap gap-2">
                  {user?.profile?.skills?.length > 0 ? (
                    user.profile.skills.map((skill, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 text-sm rounded-full bg-purple-50 text-[#6A38C2] border border-purple-100"
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
              <div className="mt-8">
                <h3 className="font-semibold text-xl mb-2 text-[#6A38C2]">
                  Resume
                </h3>

                {user?.profile?.resume ? (
                  <a
                    href={user.profile.resume}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block text-black font-medium border-b border-[#6A38C2] hover:opacity-80 transition"
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
              <div className="mt-8">
                <button
                  onClick={() => navigate("/applications")}
                  className="border border-[#6A38C2] text-[#6A38C2] px-5 py-2 rounded-lg hover:bg-[#6A38C2] hover:text-white transition font-medium"
                >
                  View Applied Jobs
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <UpdateProfile open={open} setOpen={setOpen} />
      {role === "Recruiter" && <div id="companies"><MYCompany /></div>}
      <Footer />
    </>
  );
};

export default Profile;
