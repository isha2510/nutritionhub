import { useAuth0 } from "@auth0/auth0-react";
import React from "react";
import { useLocation } from "react-router-dom";
import Loader from "../Loader/Loader";

interface PrivateRouteProps {
  children: React.ReactNode;
}

function PrivateRoute({ children }: PrivateRouteProps) {
  const { isAuthenticated, isLoading, loginWithRedirect } = useAuth0();
  const location = useLocation();

  if (isLoading) {
    return <Loader />;
  }

  // If not authenticated, handle redirect
  if (!isAuthenticated) {
    // Redirect to login with the current path as return URL
    loginWithRedirect({
      appState: { returnTo: location.pathname }
    });
    return <Loader />;
  }

  // User is authenticated, show the protected content
  return <>{children}</>;
}

export default PrivateRoute;
