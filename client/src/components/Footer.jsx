import React from "react";
import { Link } from "react-router-dom";
import { Facebook, Twitter, Linkedin, Instagram } from "lucide-react";

const Footer = () => {
  return (
    <footer className="mt-20 bg-[#0F0F14] text-gray-300">
      <div className="mx-4 sm:mx-6 md:mx-10 py-12">
        
        {/* Top Section */}
        <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-4">
          
          {/* Brand */}
          <div className="space-y-3">
            <Link to="/" className="text-2xl font-bold text-white">
              Job<span className="text-[#F83002]">Portal</span>
            </Link>
            <p className="text-sm text-gray-400">
              Find your dream job and build your career with top companies.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-white mb-3">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li className="hover:text-[#6A38C2] cursor-pointer">Home</li>
              <li className="hover:text-[#6A38C2] cursor-pointer">Jobs</li>
              <li className="hover:text-[#6A38C2] cursor-pointer">Browse</li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-semibold text-white mb-3">Company</h4>
            <ul className="space-y-2 text-sm">
              <li className="hover:text-[#6A38C2] cursor-pointer">About Us</li>
              <li className="hover:text-[#6A38C2] cursor-pointer">Careers</li>
              <li className="hover:text-[#6A38C2] cursor-pointer">Contact</li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="font-semibold text-white mb-3">Follow Us</h4>
            <div className="flex gap-4">
              <Facebook className="cursor-pointer hover:text-[#6A38C2]" />
              <Twitter className="cursor-pointer hover:text-[#6A38C2]" />
              <Linkedin className="cursor-pointer hover:text-[#6A38C2]" />
              <Instagram className="cursor-pointer hover:text-[#6A38C2]" />
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-12 border-t border-white/10 pt-4 text-center text-sm text-gray-400">
          © {new Date().getFullYear()} JobPortal. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
