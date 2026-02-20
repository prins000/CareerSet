import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { USER_API_ENDPOINT } from "../../utils/endpoints";
import { toast } from "sonner";
import { CloudCog, Loader2, Upload, FileText, User } from "lucide-react";
import { setUser } from "../../redux/slices/authSlice";
import { useNavigate } from "react-router-dom";

const EditProfileDialog = ({ open, setOpen }) => {
  const user = useSelector((state) => state.auth.user);
  const role = user.role;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [resumeFile, setResumeFile] = useState(null);
  const [profilePhotoFile, setProfilePhotoFile] = useState(null);

  const [formData, setFormData] = useState({
    fullname: user?.fullname || "",
    email: user?.email || "",
    mobile: user?.mobile || "",
    bio: role === "Student" ? user?.profile?.bio || "" : "null",
    skills:
      role === "Student" ? user?.profile?.skills?.join(", ") || "" : "null",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e, type) => {
    const file = e.target.files[0];
    if (type === "resume") {
      setResumeFile(file);
    } else if (type === "profilePhoto") {
      setProfilePhotoFile(file);
    }
  };

  const handleSubmit = async () => {
    setLoading(true);

    const formDataToSend = new FormData();

    // Add form fields
    Object.keys(formData).forEach((key) => {
      if (key === "skills") {
        const skillsArray = formData.skills
          .split(",")
          .map((s) => s.trim())
          .filter(Boolean); // optional: removes empty skills

        formDataToSend.append(key, JSON.stringify(skillsArray));
      } else {
        formDataToSend.append(key, formData[key]);
      }
    });

    // Add files if they exist
    if (resumeFile) {
      formDataToSend.append("resume", resumeFile);
    }
    if (profilePhotoFile) {
      formDataToSend.append("profilePhoto", profilePhotoFile);
    }

    try {
      const res = await axios.post(
        `${USER_API_ENDPOINT}/profile/update`,
        formDataToSend,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
      );

      if (res.data.success) {
        toast.success(res.data.message);
        dispatch(setUser(res.data.user));
        setOpen(false);
        navigate("/profile");
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Update failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-125">
        <DialogHeader>
          <DialogTitle>Edit Profile</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <Input
            name="fullname"
            placeholder="Full Name"
            value={formData.fullname}
            onChange={handleChange}
          />

          <Input
            name="email"
            placeholder="Email"
            value={formData.email}
            disabled
          />

          <Input
            name="mobile"
            placeholder="Mobile"
            value={formData.mobile}
            onChange={handleChange}
          />

          {role === "Student" && (
            <Textarea
              name="bio"
              placeholder="Short Bio"
              value={formData.bio}
              onChange={handleChange}
            />
          )}

          {role === "Student" && (
            <Input
              name="skills"
              placeholder="Skills (comma separated)"
              value={formData.skills}
              onChange={handleChange}
            />
          )}

          {/* Resume Upload for Students */}
          {role === "Student" && (
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                <FileText size={16} />
                Resume (PDF, DOC, DOCX)
              </label>
              <Input
                type="file"
                accept=".pdf,.doc,.docx"
                onChange={(e) => handleFileChange(e, "resume")}
                className="cursor-pointer"
              />
              {resumeFile && (
                <p className="text-xs text-gray-600">
                  Selected: {resumeFile.name}
                </p>
              )}
              {user?.profile?.resume && (
                <p className="text-xs text-blue-600">
                  Current:{" "}
                  <a
                    href={user.profile.resume}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline"
                  >
                    View Resume
                  </a>
                </p>
              )}
            </div>
          )}

          {/* Profile Photo Upload */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
              <User size={16} />
              Profile Photo
            </label>
            <Input
              type="file"
              accept="image/*"
              onChange={(e) => handleFileChange(e, "profilePhoto")}
              className="cursor-pointer"
            />
            {profilePhotoFile && (
              <p className="text-xs text-gray-600">
                Selected: {profilePhotoFile.name}
              </p>
            )}
            {user?.profile?.profilePhoto && (
              <div className="flex items-center gap-2">
                <img
                  src={user.profile.profilePhoto}
                  alt="Current profile"
                  className="w-10 h-10 rounded-full object-cover"
                />
                <p className="text-xs text-gray-600">Current photo</p>
              </div>
            )}
          </div>

          <Button
            onClick={handleSubmit}
            disabled={loading}
            className="w-full bg-[#6A38C2] hover:opacity-90"
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
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EditProfileDialog;
