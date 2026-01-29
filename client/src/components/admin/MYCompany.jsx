import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import {
  Card,
  CardHeader,
  CardContent,
} from "../ui/card";
import { Button } from "../ui/button";
import { Plus, Building2, MapPin, Globe } from "lucide-react";



const AdminCompanies = () => {
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  
  const [loading, setLoading] = useState(false);

  // 🔒 Protect recruiter route
  useEffect(() => {
    if (user?.role !== "Recruiter") {
      navigate("/");
    }
  }, [user, navigate]);

  // 📦 Fetch logged-in user's companies
  const companies = useSelector((state) => state.company.companies);

  return (
    <div className="min-h-screen bg-gray-100 px-6 py-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            My Companies
          </h1>
          <p className="text-gray-600 text-sm">
            Manage companies created by you
          </p>
        </div>

        <button
          onClick={() => navigate("/company/create")}
          className="flex items-center gap-2 bg-black text-white px-5 py-2.5 rounded-xl hover:opacity-90 transition"
        >
          <Plus className="w-4 h-4" />
          Create Company
        </button>
      </div>

      {/* Content */}
      {loading ? (
        <div className="text-center text-gray-500">
          Loading companies...
        </div>
      ) : companies.length === 0 ? (
        <div className="bg-white rounded-2xl p-10 text-center shadow">
          <Building2 className="mx-auto w-10 h-10 text-gray-400 mb-4" />
          <h2 className="text-lg font-semibold mb-2">
            No companies found
          </h2>
          <p className="text-gray-500 mb-6">
            Create your first company to start posting jobs.
          </p>
          <button
            onClick={() => navigate("/company/create")}
            className="bg-black text-white px-6 py-2 rounded-lg"
          >
            Create Company
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {companies.map((company) => (
              <Card className="hover:shadow-md transition rounded-xl">
      <CardHeader className="flex flex-row gap-4 items-center">
        {/* Logo */}
        <img
          src={company.logo}
          alt={company.name}
          className="w-14 h-14 rounded-lg object-cover border"
        />

        {/* Name + Industry */}
        <div>
          <h3 className="text-lg font-semibold">{company.name}</h3>
          {company.industry && (
            <div className="flex items-center gap-1 text-sm text-gray-500">
              <Building2 className="w-4 h-4" />
              {company.industry}
            </div>
          )}
        </div>
      </CardHeader>

      <CardContent className="space-y-3">
        {/* Description */}
        {company.description && (
          <p className="text-sm text-gray-600 line-clamp-2">
            {company.description}
          </p>
        )}

        {/* Location */}
        {company.location && (
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <MapPin className="w-4 h-4" />
            {company.location}
          </div>
        )}

        {/* Website */}
        {company.website && (
          <a
            href={company.website}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 text-sm text-[#6A38C2] hover:underline"
          >
            <Globe className="w-4 h-4" />
            Visit Website
          </a>
        )}

        {/* Actions */}
        <div className="pt-2">
          <Link to={`/admin/company/${company._id}`}>
            <Button
              variant="ghost"
              className="w-full text-[#6A38C2] bg-[#6A38C2]/10"
            >
              Manage Company
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminCompanies;
