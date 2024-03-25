import { Link } from "react-router-dom";

interface LinkButtonProps {
  name: string;
  link: string;
}

const LinkButton = ({ name, link }: LinkButtonProps) => {
  return (
    <Link
      to={link}
      className="text-white py-2 px-4 rounded bg-blue-500 hover:bg-gradient-to-br from-blue-900 to-blue-400"
    >
      {name}
    </Link>
  );
};

export default LinkButton;
