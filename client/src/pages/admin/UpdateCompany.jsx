import React, { useEffect, useState } from "react";
import { Input } from "../../components/ui/input";
import { Textarea } from "../../components/ui/textarea";
import { Button } from "../../components/ui/button";
import axios from "axios";
import { COMPANY_API_ENDPOINT } from "../../utils/endpoints";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import BackButton from "../../components/general/BackButton";
import Navbar from "../../components/general/Navbar";
import Footer from "../../components/general/Footer";

const UpdateCompany = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    location: "",
    industry: "",
    website: "",
    logo: "",
  });

  // 🔹 Fetch company details
  useEffect(() => {
    const fetchCompany = async () => {
      try {
        const res = await axios.get(`${COMPANY_API_ENDPOINT}/get/${id}`, {
          withCredentials: true,
        });

        if (res.data.success) {
          setFormData(res.data.company);
        }
      } catch (error) {
        toast.error("Failed to load company data");
      }
    };

    fetchCompany();
  }, [id]);

  // 🔹 Handle input
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // 🔹 Submit update
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axios.put(
        `${COMPANY_API_ENDPOINT}/update/${id}`,
        formData,
        { withCredentials: true }
      );

      if (res.data.success) {
        toast.success("Company updated successfully");
        navigate("/profile");
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Update failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Navbar/>
    
    <div className="max-w-3xl mx-auto mt-10 bg-white p-6 rounded-xl shadow">
      <div className="flex flex-col items-start justify-baseline">
        <BackButton/>
      <h2 className="text-2xl font-semibold mb-6">Update Company</h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          name="name"
          placeholder="Company Name"
          value={formData.name}
          onChange={handleChange}
          
        />

        <Textarea
          name="description"
          placeholder="Company Description"
          value={formData.description}
          onChange={handleChange}
        />

        <Input
          name="location"
          placeholder="Location"
          value={formData.location}
          onChange={handleChange}
        />

        <Input
          name="industry"
          placeholder="Industry"
          value={formData.industry}
          onChange={handleChange}
        />

        <Input
          name="website"
          placeholder="Website"
          value={formData.website}
          onChange={handleChange}
        />

        <Input
          name="logo"
          placeholder="Logo URL"
          value={formData.logo}
          onChange={handleChange}
        />

        <Button
          type="submit"
          disabled={loading}
          className="bg-[#6A38C2] hover:opacity-90 w-full"
        >
          {loading ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin mr-2" />
              Updating...
            </>
          ) : (
            "Update Company"
          )}
        </Button>
      </form>
    </div>
    <Footer/>
    </div>
  );
};

export default UpdateCompany;
