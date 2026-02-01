import Footer from "../../components/general/Footer";
import Hero from "../../components/landingPage/Hero";
import LatestJobs from "../../components/landingPage/LatestJob";
import Navbar from "../../components/general/Navbar";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";


const Home = () => {

  const user = useSelector((state) => state.auth.user);
  const role = user?.role;
  const navigate = useNavigate();

  useEffect(() => {
    if (role === "Recruiter") {
      navigate("/profile");
    }
  }, []);
  return (
    <div>
      <Navbar />
      <Hero />
      <LatestJobs />
      <Footer />
    </div>
  );
};

export default Home;
