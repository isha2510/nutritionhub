import { Link } from "react-router-dom";

const Header = () => {
  return (
    <nav className="flex items-center justify-between bg-indigo-500 py-4 px-6">
      <div className="text-white text-xl font-bold">Neurtitionhub</div>
      <div className="flex items-center text-white">
        <Link to="/" className="mr-4">
          Home
        </Link>
        <Link to="/about" className="mr-4">
          About
        </Link>
        <Link to="/profile" className="mr-4">
          Profile
        </Link>
        <Link to="/signout" className="mr-4">
          Sign Out
        </Link>
      </div>
    </nav>
  );
};

export default Header;
