import { useNavigate } from "react-router";
import { Recipe } from "../types/state";
import { useGetAllRecipesQuery } from "../api/recipesApi";
import Breadcrumb from "../../../app/components/Breadcrumb/Breadcrumb";
import Loading from "../../../app/components/Loader/Loading";
import Search from "../../../app/components/Search/Search";
import { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import FavoriteButton from "./FavoriteButton";
import StatusBadge from "./StatusBadge";
import { FaPlus, FaClock, FaFlask } from 'react-icons/fa';

const Recipes = () => {
  const { data, error, isLoading } = useGetAllRecipesQuery();
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [searchText, setSearchText] = useState("");
  const navigate = useNavigate();
  const { user } = useAuth0();
  
  const handleRecipeClick = (recipe: Recipe) => {
    navigate(`/recipes/${recipe._id}`);
  };

  const getSearchText = (text: string) => {
    setSearchText(text.toLowerCase());
  };

  useEffect(() => {
    if (data) {
      // Apply search filter if text is entered
      const filteredRecipes = searchText 
        ? data.filter(recipe => {
            const recipeText = JSON.stringify(recipe).toLowerCase();
            return recipeText.includes(searchText);
          })
        : data;
      
      setRecipes(filteredRecipes);
    }
  }, [data, searchText]);

  return (
    <div className="container mx-auto px-4 py-8">
      <Loading isLoading={isLoading} error={error}>
        <>
          <Breadcrumb pageName="Recipes" prevPath={null} />
          
          {/* Header section with search and create button */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8">
            <h1 className="text-2xl md:text-3xl font-bold text-black dark:text-white">
              Discover Recipes
            </h1>
            
            <div className="flex w-full md:w-auto gap-4 items-center">
              <div className="w-full md:w-auto">
                <Search getSearchText={getSearchText} />
              </div>
              
              <button 
                onClick={() => navigate('/add-recipe')}
                className="inline-flex items-center justify-center gap-2.5 rounded-md bg-primary py-3 px-6 text-white hover:bg-opacity-90 transition-all duration-300"
              >
                <FaPlus className="w-4 h-4" />
                Create Recipe
              </button>
            </div>
          </div>

          {/* Empty state */}
          {recipes && recipes.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <FaFlask className="w-16 h-16 text-bodydark mb-4" />
              <h3 className="text-xl font-semibold mb-2 dark:text-white">No recipes found</h3>
              <p className="text-body max-w-md mb-6">
                We couldn't find any recipes matching your search. Try adjusting your filters or create your first recipe.
              </p>
              <button 
                onClick={() => navigate('/add-recipe')}
                className="inline-flex items-center justify-center rounded-md bg-primary py-2 px-6 text-white hover:bg-opacity-90 transition-all duration-300"
              >
                Create Your First Recipe
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {recipes.map((recipe: Recipe) => (
                <div
                  key={recipe._id}
                  className="group relative rounded-xl overflow-hidden bg-white dark:bg-boxdark border border-stroke dark:border-strokedark shadow-default transition-all duration-300 hover:shadow-lg hover:-translate-y-1 h-full flex flex-col"
                >
                  {/* Image with overlay gradient and favorite button */}
                  <div 
                    className="relative pb-[60%] overflow-hidden cursor-pointer"
                    onClick={() => handleRecipeClick(recipe)}
                  >
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <img
                      className="absolute h-full w-full object-cover object-center transition-transform duration-700 group-hover:scale-110"
                      src={recipe.image || 'https://via.placeholder.com/300x200?text=No+Image'}
                      alt={recipe.title}
                    />
                    
                    {/* Status badge positioned on image */}
                    <div className="absolute top-3 left-3 z-20">
                      <StatusBadge 
                        recipe={recipe} 
                        currentUserEmail={user?.email} 
                      />
                    </div>
                    
                    {/* Favorite button */}
                    <div className="absolute top-3 right-3 z-20" onClick={(e) => e.stopPropagation()}>
                      <FavoriteButton 
                        recipeId={recipe._id ? String(recipe._id) : ""}
                        className="bg-white bg-opacity-80 backdrop-blur-sm rounded-full p-1.5 shadow hover:bg-opacity-100 transition-all"
                        iconClassName="w-5 h-5"
                      />
                    </div>
                  </div>
                  
                  {/* Content section */}
                  <div 
                    className="p-5 flex-grow flex flex-col cursor-pointer"
                    onClick={() => handleRecipeClick(recipe)}
                  >
                    {/* Tags row */}
                    <div className="flex flex-wrap gap-2 mb-2">
                      {recipe.tags && recipe.tags.length > 0 && recipe.tags.slice(0, 2).map((tag, index) => (
                        <span key={index} className="bg-gray-100 dark:bg-meta-4 text-xs px-2 py-1 rounded">
                          {tag.tag}
                        </span>
                      ))}
                      {recipe.tags && recipe.tags.length > 2 && (
                        <span className="bg-gray-100 dark:bg-meta-4 text-xs px-2 py-1 rounded">
                          +{recipe.tags.length - 2}
                        </span>
                      )}
                    </div>
                    
                    {/* Title */}
                    <h2 className="text-lg font-semibold text-black dark:text-white mb-2 line-clamp-2">
                      {recipe.title}
                    </h2>
                    
                    {/* Description */}
                    <p className="text-body dark:text-bodydark text-sm line-clamp-2 mb-4">
                      {recipe.description}
                    </p>
                    
                    {/* Footer with cuisine and info */}
                    <div className="mt-auto pt-3 border-t border-stroke dark:border-strokedark flex justify-between items-center">
                      {recipe.cuisine && (
                        <span className="text-xs text-bodydark capitalize">
                          {recipe.cuisine}
                        </span>
                      )}
                      
                      <div className="flex items-center">
                        <FaClock className="w-4 h-4 text-meta-6 mr-1" />
                        <span className="text-xs text-bodydark">
                          {recipe.prepTime || recipe.cookTime ? 
                            (recipe.prepTime ? `Prep: ${recipe.prepTime}` : `Cook: ${recipe.cookTime}`) 
                            : 'View Recipe'}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      </Loading>
    </div>
  );
};

export default Recipes;
