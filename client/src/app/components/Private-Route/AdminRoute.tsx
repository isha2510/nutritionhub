import { useAuth0 } from "@auth0/auth0-react";
import React from "react";
import { Navigate } from "react-router-dom";
import Loader from "../Loader/Loader";
import { useHasAdminRole } from "../../utils/auth-utils";

interface AdminRouteProps {
  children: React.ReactNode;
}

function AdminRoute({ children }: AdminRouteProps) {
  const { isAuthenticated, isLoading } = useAuth0();
  const isAdmin = useHasAdminRole();
  
  if (isLoading) {
    return <Loader />;
  }
  
  // Redirect to dashboard if user is not authenticated or not an admin
  if (!isAuthenticated || !isAdmin) {
    return <Navigate to="/dashboard" />;
  }
  
  return <>{children}</>;
}

export default AdminRoute; 