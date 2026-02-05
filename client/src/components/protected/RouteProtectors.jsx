import React from "react";
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import { Loader2 } from "lucide-react";

export const ProtectedRoute = ({ children, requiredRole = null }) => {
  const { user, loading } = useSelector((store) => store.auth);
  const location = useLocation();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (requiredRole && user.role !== requiredRole) {
    return <Navigate to="/" replace />;
  }

  return children;
};



export const RecruiterRoute = ({ children }) => {
  return <ProtectedRoute requiredRole="Recruiter">{children}</ProtectedRoute>;
};

export const StudentRoute = ({ children }) => {
  return <ProtectedRoute requiredRole="Student">{children}</ProtectedRoute>;
};


export const AuthRoute = ({ children }) => {
  const { user, loading } = useSelector((store) => store.auth);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (user) {
    return <Navigate to="/" replace />;
  }

  return children;
};
