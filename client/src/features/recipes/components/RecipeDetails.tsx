import { useParams, useNavigate } from "react-router";
import Breadcrumb from "../../../app/components/Breadcrumb/Breadcrumb";
import { useFetchRecipeByIdQuery } from "../api/recipesApi";
import Loading from "../../../app/components/Loader/Loading";
import CustomList from "../../../app/components/CustomList/CustomList";
import { useAuth0 } from "@auth0/auth0-react";
import { useState } from "react";
import "../styles/recipeDetails.css";
import { useCountFavoritesQuery } from "../../favorites/api/favoritesApi";
import { FaTags, FaClock, FaGlobe, FaHeart, FaShare, FaPrint, FaExclamationTriangle } from 'react-icons/fa';
import { HeartIcon } from "../../../app/components/Icons/Icons";
import RecipeAIInsights from "../../ai/components/RecipeAIInsights";

// Static favorite icon component (non-interactive)
const StaticFavoriteIcon = ({ 
  filled = false, 
  className = '', 
  iconClassName = 'w-5 h-5',
  showText = false 
}) => {
  return (
    <div className={`flex items-center gap-1 ${className}`}>
      <HeartIcon 
        filled={filled} 
        className={`${iconClassName} ${filled ? 'text-red-500' : 'text-gray-400'}`}
      />
      
      {showText && (
        <span className={`text-sm ${filled ? 'text-red-500' : 'text-gray-500'}`}>
          {filled ? 'Favorited' : 'Favorite'}
        </span>
      )}
    </div>
  );
};

const RecipeDetail = () => {
  const params = useParams();
  const { user } = useAuth0();
  const id = params.id!;
  const { data, isLoading, error } = useFetchRecipeByIdQuery(id);
  const recipe = data!;
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'ingredients' | 'instructions'>('ingredients');
  
  // Get favorite count for this recipe
  const { data: favoriteCountData } = useCountFavoritesQuery(id, {
    // Use aggressive caching strategy to avoid duplicate fetches
    refetchOnMountOrArgChange: false, 
    refetchOnFocus: false,
    refetchOnReconnect: false,
    pollingInterval: 0
  });
  const favoriteCount = favoriteCountData?.count || 0;

  // Check if the current user is the recipe owner
  const isRecipeOwner = user?.email === recipe?.user?.email;

  const handleEditRecipe = () => {
    navigate(`/edit-recipe/${id}`);
  };

  // Icons
  const tagsIcon = <FaTags className="w-5 h-5" />;
  const clockIcon = <FaClock className="w-5 h-5" />;
  const cuisineIcon = <FaGlobe className="w-5 h-5" />;


  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <Loading isLoading={isLoading} error={error}>
        {recipe && (
          <>
            <Breadcrumb pageName="Recipe Details" prevPath="recipes" />
            
            {/* Hero section */}
            <div className="relative rounded-2xl overflow-hidden mb-8">
              {/* Large hero image */}
              <div className="h-80 md:h-96 relative">
                <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-80 z-10"></div>
                <img
                  src={recipe.image || 'https://via.placeholder.com/1200x600?text=No+Image'}
                  alt={recipe.title}
                  className="w-full h-full object-cover"
                />
                
                {/* Content overlay */}
                <div className="absolute inset-0 z-20 flex flex-col justify-end p-6 md:p-10">
                  <div className="flex flex-wrap gap-2 mb-3">
                    {recipe.tags?.slice(0, 3).map((tag, index) => (
                      <span 
                        key={index} 
                        className="bg-primary/20 text-white backdrop-blur-sm px-3 py-1 rounded-full text-sm"
                      >
                        {tag.tag}
                      </span>
                    ))}
                  </div>
                  
                  <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-2">
                    {recipe.title}
                  </h1>
                  
                  {/* Favorite and stats */}
                  <div className="flex items-center gap-4 mt-2">
                    <StaticFavoriteIcon 
                      filled={favoriteCount > 0}
                      className="bg-white bg-opacity-20 backdrop-blur-sm rounded-full p-2"
                      iconClassName="w-6 h-6 text-white"
                    />
                    <div className="text-white text-sm flex items-center gap-1">
                      <span className="font-medium">{favoriteCount}</span> {favoriteCount === 1 ? 'person likes' : 'people like'} this recipe
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Main content grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Left sidebar */}
              <div className="lg:col-span-1 space-y-6">
                {/* Quick info card */}
                <div className="bg-white dark:bg-boxdark rounded-xl overflow-hidden shadow-default">
                  <div className="p-6">
                    <h2 className="text-xl font-semibold mb-4 text-black dark:text-white">
                      Recipe Info
                    </h2>
                    
                    <ul className="space-y-4">
                      {/* Cuisine */}
                      <li className="flex items-center gap-3">
                        <div className="flex-shrink-0 w-10 h-10 bg-blue-50 dark:bg-blue-900/30 rounded-full flex items-center justify-center text-primary">
                          {cuisineIcon}
                        </div>
                        <div>
                          <span className="block text-sm text-bodydark">Cuisine</span>
                          <span className="font-medium dark:text-white capitalize">{recipe.cuisine || 'Not specified'}</span>
                        </div>
                      </li>
                      
                      {/* Time information - conditionally rendered */}
                      {(recipe.prepTime || recipe.cookTime) && (
                        <li className="flex items-center gap-3">
                          <div className="flex-shrink-0 w-10 h-10 bg-green-50 dark:bg-green-900/30 rounded-full flex items-center justify-center text-meta-3">
                            {clockIcon}
                          </div>
                          <div>
                            <span className="block text-sm text-bodydark">Time</span>
                            <div className="font-medium dark:text-white">
                              {recipe.prepTime && <span className="block">Prep: {recipe.prepTime}</span>}
                              {recipe.cookTime && <span className="block">Cook: {recipe.cookTime}</span>}
                            </div>
                          </div>
                        </li>
                      )}
                      
                      {/* Tags */}
                      <li className="flex items-start gap-3">
                        <div className="flex-shrink-0 w-10 h-10 mt-1 bg-amber-50 dark:bg-amber-900/30 rounded-full flex items-center justify-center text-meta-6">
                          {tagsIcon}
                        </div>
                        <div>
                          <span className="block text-sm text-bodydark mb-2">Tags</span>
                          <div className="flex flex-wrap gap-2">
                            {recipe.tags?.map((tag, index) => (
                              <span 
                                key={index} 
                                className="bg-gray-100 dark:bg-meta-4 px-2 py-1 rounded text-xs"
                              >
                                {tag.tag}
                              </span>
                            ))}
                            {!recipe.tags?.length && <span className="text-sm">No tags</span>}
                          </div>
                        </div>
                      </li>
                      
                      {/* Non-interactive favorite indicator */}
                      <li className="flex items-start gap-3">
                        <div className="flex-shrink-0 w-10 h-10 mt-1 bg-red-50 dark:bg-red-900/30 rounded-full flex items-center justify-center text-meta-7">
                          <FaHeart className="w-5 h-5" />
                        </div>
                        <div className="w-full">
                          <span className="block text-sm text-bodydark mb-2">Favorite</span>
                          <div className="flex items-center gap-2 w-full bg-gray-100 dark:bg-meta-4 py-2 px-3 rounded">
                            <StaticFavoriteIcon 
                              filled={favoriteCount > 0} 
                              iconClassName="w-5 h-5" 
                              showText={true} 
                            />
                          </div>
                          <p className="text-xs text-bodydark mt-1">Use the recipe card to add/remove favorites</p>
                        </div>
                      </li>
                    </ul>
                  </div>

                  {isRecipeOwner && (
                    <div className="p-6 border-t border-stroke dark:border-strokedark">
                      <button
                        onClick={handleEditRecipe}
                        className="w-full py-2.5 px-4 text-sm font-medium text-center text-white bg-primary rounded-lg hover:bg-opacity-90 transition-all duration-300"
                      >
                        Edit Recipe
                      </button>
                    </div>
                  )}
                </div>

                {/* Rejection feedback */}
                {isRecipeOwner && recipe.rejectionReason && (
                  <div className="bg-white dark:bg-boxdark rounded-xl overflow-hidden shadow-default border-l-4 border-meta-1">
                    <div className="p-6">
                      <h3 className="flex items-center gap-2 font-semibold mb-3 text-meta-1">
                        <FaExclamationTriangle className="w-5 h-5" />
                        Rejection Feedback
                      </h3>
                      <p className="text-body dark:text-bodydark text-sm">
                        {recipe.rejectionReason}
                      </p>
                    </div>
                  </div>
                )}

                {/* AI Nutrition Analysis */}
                <RecipeAIInsights recipeId={id} />
              </div>

              {/* Main content area */}
              <div className="lg:col-span-2 space-y-6">
                {/* Description card */}
                <div className="bg-white dark:bg-boxdark rounded-xl p-6 shadow-default">
                  <h2 className="text-xl font-semibold mb-4 text-black dark:text-white">Description</h2>
                  <p className="text-body dark:text-bodydark leading-relaxed">
                    {recipe.description}
                  </p>
                </div>

                {/* Ingredients and Instructions tabs */}
                <div className="bg-white dark:bg-boxdark rounded-xl overflow-hidden shadow-default">
                  {/* Tabs navigation */}
                  <div className="flex border-b border-stroke dark:border-strokedark">
                    <button
                      className={`flex-1 py-4 px-6 text-center font-medium transition-all ${
                        activeTab === 'ingredients'
                          ? 'border-b-2 border-primary text-primary'
                          : 'text-body dark:text-bodydark hover:text-black dark:hover:text-white'
                      }`}
                      onClick={() => setActiveTab('ingredients')}
                    >
                      Ingredients
                    </button>
                    <button
                      className={`flex-1 py-4 px-6 text-center font-medium transition-all ${
                        activeTab === 'instructions'
                          ? 'border-b-2 border-primary text-primary'
                          : 'text-body dark:text-bodydark hover:text-black dark:hover:text-white'
                      }`}
                      onClick={() => setActiveTab('instructions')}
                    >
                      Instructions
                    </button>
                  </div>

                  {/* Tab content */}
                  <div className="p-6">
                    {activeTab === 'ingredients' ? (
                      <div className="recipe-list-container max-h-96">
                        <CustomList 
                          listItems={recipe.ingredients}
                          isDetail={true}
                          className="custom-recipe-list"
                        />
                      </div>
                    ) : (
                      <div className="recipe-list-container max-h-96">
                        <CustomList 
                          listItems={recipe.instructions}
                          isDetail={true}
                          className="custom-recipe-list instructions"
                        />
                      </div>
                    )}
                  </div>
                </div>
                
                {/* Share and print buttons - replaced favorite button with static version */}
                <div className="flex gap-3 justify-end">
                  <StaticFavoriteIcon 
                    filled={favoriteCount > 0}
                    className="inline-flex items-center gap-2 py-2 px-4 rounded-lg bg-gray-100 dark:bg-meta-4"
                    iconClassName="w-5 h-5"
                    showText={true}
                  />
                  <button 
                    className="inline-flex items-center gap-2 py-2 px-4 rounded-lg bg-gray-100 hover:bg-gray-200 dark:bg-meta-4 dark:hover:bg-meta-4/80 text-body dark:text-bodydark transition-colors"
                    onClick={() => navigator.clipboard.writeText(window.location.href)}
                  >
                    <FaShare className="w-5 h-5" />
                    Share
                  </button>
                  <button 
                    className="inline-flex items-center gap-2 py-2 px-4 rounded-lg bg-gray-100 hover:bg-gray-200 dark:bg-meta-4 dark:hover:bg-meta-4/80 text-body dark:text-bodydark transition-colors"
                    onClick={() => window.print()}
                  >
                    <FaPrint className="w-5 h-5" />
                    Print
                  </button>
                </div>
              </div>
            </div>
          </>
        )}
      </Loading>
    </div>
  );
};

export default RecipeDetail;
