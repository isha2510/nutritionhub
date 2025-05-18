import { useState } from "react";
import { Recipe } from "../../recipes/types/state";
import { useApproveRecipeMutation, useRejectRecipeMutation } from "../../recipes/api/recipesApi";
import { useNavigate } from "react-router-dom";

interface PendingRecipesProps {
  recipes: Recipe[];
}

const PendingRecipes = ({ recipes }: PendingRecipesProps) => {
  const [approveRecipe] = useApproveRecipeMutation();
  const [rejectRecipe] = useRejectRecipeMutation();
  const [rejectionReason, setRejectionReason] = useState<string>("");
  const [recipeToReject, setRecipeToReject] = useState<Recipe | null>(null);
  const navigate = useNavigate();

  const handleApprove = async (id: string | number | undefined) => {
    if (id) {
      try {
        await approveRecipe(id.toString());
      } catch (error) {
        console.error("Failed to approve recipe:", error);
      }
    }
  };

  const handleReject = async () => {
    if (recipeToReject?._id) {
      try {
        await rejectRecipe({ 
          id: recipeToReject._id.toString(), 
          reason: rejectionReason 
        });
        setRecipeToReject(null);
        setRejectionReason("");
      } catch (error) {
        console.error("Failed to reject recipe:", error);
      }
    }
  };

  const openRejectModal = (recipe: Recipe) => {
    setRecipeToReject(recipe);
  };

  const viewRecipeDetails = (id: string | number | undefined) => {
    if (id) {
      navigate(`/recipes/${id}`);
    }
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Pending Recipes Approval</h2>
      
      {recipes.length === 0 ? (
        <p className="text-body">No recipes waiting for approval</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full table-auto">
            <thead className="bg-gray dark:bg-boxdark-2">
              <tr>
                <th className="py-2 px-4 text-left">Title</th>
                <th className="py-2 px-4 text-left">Submitted By</th>
                <th className="py-2 px-4 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {recipes.map((recipe) => (
                <tr key={recipe._id} className="border-b border-bodydark2 dark:border-strokedark">
                  <td className="py-3 px-4">{recipe.title}</td>
                  <td className="py-3 px-4">{recipe.user?.email}</td>
                  <td className="py-3 px-4 flex space-x-2">
                    <button
                      onClick={() => viewRecipeDetails(recipe._id)}
                      className="bg-primary text-white px-3 py-1 rounded hover:bg-opacity-90"
                    >
                      View
                    </button>
                    <button
                      onClick={() => handleApprove(recipe._id)}
                      className="bg-meta-3 text-white px-3 py-1 rounded hover:bg-opacity-90"
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => openRejectModal(recipe)}
                      className="bg-danger text-white px-3 py-1 rounded hover:bg-opacity-90"
                    >
                      Reject
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Rejection Modal */}
      {recipeToReject && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white dark:bg-boxdark rounded-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold mb-4">Reject Recipe: {recipeToReject.title}</h3>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Reason for Rejection:</label>
              <textarea
                className="w-full border border-stroke dark:border-strokedark rounded p-2 bg-transparent"
                rows={4}
                value={rejectionReason}
                onChange={(e) => setRejectionReason(e.target.value)}
                placeholder="Provide feedback to the author..."
              />
            </div>
            <div className="flex justify-end space-x-2">
              <button
                onClick={() => setRecipeToReject(null)}
                className="px-4 py-2 border border-stroke dark:border-strokedark rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleReject}
                className="px-4 py-2 bg-danger text-white rounded hover:bg-opacity-90"
                disabled={!rejectionReason.trim()}
              >
                Reject Recipe
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PendingRecipes; 