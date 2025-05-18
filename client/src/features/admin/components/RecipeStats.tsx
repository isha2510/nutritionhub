import { useGetAllRecipesQuery } from "../../recipes/api/recipesApi";

const RecipeStats = () => {
  const { data: recipes = [] } = useGetAllRecipesQuery();
  
  // Calculate statistics
  const totalRecipes = recipes.length;
  const approvedRecipes = recipes.filter(recipe => recipe.isApproved).length;
  const pendingRecipes = recipes.filter(recipe => !recipe.isApproved).length;
  const approvalRate = totalRecipes > 0 ? Math.round((approvedRecipes / totalRecipes) * 100) : 0;
  
  // Get top recipe contributors
  const contributors = recipes.reduce((acc: Record<string, number>, recipe) => {
    const email = recipe.user?.email || 'Unknown';
    acc[email] = (acc[email] || 0) + 1;
    return acc;
  }, {});
  
  // Sort contributors by number of recipes
  const sortedContributors = Object.entries(contributors)
    .sort(([, countA], [, countB]) => countB - countA)
    .slice(0, 5); // Top 5 contributors
  
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Recipe Statistics</h2>
      
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {/* Total Recipes Card */}
        <div className="rounded-lg bg-white border border-stroke p-6 shadow-md dark:border-strokedark dark:bg-boxdark">
          <h3 className="text-xl font-bold text-black dark:text-white">Total Recipes</h3>
          <div className="mt-4 flex items-end justify-between">
            <div>
              <h4 className="text-3xl font-bold text-black dark:text-white">
                {totalRecipes}
              </h4>
            </div>
          </div>
        </div>

        {/* Approved Recipes Card */}
        <div className="rounded-lg bg-white border border-stroke p-6 shadow-md dark:border-strokedark dark:bg-boxdark">
          <h3 className="text-xl font-bold text-black dark:text-white">Approved</h3>
          <div className="mt-4 flex items-end justify-between">
            <div>
              <h4 className="text-3xl font-bold text-meta-3">
                {approvedRecipes}
              </h4>
            </div>
          </div>
        </div>

        {/* Pending Recipes Card */}
        <div className="rounded-lg bg-white border border-stroke p-6 shadow-md dark:border-strokedark dark:bg-boxdark">
          <h3 className="text-xl font-bold text-black dark:text-white">Pending</h3>
          <div className="mt-4 flex items-end justify-between">
            <div>
              <h4 className="text-3xl font-bold text-meta-6">
                {pendingRecipes}
              </h4>
            </div>
          </div>
        </div>
      </div>

      {/* Approval Rate Indicator */}
      <div className="rounded-lg bg-white border border-stroke p-6 shadow-md dark:border-strokedark dark:bg-boxdark">
        <h3 className="text-xl font-bold text-black dark:text-white mb-4">Approval Rate</h3>
        <div className="w-full bg-gray rounded-full h-4 dark:bg-boxdark-2">
          <div 
            className="bg-primary h-4 rounded-full transition-all duration-500"
            style={{ width: `${approvalRate}%` }}
          ></div>
        </div>
        <div className="mt-2 text-right text-sm">{approvalRate}%</div>
      </div>

      {/* Top Contributors */}
      <div className="rounded-lg bg-white border border-stroke p-6 shadow-md dark:border-strokedark dark:bg-boxdark">
        <h3 className="text-xl font-bold text-black dark:text-white mb-4">Top Contributors</h3>
        
        {sortedContributors.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full table-auto">
              <thead className="bg-gray dark:bg-boxdark-2">
                <tr>
                  <th className="py-2 px-4 text-left">User</th>
                  <th className="py-2 px-4 text-left">Recipes</th>
                </tr>
              </thead>
              <tbody>
                {sortedContributors.map(([email, count], index) => (
                  <tr key={index} className="border-b border-bodydark2 dark:border-strokedark">
                    <td className="py-3 px-4">{email}</td>
                    <td className="py-3 px-4">{count}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-body">No contributors yet</p>
        )}
      </div>
    </div>
  );
};

export default RecipeStats; 