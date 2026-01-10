import React, { useState } from "react";
import Navbar from "@/components/general/Navbar";
import JobCard from "@/components/jobPage/JobCard";
import Footer from "@/components/general/Footer";

const Jobs = () => {
const dummyJobs = [
  {
    id: 1,
    title: "Frontend Developer",
    company: "Google",
    logo: "https://www.freepik.com/free-vector/logo-with-curly-arrow_836212.htm#fromView=keyword&page=1&position=1&uuid=08d7e3a3-faab-4d34-85f0-2864571b84a4&query=Company+logo",
    image: "https://source.unsplash.com/800x600/?office,technology",
    location: "Remote",
    type: "Full Time",
    experience: "Fresher",
    salary: "10–15 LPA",
    posted: "2 days ago",
    description:
      "We are looking for a Frontend Developer skilled in React, Tailwind CSS, and modern UI practices to build scalable web applications.",
  },
  {
    id: 2,
    title: "Backend Developer",
    company: "Microsoft",
    logo: "https://logo.clearbit.com/microsoft.com",
    image: "https://source.unsplash.com/800x600/?server,backend",
    location: "Bangalore",
    type: "Full Time",
    experience: "1–3 Years",
    salary: "12–18 LPA",
    posted: "4 days ago",
    description:
      "Join our backend team to work on high-scale Node.js services, REST APIs, and cloud-based solutions.",
  },
  {
    id: 3,
    title: "Software Engineer Intern",
    company: "Amazon",
    logo: "https://logo.clearbit.com/amazon.com",
    image: "https://source.unsplash.com/800x600/?coding,developer",
    location: "Hyderabad",
    type: "Internship",
    experience: "Fresher",
    salary: "30K / month",
    posted: "1 day ago",
    description:
      "A 6-month internship opportunity for students passionate about DSA, system design basics, and real-world software engineering.",
  },
  {
    id: 4,
    title: "Full Stack Developer",
    company: "Startup Inc.",
    logo: "https://logo.clearbit.com/stripe.com",
    image: "https://source.unsplash.com/800x600/?startup,teamwork",
    location: "Remote",
    type: "Full Time",
    experience: "1–3 Years",
    salary: "8–12 LPA",
    posted: "5 days ago",
    description:
      "Work on MERN stack applications, build APIs, design UI, and collaborate closely with product teams in a fast-paced startup.",
  },
  {
    id: 5,
    title: "UI/UX Designer",
    company: "Adobe",
    logo: "https://logo.clearbit.com/adobe.com",
    image: "https://source.unsplash.com/800x600/?design,uiux",
    location: "Noida",
    type: "Full Time",
    experience: "3+ Years",
    salary: "14–20 LPA",
    posted: "3 days ago",
    description:
      "Design intuitive user interfaces and improve user experience across multiple products with a creative design team.",
  },
  {
    id: 6,
    title: "Data Analyst",
    company: "Flipkart",
    logo: "https://logo.clearbit.com/flipkart.com",
    image: "https://source.unsplash.com/800x600/?data,analytics",
    location: "Bangalore",
    type: "Full Time",
    experience: "Fresher",
    salary: "6–10 LPA",
    posted: "6 days ago",
    description:
      "Analyze large datasets, build dashboards, and generate actionable insights using SQL, Python, and BI tools.",
  },
];
  const [search, setSearch] = useState("");
  const [location, setLocation] = useState("All");
  const [type, setType] = useState("All");
  const [experience, setExperience] = useState("All");


  const filteredJobs = dummyJobs.filter((job) => {
    return (
      job.title.toLowerCase().includes(search.toLowerCase()) &&
      (location === "All" || job.location === location) &&
      (type === "All" || job.type === type) &&
      (experience === "All" || job.experience === experience)
    );
  });

  return (
    <>
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-6">

          {/* LEFT FILTER */}
          <div className="w-full md:w-[25%]   border rounded-xl p-4 h-fit">
            <h2 className="font-bold text-lg mb-4">Filter Jobs</h2>

            {/* Search */}
            <input
              type="text"
              placeholder="Search job title..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full border rounded-md px-3 py-2 text-sm mb-4"
            />

            {/* Location */}
            <div className="mb-4">
              <label className="text-sm font-semibold">Location</label>
              <select
                className="w-full border rounded-md px-2 py-1 text-sm mt-1"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              >
                <option>All</option>
                <option>Remote</option>
                <option>Bangalore</option>
                <option>Hyderabad</option>
                <option>Noida</option>
              </select>
            </div>

            {/* Job Type */}
            <div className="mb-4">
              <label className="text-sm font-semibold">Job Type</label>
              <select
                className="w-full border rounded-md px-2 py-1 text-sm mt-1"
                value={type}
                onChange={(e) => setType(e.target.value)}
              >
                <option>All</option>
                <option>Full Time</option>
                <option>Internship</option>
                <option>Part Time</option>
              </select>
            </div>

            {/* Experience */}
            <div>
              <label className="text-sm font-semibold">Experience</label>
              <select
                className="w-full border rounded-md px-2 py-1 text-sm mt-1"
                value={experience}
                onChange={(e) => setExperience(e.target.value)}
              >
                <option>All</option>
                <option>Fresher</option>
                <option>1-3 Years</option>
                <option>3+ Years</option>
              </select>
            </div>
          </div>

          {/* RIGHT JOB LIST */}
          <div className="w-full md:w-[75%] md:max-h-screen overflow-y-auto">
            <h2 className="font-bold text-xl mb-4">
              Available Jobs ({filteredJobs.length})
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {filteredJobs.map((job) => (
                <JobCard key={job.id} job={job} />
              ))}
            </div>
          </div>

        </div>
      </div>
      <Footer/>
    </>
  );
};

export default Jobs;