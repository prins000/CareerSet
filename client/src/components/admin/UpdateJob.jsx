import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import axios from "axios";
import { JOB_API_ENDPOINT } from "../../utils/endpoints";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const EditJobDialog = ({ open, setOpen, job }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const companies = useSelector((state) => state.company.companies);

  const [formData, setFormData] = useState({
    title: job?.title || "",
    description: job?.description || "",
    requirements: job?.requirements?.join(", ") || "",
    salary: job?.salary || "",
    location: job?.location || "",
    jobType: job?.jobType || "",
    positions: job?.position || "",
    company: job?.company || "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    setLoading(true);

    const payload = {
      ...formData,
      positions: Number(formData.positions),
      requirements: formData.requirements
        .split(",")
        .map((r) => r.trim())
        .filter(Boolean),
    };
    console.log(formData);
    try {
      const res = await axios.put(
        `${JOB_API_ENDPOINT}/update/${job._id}`,
        payload,
        { withCredentials: true },
      );

      if (res.data.success) {
        toast.success(res.data.message || "Job updated successfully");
        setOpen(false);
        navigate("/admin/jobs");
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Update failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[520px] max-h-[85vh] overflow-hidden">
        <DialogHeader>
          <DialogTitle>Edit Job</DialogTitle>
        </DialogHeader>

        <div className="space-y-4 max-h-[65vh] overflow-y-auto pr-2">
          <Input
            name="title"
            placeholder="Job Title"
            value={formData.title}
            onChange={handleChange}
          />

          <Textarea
            name="description"
            placeholder="Job Description"
            value={formData.description}
            onChange={handleChange}
          />

          <Textarea
            name="requirements"
            placeholder="Requirements (comma separated)"
            value={formData.requirements}
            onChange={handleChange}
          />

          <Input
            name="positions"
            type="number"
            placeholder="Open Positions"
            value={formData.positions}
            onChange={handleChange}
          />

          <Input
            name="salary"
            placeholder="Salary"
            value={formData.salary}
            onChange={handleChange}
          />

          <Input
            name="location"
            placeholder="Location"
            value={formData.location}
            onChange={handleChange}
          />

          <select
            name="jobType"
            value={formData.jobType}
            onChange={handleChange}
            className="w-full text-sm border rounded-md p-2 focus-visible:ring-[#6A38C2]"
          >
            <option value="">Select Job Type</option>
            <option value="Full-time">Full-time</option>
            <option value="Part-time">Part-time</option>
            <option value="Internship">Internship</option>
          </select>

          <select
            name="company"
            value={formData.company}
            onChange={handleChange}
            className="w-full text-sm border rounded-md p-2 focus-visible:ring-[#6A38C2]"
          >
            <option value="">Select Company</option>
            {companies.map((company) => (
              <option key={company._id} value={company._id}>
                {company.name}
              </option>
            ))}
          </select>
        </div>

        <Button
          onClick={handleSubmit}
          disabled={loading}
          className="w-full bg-[#6A38C2] hover:opacity-90 mt-4"
        >
          {loading ? (
            <>
              <Loader2 className="animate-spin h-4 w-4 mr-2" />
              Please wait
            </>
          ) : (
            "Save Changes"
          )}
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default EditJobDialog;
