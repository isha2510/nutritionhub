import { useAuth0 } from "@auth0/auth0-react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
const Header = () => {
  const { logout, isAuthenticated, loginWithRedirect, getAccessTokenSilently } =
    useAuth0();

  useEffect(() => {
    const getToken = async () => {
      sessionStorage.setItem("token", await getAccessTokenSilently());
    };
    getToken();
  }, []);

  return (
    <nav className="flex items-center justify-between bg-indigo-500 py-4 px-6">
      <div className="text-white text-xl font-bold">Nutritionhub</div>
      <div className="flex items-center text-white">
        {isAuthenticated ? (
          <>
            <Link to="/dashboard" className="mr-4">
              Home
            </Link>
            <Link to="/about" className="mr-4">
              About
            </Link>
            <Link to="/profile" className="mr-4">
              Profile
            </Link>
            <button
              onClick={() =>
                logout({ logoutParams: { returnTo: window.location.origin } })
              }
            >
              Sign Out
            </button>
          </>
        ) : (
          <button onClick={() => loginWithRedirect()}>Sign In</button>
        )}
      </div>
    </nav>
  );
};

export default Header;
