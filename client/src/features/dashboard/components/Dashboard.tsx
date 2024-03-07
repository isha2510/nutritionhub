import { useEffect } from "react";
import { fetchRecipes } from "../redux/RecipeSlice";
import { useNavigate } from "react-router";
import { Recipe } from "../types/state";
import { useAppSelector } from "../../../app/store/hooks";
import { ThunkDispatch } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";

const Dashboard = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
  const recipes = useAppSelector((state) => state.recipes.recipes);
  const navigate = useNavigate(); // Get the history object from React Router

  useEffect(() => {
    dispatch(fetchRecipes());
  }, [dispatch]);

  const handleRecipeClick = (recipe: Recipe) => {
    navigate("/recipe-detail", { state: { recipe } }); // Navigate to the RecipeDetail component
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">
        Welcome to NeutritionsHub Recipes
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {recipes?.map((recipe: Recipe) => (
          <div
            className="bg-white rounded shadow p-4 cursor-pointer"
            key={recipe.id}
            onClick={() => handleRecipeClick(recipe)}
          >
            <img
              src={recipe.image}
              alt={recipe.title}
              className="w-full h-40 object-cover mb-4"
            />
            <h2 className="text-lg font-bold mb-2">{recipe.title}</h2>
            <p className="text-gray-600">{recipe.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
