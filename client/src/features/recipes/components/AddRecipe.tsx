/* eslint-disable react/no-unescaped-entities */
import { ChangeEvent, FormEvent, KeyboardEvent, useRef, useState } from "react";
import Breadcrumb from "../../../app/components/Breadcrumb/Breadcrumb";
import { useCreateRecipeMutation } from "../../../app/api";
import Alert from "../../../app/components/Alerts/Alert";
import { Recipe } from "../types/state";
import CustomList from "../../../app/components/CustomList/CustomList";
import AddRecipeSteps from "./AddRecipeSteps";

const AddRecipe = () => {
  interface RecipeFormData extends Recipe {}

  const intialData: RecipeFormData = {
    title: "",
    description: "",
    cuisine: "",
    image: "",
    ingredients: [],
    instructions: [],
    tags: [],
  };

  const [recipeData, setRecipeData] = useState<RecipeFormData>(intialData);
  const [ingredients, setIngredients] = useState<string[]>([]);
  const [instructions, setInstructions] = useState<string[]>([]);

  const formRef = useRef<HTMLFormElement>(null);

  const [createRecipe, { isError, isLoading, isSuccess, error }] =
    useCreateRecipeMutation();

  const handleOnChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    e.preventDefault();
    const { name, value } = e.target as HTMLInputElement | HTMLTextAreaElement;
    setRecipeData((prevRecipeData) => ({ ...prevRecipeData, [name]: value }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const form = formRef.current;
    if (form && !form.checkValidity()) {
      form.reportValidity();
      return;
    }
    const data = { ...recipeData, ingredients, instructions };
    createRecipe(data);
    setRecipeData(intialData);
    setIngredients([]);
    setInstructions([]);
  };

  const handleInstructionOrIngredients = (
    e: KeyboardEvent<HTMLInputElement>,
  ) => {
    if (e.key === "Enter") {
      const { name, value } = e.target as HTMLInputElement;
      if (name === "ingredients") {
        setIngredients((prevVal) => [...prevVal, value]);
      } else {
        setInstructions((prevVal) => [...prevVal, value]);
      }
      e.currentTarget.value = "";
    }
  };

  return (
    <div className="mx-auto">
      <Breadcrumb pageName={"Add Recipe"} prevPath={"recipes"} />
      {isSuccess && (
        <Alert
          title="Submitted for Review..."
          message="Sit back and relax, meanwhile our judges will verify and approve"
          type="success"
        />
      )}
      {isError && <Alert message={JSON.stringify(error)} type="error" />}
      <div className="grid grid-cols-1 gap-9 sm:grid-cols-2">
        <AddRecipeSteps />
        <div className="flex flex-col gap-9">
          {/* <!-- Create recipe form--> */}
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">
                Create Recipe
              </h3>
            </div>
            <form ref={formRef}>
              <div className="p-6.5">
                <div className="mb-4.5">
                  <label
                    className="mb-2.5 block text-black dark:text-white"
                    htmlFor="title"
                  >
                    Title <span className="text-meta-1">*</span>
                  </label>
                  <input
                    required
                    type="text"
                    id="title"
                    name="title"
                    value={recipeData.title}
                    onChange={handleOnChange}
                    placeholder="Enter Recipe Title"
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  />
                </div>

                <div className="mb-4.5">
                  <label
                    className="mb-2.5 block text-black dark:text-white"
                    htmlFor="description"
                  >
                    Description <span className="text-meta-1">*</span>
                  </label>
                  <input
                    required
                    type="text"
                    name="description"
                    id="description"
                    value={recipeData.description}
                    onChange={handleOnChange}
                    placeholder="Enter recipe description"
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  />
                </div>

                <div className="mb-4.5">
                  <label
                    className="mb-2.5 block text-black dark:text-white"
                    htmlFor="cuisine"
                  >
                    Cuisine <span className="text-meta-1">*</span>
                  </label>
                  <input
                    required
                    type="text"
                    id="cuisine"
                    name="cuisine"
                    value={recipeData.cuisine}
                    onChange={handleOnChange}
                    placeholder="Enter Cuisine"
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  />
                </div>

                <div className="mb-4.5">
                  <label
                    className="mb-2.5 block text-black dark:text-white"
                    htmlFor="image"
                  >
                    Recipe Image Url
                  </label>
                  <input
                    type="text"
                    name="image"
                    id="image"
                    value={recipeData.image}
                    onChange={handleOnChange}
                    placeholder="Enter Recipe image url"
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  />
                </div>
                <div className="mb-4.5">
                  <label
                    className="mb-2.5 block text-black dark:text-white"
                    htmlFor="tags"
                  >
                    Tags <span className="text-meta-1">*</span>
                  </label>
                  <input
                    required
                    type="text"
                    id="tags"
                    name="tags"
                    value={recipeData.tags}
                    onChange={handleOnChange}
                    placeholder="#dessert#vegetarien"
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  />
                </div>
                <div className="mb-6">
                  <label
                    className="mb-2.5 block text-black dark:text-white"
                    htmlFor="ingredients"
                  >
                    Ingredients <span className="text-meta-1">*</span>
                  </label>
                  <input
                    autoComplete="off"
                    type="text"
                    name="ingredients"
                    id="ingredients"
                    onKeyUp={handleInstructionOrIngredients}
                    placeholder="Type Ingredient and press enter to add in list"
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  />

                  <CustomList
                    listItems={ingredients}
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary overflow-y-auto h-35"
                  />
                </div>
                <div className="mb-6">
                  <label
                    className="mb-2.5 block text-black dark:text-white"
                    htmlFor="instructions"
                  >
                    Instructions <span className="text-meta-1">*</span>
                  </label>
                  <input
                    autoComplete="off"
                    type="text"
                    name="instructions"
                    id="instructions"
                    onKeyUp={handleInstructionOrIngredients}
                    placeholder="Type Instructions and press enter to add in list"
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  />
                  <CustomList
                    listItems={instructions}
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary overflow-y-auto h-35"
                  />
                </div>
                {isLoading ? (
                  <button
                    type="button"
                    className="flex w-full justify-center items-center px-4 py-2 font-semibold leading-6 text-sm shadow rounded-md text-white bg-indigo-500 hover:bg-indigo-400 transition ease-in-out duration-150 cursor-not-allowed"
                    disabled
                  >
                    <svg
                      className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Processing...
                  </button>
                ) : (
                  <button
                    type="button"
                    className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90"
                    onClick={handleSubmit}
                  >
                    Submit Recipe
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddRecipe;
