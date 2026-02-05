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
import UpdateCompany from "./pages/admin/UpdateCompany.jsx";
import JobDetail from "./pages/admin/JobDetailed.jsx";
import Applications from "./pages/admin/Applicants.jsx";
import MyApplications from "./pages/general/MyApplications.jsx";
import { ProtectedRoute,RecruiterRoute, AuthRoute } from "./components/protected/RouteProtectors.jsx";

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
      element: <AuthRoute><Login /></AuthRoute>,
    },
    {
      path: "/register",
      element: <AuthRoute><Sign /></AuthRoute>,
    },
    {
      path: "/jobs",
      element: <Jobs />,
    },
    {
      path: "/profile",
      element: <ProtectedRoute><Profile /></ProtectedRoute>,
    },
    {
      path: "/jobs/:id",
      element: <JobDetailed />,
    },
    {
      path: "company/create",
      element: <RecruiterRoute><CreateCompany /></RecruiterRoute>,
    },
    {
      path: "admin/jobs",
      element: <RecruiterRoute><AdminJobs /></RecruiterRoute>,
    },
    {
      path: "admin/jobs/create",
      element: <RecruiterRoute><CreateJob /></RecruiterRoute>,
    },
    {
      path: "/admin/job/:id",
      element: <RecruiterRoute><JobDetail /></RecruiterRoute>,
    },
    {
      path: "/admin/company/:id/edit",
      element: <RecruiterRoute><UpdateCompany /></RecruiterRoute>,
    },
    {
      path: "/admin/:jobId/applications",
      element: <RecruiterRoute><Applications /></RecruiterRoute>,
    },
     {
      path: "/applications",
      element: <ProtectedRoute><MyApplications /></ProtectedRoute>,
    }
  ]);

  return <RouterProvider router={router} />;
};

export default App;
