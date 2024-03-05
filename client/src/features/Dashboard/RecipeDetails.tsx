import { useLocation } from "react-router"; // Assuming you're using React Router

const RecipeDetail = () => {
  const location = useLocation();
  console.log("state===", location.state);
  const { recipe } = location.state;

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">{recipe.title}</h1>
      <img
        src={recipe.image}
        alt={recipe.title}
        className="w-full h-40 object-cover mb-4"
      />
      <p className="text-gray-600">{recipe.description}</p>
      <p className="text-gray-600">{recipe.ingredients}</p>
      <p className="text-gray-600">{recipe.instructions}</p>
      {/* Render other recipe details here */}
    </div>
  );
};

export default RecipeDetail;
