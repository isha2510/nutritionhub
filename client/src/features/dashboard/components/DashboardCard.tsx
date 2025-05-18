import { useNavigate } from 'react-router-dom';

interface DashboardCardProps {
  title: string;
  description: string;
  buttonName: string;
  buttonLink: string;
  image: string;
}

const DashboardCard = ({
  title,
  description,
  buttonName,
  buttonLink,
  image,
}: DashboardCardProps) => {
  const navigate = useNavigate();
  
  const handleNavigation = () => {
    navigate(buttonLink);
  };

  return (
    <div className="h-full bg-white dark:bg-boxdark border border-stroke dark:border-strokedark rounded-lg shadow-sm hover:shadow-md transition-all duration-300">
      <div className="relative h-36 overflow-hidden rounded-t-lg">
        <img
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
          src={image}
          alt={title}
        />
      </div>
      <div className="p-5">
        <h3 className="text-xl font-bold text-black dark:text-white mb-2">
          {title}
        </h3>
        <p className="text-gray-600 dark:text-gray-400 mb-4 h-14 line-clamp-2">
          {description}
        </p>
        <button
          onClick={handleNavigation}
          className="text-white bg-primary hover:bg-opacity-90 focus:ring-4 focus:ring-primary/30 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center"
        >
          {buttonName}
          <svg className="w-3.5 h-3.5 ml-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
          </svg>
        </button>
      </div>
    </div>
  );
};

export default DashboardCard; 