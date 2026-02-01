import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Login from "./pages/general/Login.jsx";
import Sign from "./pages/general/Sign.jsx";
import Home from "./pages/general/Home.jsx";
import Jobs from "./pages/Job/Job.jsx";
import Profile from "./pages/general/Profile.jsx";
import JobDetailed from "./pages/Job/JobDeatiled.jsx";
import CreateCompany from "./pages/admin/CreateCompany.jsx";
import AdminJobs from "./pages/admin/MyJob.jsx";
import CreateJob from "./pages/admin/CreateJob.jsx";
import useGetCompany from "./hooks/useGetCompany.jsx";
import useGetJob from "./hooks/useGetJob.jsx";
import { useSelector } from "react-redux";
import JobDetail from "./pages/admin/JobDetailed.jsx";

const App = () => {
  useGetCompany();
  useGetJob();

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/register",
      element: <Sign />,
    },
    {
      path: "/jobs",
      element: <Jobs />,
    },
    {
      path: "/profile",
      element: <Profile />,
    },
    {
      path: "/jobs/:id",
      element: <JobDetailed />,
    },
    {
      path: "company/create",
      element: <CreateCompany />,
    },
    {
      path: "admin/jobs",
      element: <AdminJobs />,
    },
    {
      path: "admin/jobs/create",
      element: <CreateJob />,
    },
    {
      path: "/admin/job/:id",
      element: <JobDetail />,
    },
  ]);

  return <RouterProvider router={router} />;
};

export default App;
