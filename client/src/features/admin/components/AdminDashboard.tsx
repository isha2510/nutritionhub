import { useState } from "react";
import Breadcrumb from "../../../app/components/Breadcrumb/Breadcrumb";
import Loading from "../../../app/components/Loader/Loading";
import { useGetPendingRecipesQuery } from "../../recipes/api/recipesApi";
import PendingRecipes from "./PendingRecipes";
import RecipeStats from "./RecipeStats";

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState<'pending' | 'stats'>('pending');
  const { data: pendingRecipes, isLoading, error } = useGetPendingRecipesQuery();

  return (
    <div>
      <Breadcrumb pageName="Admin Dashboard" prevPath={null} />
      
      <div className="bg-white dark:bg-boxdark rounded-lg shadow-md p-6 mb-6">
        <div className="mb-6">
          <div className="flex border-b border-bodydark2 dark:border-strokedark">
            <button 
              className={`px-4 py-2 font-medium ${
                activeTab === 'pending' 
                  ? 'border-b-2 border-primary text-primary' 
                  : 'text-bodydark'
              }`}
              onClick={() => setActiveTab('pending')}
            >
              Pending Approvals
            </button>
            <button 
              className={`px-4 py-2 font-medium ${
                activeTab === 'stats' 
                  ? 'border-b-2 border-primary text-primary' 
                  : 'text-bodydark'
              }`}
              onClick={() => setActiveTab('stats')}
            >
              Recipe Statistics
            </button>
          </div>
        </div>

        <Loading isLoading={isLoading} error={error}>
          {activeTab === 'pending' && pendingRecipes && (
            <PendingRecipes recipes={pendingRecipes} />
          )}
          
          {activeTab === 'stats' && (
            <RecipeStats />
          )}
        </Loading>
      </div>
    </div>
  );
};

export default AdminDashboard; 