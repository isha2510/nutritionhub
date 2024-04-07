import { useParams } from "react-router"; // Assuming you're using React Router
import Breadcrumb from "../../../app/components/Breadcrumb/Breadcrumb";
import { useFetchRecipeByIdQuery } from "../../../app/api";
import Loading from "../../../app/components/Loader/Loading";

const RecipeDetail = () => {
  const params = useParams();
  const id = params.id!;
  const { data, isLoading, error } = useFetchRecipeByIdQuery(id);
  const recipe = data!;
  return (
    <div className="mx-auto">
      <Loading isLoading={isLoading} error={error}>
        {recipe && (
          <>
            <Breadcrumb pageName="Recipe Details" prevPath="recipes" />
            <h1 className="text-3xl font-bold mb-4">{recipe.title}</h1>
            <section className="text-gray-600 body-font">
              <div className="px-5 py-2 mx-auto flex flex-wrap">
                <div className="lg:w-1/2 w-full mb-10 lg:mb-0 rounded-lg overflow-hidden">
                  <img
                    alt={recipe.title}
                    className="object-cover object-center w-full h-180"
                    src={recipe.image}
                  />
                </div>
                <div className="flex flex-col flex-wrap lg:py-6 -mb-10 lg:w-1/2 lg:pl-12 lg:text-left text-center">
                  <div className="flex flex-col mb-10 lg:items-start items-center">
                    <div className="w-12 h-12 inline-flex items-center justify-center rounded-full bg-indigo-100 text-indigo-500 mb-5">
                      <svg
                        fill="none"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        className="w-6 h-6"
                        viewBox="0 0 24 24"
                      >
                        <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
                      </svg>
                    </div>
                    <div className="flex-grow">
                      <h2 className="text-gray-900 text-lg title-font font-medium mb-3">
                        Description
                      </h2>
                      <p className="leading-relaxed text-base">
                        {recipe.description}
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-col mb-10 lg:items-start items-center">
                    <div className="w-12 h-12 inline-flex items-center justify-center rounded-full bg-indigo-100 text-indigo-500 mb-5">
                      <svg
                        fill="none"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        className="w-6 h-6"
                        viewBox="0 0 24 24"
                      >
                        <circle cx="6" cy="6" r="3"></circle>
                        <circle cx="6" cy="18" r="3"></circle>
                        <path d="M20 4L8.12 15.88M14.47 14.48L20 20M8.12 8.12L12 12"></path>
                      </svg>
                    </div>
                    <div className="flex-grow">
                      <h2 className="text-gray-900 text-lg title-font font-medium mb-3">
                        Ingredients
                      </h2>
                      <p className="leading-relaxed text-base">
                        {recipe.ingredients}
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-col mb-10 lg:items-start items-center">
                    <div className="w-12 h-12 inline-flex items-center justify-center rounded-full bg-indigo-100 text-indigo-500 mb-5">
                      <svg
                        fill="none"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        className="w-6 h-6"
                        viewBox="0 0 24 24"
                      >
                        <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"></path>
                        <circle cx="12" cy="7" r="4"></circle>
                      </svg>
                    </div>
                    <div className="flex-grow">
                      <h2 className="text-gray-900 text-lg title-font font-medium mb-3">
                        Instruction
                      </h2>
                      <p className="leading-relaxed text-base">
                        {recipe.instructions}
                      </p>
                    </div>
                  </div>
                  {/* Render other recipe details here */}
                </div>
              </div>
            </section>
          </>
        )}
      </Loading>
    </div>
  );
};

export default RecipeDetail;
