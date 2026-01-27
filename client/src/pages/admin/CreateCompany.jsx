import { useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Building2, Globe, MapPin, Image, Factory, Loader2 } from "lucide-react";
import { COMPANY_API_ENDPOINT } from "@/utils/endpoints";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

export default function CreateCompany() {
  let [loading, setLoading] = useState(false);
  let navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    location: "",
    industry: "",
    website: "",
    logo: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
        
      const res = await axios.post(
        `${COMPANY_API_ENDPOINT}/register`,
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        },
      );

      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/profile"); // or /companies
      }

      setFormData({
        name: "",
        description: "",
        location: "",
        industry: "",
        website: "",
        logo: "",
      });
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <Card className="w-full max-w-xl shadow-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Create Company</CardTitle>
          <CardDescription>
            Add your company details to start posting jobs
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Company Name */}

            <div className="relative">
              <Building2
                className="absolute left-3 top-3 text-gray-400"
                size={18}
              />
              <Input
                name="name"
                placeholder="Company Name *"
                required
                onChange={handleChange}
                className="pl-10 focus-visible:ring-[#6A38C2]"
              />
            </div>

            {/* Description */}
            <Textarea
              name="description"
              placeholder="Company Description"
              rows={3}
              onChange={handleChange}
              className="focus-visible:ring-[#6A38C2]"
            />
            {/* Location */}
            <div className="relative">
              <MapPin
                className="absolute left-3 top-3 text-gray-400"
                size={18}
              />
              <Input
                name="location"
                placeholder="Location *"
                required
                onChange={handleChange}
                className="pl-10 focus-visible:ring-[#6A38C2]"
              />
            </div>

            {/* Industry */}
            
            <div className="relative">
              <Factory className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" 
              size={18}
              />

              <Input
                name="industry"
                placeholder="Industry (e.g. Technology)"
                onChange={handleChange}
                className="pl-10 focus-visible:ring-[#6A38C2]"
              />
            </div>
            {/* Website */}
            <div className="relative">
              <Globe
                className="absolute left-3 top-3 text-gray-400"
                size={18}
              />
              <Input
                type="url"
                name="website"
                placeholder="Website URL"
                onChange={handleChange}
                className="pl-10 focus-visible:ring-[#6A38C2]"
              />
            </div>
            {/* Logo */}
            <div className="relative">
              <Image
                className="absolute left-3 top-3 text-gray-400"
                size={18}
              />
              <Input
                type="url"
                name="logo"
                placeholder="Logo URL (optional)"
                onChange={handleChange}
                className="pl-10 focus-visible:ring-[#6A38C2]"
              />
            </div>
            {/* Submit */}
            <div className="flex justify-center items-center flex-col">
              {loading ? (
                <Button
                  type="button"
                  disabled
                  className="border-2 w-full p-2 text-white rounded-md bg-[#6A38C2] flex items-center justify-center gap-2"
                >
                  <Loader2 className="animate-spin text-white h-4 w-4" />
                  <span>Please wait</span>
                </Button>
              ) : (
                <input
                  type="submit"
                  className="border-2 w-full text-white p-2 rounded-md bg-[#6A38C2] cursor-pointer hover:bg-[#5a2fa8]"
                  value="Create Company"
                />
              )}
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
