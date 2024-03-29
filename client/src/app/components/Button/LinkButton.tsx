import { Link } from "react-router-dom";

interface LinkButtonProps {
  name: string;
  link: string;
}

const LinkButton = ({ name, link }: LinkButtonProps) => {
  return (
    <Link
      to={link}
      className="text-white py-2 px-4 rounded bg-purple-700 hover:bg-gradient-to-br from-purple-400 to-purple-900"
    >
      {name}
    </Link>
  );
};

export default LinkButton;
