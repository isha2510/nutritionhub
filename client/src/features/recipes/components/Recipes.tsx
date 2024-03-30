import { useNavigate } from "react-router";
import { Recipe } from "../types/state";
import { useGetAllRecipesQuery } from "../../../app/api";
import Breadcrumb from "../../../app/components/Breadcrumb/Breadcrumb";
import Loading from "../../../app/components/Loader/Loading";
import LinkButton from "../../../app/components/Button/LinkButton";

const Recipes = () => {
  const { data: recipes, error, isLoading } = useGetAllRecipesQuery();
  const navigate = useNavigate();

  const handleRecipeClick = (recipe: Recipe) => {
    navigate(`/recipes/${recipe._id}`); // Navigate to the RecipeDetail component
  };

  return (
    <div>
      <Loading isLoading={isLoading} error={error}>
        {recipes && (
          <>
            <Breadcrumb pageName="Recipes" prevPath={null} />
            <div className="mb-2">
              <LinkButton name={"Create Recipe"} link={"/add-recipe"} />
            </div>
            <section className="text-gray-600 body-font">
              <div className="mx-auto">
                <div className="flex flex-wrap">
                  {recipes.map((recipe: Recipe) => (
                    <div
                      className="p-3 md:w-1/3 cursor-pointer"
                      key={recipe._id}
                      onClick={() => handleRecipeClick(recipe)}
                    >
                      <div className="h-full border-2 border-gray-200 border-opacity-60 rounded-lg overflow-hidden">
                        <img
                          className="lg:h-48 md:h-36 w-full object-cover object-center"
                          src={recipe.image}
                          alt={recipe.title}
                        />
                        <div className="p-6">
                          <h2 className="tracking-widest text-xs title-font font-medium text-gray-400 mb-1">
                            Title
                          </h2>
                          <h1 className="title-font text-lg font-medium text-gray-900 mb-3">
                            {recipe.title}
                          </h1>
                          <p className="leading-relaxed">
                            {recipe.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          </>
        )}
      </Loading>
    </div>
  );
};

export default Recipes;
