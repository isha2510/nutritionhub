import { useAuth0 } from "@auth0/auth0-react";
import React from "react";
import { Navigate } from "react-router-dom";
import Loader from "../Loader/Loader";

interface PrivateRouteProps {
  children: React.ReactNode;
}

function PrivateRoute({ children }: PrivateRouteProps) {
  const { isAuthenticated, isLoading } = useAuth0();
  if (isLoading) {
    return <Loader />;
  }
  return isAuthenticated ? <>{children}</> : <Navigate to="/" />;
}

export default PrivateRoute;
