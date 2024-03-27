import LinkButton from "../Button/LinkButton";

interface CardProps {
  title: string;
  description: string;
  buttonName: string;
  buttonLink: string;
  image: string;
}

const Card = ({
  title,
  description,
  buttonName,
  buttonLink,
  image,
}: CardProps) => {
  return (
    <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      <img className="rounded-t-lg" src={image} alt="" />
      <div className="p-5">
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          {title}
        </h5>

        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
          {description}
        </p>
        <LinkButton name={buttonName} link={buttonLink} />
      </div>
    </div>
  );
};

export default Card;
