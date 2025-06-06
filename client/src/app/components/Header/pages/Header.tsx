import { useAuth0 } from "@auth0/auth0-react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import logo from "../../../assets/logo.png";
import DarkModeSwitcher from "./DarkModeSwitcher";
import { setToken } from "../slice/authSlice";
import { useHasAdminRole } from "../../../utils/auth-utils";

const Header = () => {
  const { logout, isAuthenticated, loginWithRedirect, getAccessTokenSilently } =
    useAuth0();
  const dispatch = useDispatch();
  const isAdmin = useHasAdminRole();

  useEffect(() => {
    const getToken = async () => {
      const token = await getAccessTokenSilently();
      dispatch(setToken(token));
    };
    getToken();
  }, [getAccessTokenSilently]);

  return (
    <nav className="flex justify-between bg-gradient-to-br from-purple-900 to-purple-400 pr-4">
      <img src={logo} alt="" className="w-20 h-16" />
      {/* <div className="text-white text-lg font-bold text-shadow">
        Nutrition hub
      </div> */}
      <div className="flex items-center text-white">
        {isAuthenticated ? (
          <>
            <DarkModeSwitcher />
            <Link to="/dashboard" className="mr-4 ml-4">
              Home
            </Link>
            <Link to="/about" className="mr-4">
              About
            </Link>
            {isAdmin && (
              <Link to="/admin" className="mr-4">
                Admin
              </Link>
            )}
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
