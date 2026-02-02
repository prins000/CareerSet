import { useState } from "react";
import axios from "axios";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Textarea } from "../../components/ui/textarea";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "../../components/ui/card";
import {
  Briefcase,
  MapPin,
  IndianRupee,
  Users,
  Factory,
  ListChecks,
  Loader2,
} from "lucide-react";
import { JOB_API_ENDPOINT } from "../../utils/endpoints";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import BackButton from "../../components/general/BackButton";
import Navbar from "../../components/general/Navbar";
import Footer from "../../components/general/Footer";
import { useSelector } from "react-redux";

export default function CreateJob() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const companies = useSelector((state) => state.company.companies);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    requirements: "",
    salary: "",
    location: "",
    jobType: "",
    positions: "",
    company: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    console.log(formData);
    e.preventDefault();
    try {
      setLoading(true);

      const res = await axios.post(
        `${JOB_API_ENDPOINT}/post`,
        {
          ...formData,
          requirements: formData.requirements.split(","),
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        },
      );

      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/admin/jobs");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Navbar />

      <div className="h-auto md:min-h-screen flex py-12 md:py-0 md:items-center justify-center bg-gray-50 px-4">
        <Card className="w-full max-w-xl shadow-md">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">Create Job</CardTitle>
            <CardDescription>
              Post a new job opening for your company
            </CardDescription>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Job Title */}
              <div className="relative">
                <Briefcase
                  className="absolute left-3 top-3 text-gray-400"
                  size={18}
                />
                <Input
                  name="title"
                  placeholder="Job Title *"
                  required
                  value={formData.title}
                  onChange={handleChange}
                  className="pl-10 focus-visible:ring-[#6A38C2]"
                />
              </div>

              {/* Description */}
              <Textarea
                name="description"
                placeholder="Job Description *"
                rows={3}
                value={formData.description}
                required
                onChange={handleChange}
                className="focus-visible:ring-[#6A38C2]"
              />

              {/* Requirements */}
              <div className="relative">
                <ListChecks
                  className="absolute left-3 top-3 text-gray-400"
                  size={18}
                />
                <Input
                  name="requirements"
                  value={formData.requirements}
                  placeholder="Requirements (comma separated)"
                  onChange={handleChange}
                  className="pl-10 focus-visible:ring-[#6A38C2]"
                />
              </div>

              {/* Salary */}
              <div className="relative">
                <IndianRupee
                  className="absolute left-3 top-3 text-gray-400"
                  size={18}
                />
                <Input
                  name="salary"
                  value={formData.salary}
                  placeholder="Salary (e.g. 8 LPA - 12 LPA)"
                  required
                  onChange={handleChange}
                  className="pl-10 focus-visible:ring-[#6A38C2]"
                />
              </div>

              {/* Location */}
              <div className="relative">
                <MapPin
                  className="absolute left-3 top-3 text-gray-400"
                  size={18}
                />
                <Input
                  name="location"
                  value={formData.location}
                  placeholder="Job Location *"
                  required
                  onChange={handleChange}
                  className="pl-10 focus-visible:ring-[#6A38C2]"
                />
              </div>

              {/* Job Type */}
              <select
                name="jobType"
                required
                value={formData.jobType}
                onChange={handleChange}
                placeholder="Select Job Type *"
                className="w-full text-sm border rounded-md p-1 focus-visible:ring-[#6A38C2]"
              >
                <option key="0" value="">Select Job Type</option>
                <option key="2" value="Full-time">Full-time</option>
                <option key="3" value="Part-time">Part-time</option>
                <option key="4" value="Internship">Internship</option>
              </select>

              {/* Open Positions */}
              <div className="relative">
                <Users
                  className="absolute left-3 top-3 text-gray-400"
                  size={18}
                />
                <Input
                  type="number"
                  name="positions"
                  value={formData.positions}
                  placeholder="Number of Open Positions"
                  required
                  onChange={handleChange}
                  className="pl-10 focus-visible:ring-[#6A38C2]"
                />
              </div>

              {/* Company ID */}

              <select
                name="company"
                value={formData.company}
                required
                onChange={handleChange}
                placeholder="Select Company *"
                className="w-full text-sm border rounded-md p-1 focus-visible:ring-[#6A38C2]"
              >
                <option value="">Select Company</option>
                {companies.map((company) => (
                  <option key={company._id} value={company._id}>{company.name}</option>
                ))}
              </select>

              {/* Submit */}
              <div className="flex justify-center items-center flex-col">
                {loading ? (
                  <Button
                    type="button"
                    disabled={true} // Make sure this is boolean
                    className="border-2 w-full p-2 text-white rounded-md bg-[#6A38C2] flex items-center justify-center gap-2"
                  >
                    <Loader2 className="animate-spin h-4 w-4" />
                    <span>Please wait</span>
                  </Button>
                ) : (
                  <input
                    type="submit"
                    value="Create Job"
                    className="border-2 w-full text-white p-2 rounded-md bg-[#6A38C2] cursor-pointer hover:bg-[#5a2fa8]"
                  />
                )}
              </div>

              <p className="text-sm flex text-gray-500">
                Don't have a company?{" "}
                <Link
                  to="/company/create"
                  className="mx-1 text-blue-400 cursor-pointer"
                >
                  Create one first.
                </Link>
              </p>

              <BackButton />
            </form>
          </CardContent>
        </Card>
      </div>

      <Footer />
    </div>
  );
}
