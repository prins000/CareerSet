import React from "react";
import Navbar from "../../components/general/Navbar";
import Footer from "../../components/general/Footer";
import UpdateProfile from "../../components/general/UpdateProfile";
import { Button } from "../../components/ui/button";
import { useState } from "react";
import { Mail, Phone, Briefcase } from "lucide-react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import MYCompany from "../../components/admin/MYCompany";
import useGetCompany from "../../hooks/useGetCompany";


const Profile = () => {
  const [showAppliedJobs, setShowAppliedJobs] = useState(false);
  const[open,setOpen]=useState(false);
   
   useGetCompany();
  const user = useSelector((state)=>state.auth.user);
  const role = user?.role;
   
  const appliedJobs = [
    {
      id: 1,
      title: "Frontend Developer",
      company: "Google",
      location: "Remote",
      type: "Full Time",
      status: "Under Review",
      appliedDate: "10 Jan 2026",
    },
    {
      id: 2,
      title: "Software Engineer Intern",
      company: "Microsoft",
      location: "Bangalore",
      type: "Internship",
      status: "Shortlisted",
      appliedDate: "05 Jan 2026",
    },
    {
      id: 3,
      title: "React Developer",
      company: "Amazon",
      location: "Hyderabad",
      type: "Full Time",
      status: "Rejected",
      appliedDate: "01 Jan 2026",
    },
  ];

  return (
    <>
      <Navbar />

      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="bg-white rounded-2xl border p-6">
          {/* Top Section */}
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
            <img
              src={user.profile.profilePhoto}
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
          {role==="Student" &&
          <div className="mt-6">
            <h3 className="font-semibold text-lg mb-2">Bio</h3>
            <p className="text-gray-600">{user.profile.bio}</p>
          </div>
}
          {/* Skills */}
          {
            role==="Student" &&
          <div className="mt-6">
            <h3 className="font-semibold text-lg mb-2">Skills</h3>
            <div className="flex flex-wrap gap-2">
              {user.profile.skills.map((skill, index) => (
                <span
                  key={index}
                  className="px-3 py-1 text-sm rounded-full bg-gray-100"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
          }

          {/* Resume */}
          { role==="Student" &&
             <div className="mt-6">
            <h3 className="font-semibold text-lg mb-2">Resume</h3>
            {user.profile.resume ? (
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
          }

          {/*applied job (only student)*/}

          {user.role === "Student" && (
            <div className="mt-6">
              <button
                onClick={() => setShowAppliedJobs(!showAppliedJobs)}
                className="border border-[#6A38C2] text-[#6A38C2] px-5 py-2 rounded-md hover:bg-[#6A38C2] hover:text-white transition"
              >
                {showAppliedJobs ? "Hide Applied Jobs" : "View Applied Jobs"}
              </button>
            </div>
          )}

          {/* Company (Only Recruiter) */}
          {user.role === "Recruiter" && user.profile.company && (
            <div className="mt-6">
              <h3 className="font-semibold text-lg mb-2">Company</h3>
              <div className="flex items-center gap-2 text-gray-600">
                <Briefcase size={16} />
                <span>{user.profile.company}</span>
              </div>
            </div>
          )}
        </div>
      </div>

      {appliedJobs.length == 0 || appliedJobs==null ? (
        <div className=" flex flex-col items-center justify-center gap-5 mt-10">
          <h2 className="text-xl">You have not applied any job</h2>
          <Link to={'/jobs'} className="w-full sm:w-auto">
            <Button className="w-full sm:w-auto bg-[#6A38C2] hover:bg-[#5a2fa8] px-6 py-5 text-sm sm:text-base">
              Browse Jobs
            </Button>
          </Link>
        </div>
      ) : (
        showAppliedJobs &&
        role === "Student" && (
          <div className="mt-8 mx-12">
            <h3 className="text-xl font-semibold mb-4">Applied Jobs</h3>

            <div className="overflow-x-auto flex justify-center">
              <table className=" w-full border text-sm">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="border px-4 py-2 text-left">Job Title</th>
                    <th className="border px-4 py-2">Company</th>
                    <th className="border px-4 py-2">Location</th>
                    <th className="border px-4 py-2">Type</th>
                    <th className="border px-4 py-2">Status</th>
                    <th className="border px-4 py-2">Applied On</th>
                  </tr>
                </thead>

                <tbody>
                  {appliedJobs.map((job) => (
                    <tr key={job.id} className="text-center">
                      <td className="border px-4 py-2 text-left font-medium">
                        {job.title}
                      </td>
                      <td className="border px-4 py-2">{job.company}</td>
                      <td className="border px-4 py-2">{job.location}</td>
                      <td className="border px-4 py-2">{job.type}</td>
                      <td
                        className={`border px-4 py-2 font-semibold ${
                          job.status === "Rejected"
                            ? "text-red-500"
                            : job.status === "Shortlisted"
                            ? "text-green-600"
                            : "text-yellow-600"
                        }`}
                      >
                        {job.status}
                      </td>
                      <td className="border px-4 py-2">{job.appliedDate}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )
      )}
        <UpdateProfile open={open} setOpen={setOpen} />
        {role==='Recruiter' && <MYCompany/>}
      <Footer />
    </>
  );
};

export default Profile;
