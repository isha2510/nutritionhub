import { useAuth0 } from "@auth0/auth0-react";
import Loader from "../Loader/Loader";
import { useState } from "react";
import { useGetUserFavoritesQuery } from "../../../features/favorites/api/favoritesApi";
import { useNavigate } from "react-router-dom";
import { HeartIcon } from "../Icons/Icons";

const Profile = () => {
  const { user, isLoading: authLoading } = useAuth0();
  const [activeTab, setActiveTab] = useState("profile");
  const navigate = useNavigate();
  
  // Get roles from Auth0 user object
  const roles = user?.["https://www.nutritionhub.com/roles"] as string[] || [];
  
  // Fetch user favorites
  const { data: favoritesData, isLoading: favoritesLoading } = useGetUserFavoritesQuery();
  // Access the recipes from the new data structure
  const favoriteRecipes = favoritesData?.recipes || [];

  if (authLoading) {
    return <Loader />;
  }

  if (!user) {
    throw new Error("User is not defined in useAuth0 hook");
  }

  const navigateToRecipe = (recipeId: number) => {
    navigate(`/recipes/${recipeId}`);
  };

  return (
    <div className="container mx-auto px-4 py-8 mt-16">
      {/* Profile Card */}
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        {/* Cover Image */}
        <div className="h-40 bg-gradient-to-r from-purple-600 to-indigo-600"></div>
        
        {/* Profile Header */}
        <div className="relative px-6">
          <div className="flex flex-wrap">
            {/* Profile Picture */}
            <div className="w-full lg:w-3/12 flex justify-center lg:justify-start">
              <div className="relative">
                <img
                  src={user.picture}
                  alt={user.name}
                  className="shadow-xl rounded-full border-4 border-white absolute -mt-20 w-32 h-32 object-cover"
                />
              </div>
            </div>
            
            {/* Name and Basic Info */}
            <div className="w-full lg:w-9/12 mt-20 lg:mt-0 lg:pt-4 lg:pl-4 flex flex-col lg:flex-row justify-between">
              <div className="text-center lg:text-left pt-8 lg:pt-0">
                <h2 className="text-3xl font-bold text-gray-800">{user.name}</h2>
                <p className="text-gray-500">{user.email}</p>
                {roles.length > 0 && (
                  <div className="mt-2 flex flex-wrap gap-2">
                    {roles.map((role) => (
                      <span 
                        key={role} 
                        className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-xs font-medium"
                      >
                        {role.charAt(0).toUpperCase() + role.slice(1)}
                      </span>
                    ))}
                  </div>
                )}
              </div>
              
              {/* User Stats */}
              <div className="flex justify-center mt-4 lg:mt-0">
                <div className="px-4 py-2 text-center">
                  <p className="text-2xl font-bold text-gray-800">{favoriteRecipes?.length || 0}</p>
                  <p className="text-sm text-gray-500">Favorites</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Navigation Tabs */}
          <div className="flex border-b border-gray-200 mt-8">
            <button 
              className={`px-4 py-2 border-b-2 font-medium text-sm ${
                activeTab === "profile" 
                  ? "border-purple-500 text-purple-600" 
                  : "border-transparent text-gray-500 hover:text-gray-700"
              }`}
              onClick={() => setActiveTab("profile")}
            >
              Profile Details
            </button>
            <button 
              className={`px-4 py-2 border-b-2 font-medium text-sm ${
                activeTab === "favorites" 
                  ? "border-purple-500 text-purple-600" 
                  : "border-transparent text-gray-500 hover:text-gray-700"
              }`}
              onClick={() => setActiveTab("favorites")}
            >
              Favorites
            </button>
            <button 
              className={`px-4 py-2 border-b-2 font-medium text-sm ${
                activeTab === "activity" 
                  ? "border-purple-500 text-purple-600" 
                  : "border-transparent text-gray-500 hover:text-gray-700"
              }`}
              onClick={() => setActiveTab("activity")}
            >
              Recent Activity
            </button>
          </div>
        </div>
        
        {/* Tab Content */}
        <div className="p-6">
          {activeTab === "profile" && (
            <div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-medium text-gray-900 mb-2">Account Details</h3>
                  <div className="space-y-3">
                    <div>
                      <p className="text-sm text-gray-500">Name</p>
                      <p className="font-medium">{user.name}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Email</p>
                      <p className="font-medium">{user.email}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Nickname</p>
                      <p className="font-medium">{user.nickname || "Not set"}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">User ID</p>
                      <p className="font-medium text-xs truncate">{user.sub}</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-medium text-gray-900 mb-2">Access Roles</h3>
                  {roles.length > 0 ? (
                    <div className="space-y-3">
                      {roles.map((role) => (
                        <div key={role} className="flex items-center">
                          <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                          <p className="font-medium">{role.charAt(0).toUpperCase() + role.slice(1)}</p>
                          <div className="ml-auto text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
                            Active
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-500">No special roles assigned</p>
                  )}
                </div>
              </div>
              
              <div className="mt-6">
                <h3 className="font-medium text-gray-900 mb-2">Account Security</h3>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Password</p>
                      <p className="text-sm text-gray-500">Manage your password</p>
                    </div>
                    <button className="px-4 py-2 bg-purple-600 text-white rounded-md text-sm font-medium">
                      Change Password
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {activeTab === "favorites" && (
            <div>
              <h3 className="font-medium text-gray-900 mb-4">Your Favorite Recipes</h3>
              
              {favoritesLoading ? (
                <div className="py-8 text-center">
                  <Loader />
                </div>
              ) : favoriteRecipes && favoriteRecipes.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {favoriteRecipes.map((recipe) => (
                    <div 
                      key={recipe._id} 
                      className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow cursor-pointer"
                      onClick={() => navigateToRecipe(recipe._id as number)}
                    >
                      <div className="relative h-48 overflow-hidden">
                        <img 
                          src={recipe.image || 'https://via.placeholder.com/300x200?text=No+Image'} 
                          alt={recipe.title}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute top-2 right-2 bg-white rounded-full p-1.5 shadow">
                          <HeartIcon filled={true} className="w-5 h-5 text-red-500" />
                        </div>
                      </div>
                      <div className="p-4">
                        <h4 className="font-medium text-lg mb-1 truncate">{recipe.title}</h4>
                        <p className="text-gray-500 text-sm mb-2 line-clamp-2">{recipe.description}</p>
                        <div className="flex flex-wrap gap-2 mt-2">
                          {recipe.tags?.slice(0, 3).map((tag) => (
                            <span 
                              key={tag.tag} 
                              className="px-2 py-0.5 bg-gray-100 text-gray-800 rounded text-xs"
                            >
                              {tag.tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="py-12 text-center">
                  <p className="text-gray-500 mb-4">You haven't favorited any recipes yet.</p>
                  <button 
                    onClick={() => navigate('/recipes')} 
                    className="px-4 py-2 bg-purple-600 text-white rounded-md text-sm font-medium"
                  >
                    Browse Recipes
                  </button>
                </div>
              )}
            </div>
          )}
          
          {activeTab === "activity" && (
            <div className="text-center py-12">
              <p className="text-gray-500">Your recent activity will appear here</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
