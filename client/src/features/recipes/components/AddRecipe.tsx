import { ChangeEvent, FormEvent, KeyboardEvent, useRef, useState } from "react";
import Breadcrumb from "../../../app/components/Breadcrumb/Breadcrumb";
import { useCreateRecipeMutation } from "../../../app/api";
import Alert from "../../../app/components/Alerts/Alert";
import { Recipe } from "../types/state";
import CustomList from "../../../app/components/CustomList/CustomList";

const AddRecipe = () => {

  interface RecipeFormData extends Recipe {
  }

  const intialData: RecipeFormData = {
    title: "",
    description: "",
    image: "",
    ingredients: [],
    instructions: []
  }

  const [recipeData, setRecipeData] = useState<RecipeFormData>(intialData);
  const [ingredients, setIngredients] = useState<string[]>([]);
  const [instructions, setInstructions] = useState<string[]>([]);

  const formRef = useRef<HTMLFormElement>(null);

  const [createRecipe, { isError, isLoading, isSuccess, error }] = useCreateRecipeMutation();

  const handleOnChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    e.preventDefault();
    const { name, value } = e.target as HTMLInputElement | HTMLTextAreaElement;
    setRecipeData(prevRecipeData => ({ ...prevRecipeData, [name]: value }));
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const form = formRef.current;
    if (form && !form.checkValidity()) {
      form.reportValidity();
      return;
    }
    const data = { ...recipeData, ingredients, instructions };
    console.log(data);
    createRecipe(data);
    setRecipeData(intialData);
    setIngredients([]);
    setInstructions([]);
  }

  const handleInstructionOrIngredients = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      let { name, value } = (e.target as HTMLInputElement);
      if (name === 'ingredients') {
        setIngredients(prevVal => [...prevVal, value]);
      } else {
        setInstructions(prevVal => [...prevVal, value]);
      }
      e.currentTarget.value = '';
    }
  }

  return (
    <div className="mx-auto">
      <Breadcrumb pageName={"Add Recipe"} prevPath={"recipes"} />
      {isSuccess && <Alert title="Submitted for Review..." message="Sit back and relax, meanwhile our judges will verify and approve" type="success" />}
      {isError && <Alert message={JSON.stringify(error)} type="error" />}
      <div className="grid grid-cols-1 gap-9 sm:grid-cols-2">
        <div className="flex flex-col gap-9">
          <div className="flex flex-wrap">
            <div className="flex relative pt-10 pb-20 sm:items-center md:w-full mx-auto">
              <div className="h-full w-6 absolute inset-0 flex items-center justify-center">
                <div className="h-full w-1 bg-gray-200 pointer-events-none"></div>
              </div>
              <div className="flex-shrink-0 w-6 h-6 rounded-full mt-10 sm:mt-0 inline-flex items-center justify-center bg-indigo-500 text-white relative z-10 title-font font-medium text-sm">1</div>
              <div className="flex-grow md:pl-8 pl-6 flex sm:items-center items-start flex-col sm:flex-row">
                <div className="flex-shrink-0 w-24 h-24 bg-indigo-100 text-indigo-500 rounded-full inline-flex items-center justify-center">
                  <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-12 h-12" viewBox="0 0 24 24">
                    <path fill="none" stroke="currentColor" strokeWidth="2" d="M12,2v20M22,12H2" />
                  </svg>
                </div>
                <div className="flex-grow sm:pl-6 mt-6 sm:mt-0">
                  <h2 className="font-medium title-font text-black dark:text-white mb-1 text-xl">Add The Recipe</h2>
                  <p className="leading-relaxed">During this step, users input all the necessary details for their recipe, including ingredients and instructions. It's the foundation of their culinary creation.</p>
                </div>
              </div>
            </div>
            <div className="flex relative pb-20 sm:items-center md:w-full mx-auto">
              <div className="h-full w-6 absolute inset-0 flex items-center justify-center">
                <div className="h-full w-1 bg-gray-200 pointer-events-none"></div>
              </div>
              <div className="flex-shrink-0 w-6 h-6 rounded-full mt-10 sm:mt-0 inline-flex items-center justify-center bg-indigo-500 text-white relative z-10 title-font font-medium text-sm">2</div>
              <div className="flex-grow md:pl-8 pl-6 flex sm:items-center items-start flex-col sm:flex-row">
                <div className="flex-shrink-0 w-24 h-24 bg-indigo-100 text-indigo-500 rounded-full inline-flex items-center justify-center">
                  <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-12 h-12" viewBox="0 0 24 24">
                    <path fill="none" stroke="currentColor" strokeWidth="2" d="M18,2H6C4.9,2,4,2.9,4,4v16c0,1.1,0.9,2,2,2h12c1.1,0,2-0.9,2-2V4C20,2.9,19.1,2,18,2z" />
                    <line fill="none" stroke="currentColor" strokeWidth="2" x1="12" y1="2" x2="12" y2="22" />
                    <line fill="none" stroke="currentColor" strokeWidth="2" x1="4" y1="8" x2="20" y2="8" />
                    <line fill="none" stroke="currentColor" strokeWidth="2" x1="4" y1="14" x2="20" y2="14" />
                  </svg>
                </div>
                <div className="flex-grow sm:pl-6 mt-6 sm:mt-0">
                  <h2 className="font-medium title-font text-black dark:text-white mb-1 text-xl">Submit for Review</h2>
                  <p className="leading-relaxed">Once the recipe is filled out, users submit it for review. It's like handing over their culinary masterpiece to the judges.</p>
                </div>
              </div>
            </div>
            <div className="flex relative pb-20 sm:items-center md:w-full mx-auto">
              <div className="h-full w-6 absolute inset-0 flex items-center justify-center">
                <div className="h-full w-1 bg-gray-200 pointer-events-none"></div>
              </div>
              <div className="flex-shrink-0 w-6 h-6 rounded-full mt-10 sm:mt-0 inline-flex items-center justify-center bg-indigo-500 text-white relative z-10 title-font font-medium text-sm">3</div>
              <div className="flex-grow md:pl-8 pl-6 flex sm:items-center items-start flex-col sm:flex-row">
                <div className="flex-shrink-0 w-24 h-24 bg-indigo-100 text-indigo-500 rounded-full inline-flex items-center justify-center">
                  <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-12 h-12" viewBox="0 0 24 24">
                    <path d="M20 6L9 17l-5-5"></path>
                  </svg>
                </div>
                <div className="flex-grow sm:pl-6 mt-6 sm:mt-0">
                  <h2 className="font-medium title-font text-black dark:text-white mb-1 text-xl">Approved</h2>
                  <p className="leading-relaxed">After submission, an admin carefully examines the recipe. If it meets the criteria, it receives the coveted approval stamp. 🌟</p>
                </div>
              </div>
            </div>
            <div className="flex relative pb-10 sm:items-center md:w-full mx-auto">
              <div className="h-full w-6 absolute inset-0 flex items-center justify-center">
                <div className="h-full w-1 bg-gray-200 pointer-events-none"></div>
              </div>
              <div className="flex-shrink-0 w-6 h-6 rounded-full mt-10 sm:mt-0 inline-flex items-center justify-center bg-indigo-500 text-white relative z-10 title-font font-medium text-sm">4</div>
              <div className="flex-grow md:pl-8 pl-6 flex sm:items-center items-start flex-col sm:flex-row">
                <div className="flex-shrink-0 w-24 h-24 bg-indigo-100 text-indigo-500 rounded-full inline-flex items-center justify-center">
                  <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-12 h-12" viewBox="0 0 24 24">
                    <path d="M21 12h-4l-3 9L9 3l-3 9H2"></path>
                  </svg>
                </div>
                <div className="flex-grow sm:pl-6 mt-6 sm:mt-0">
                  <h2 className="font-medium title-font text-black dark:text-white mb-1 text-xl">Publish</h2>
                  <p className="leading-relaxed"> Voilà! The recipe is now ready for the world. It graces the virtual "wall" of culinary delights, waiting to be savored by others. Bon appétit! 🍽️</p>
                </div>
              </div>
            </div>
          </div>

        </div>
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
                  <label className="mb-2.5 block text-black dark:text-white">
                    Title <span className="text-meta-1">*</span>
                  </label>
                  <input
                    required
                    type="text"
                    name="title"
                    value={recipeData.title}
                    onChange={handleOnChange}
                    placeholder="Enter Recipe Title"
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  />
                </div>

                <div className="mb-4.5">
                  <label className="mb-2.5 block text-black dark:text-white">
                    Description <span className="text-meta-1">*</span>
                  </label>
                  <input
                    required
                    type="text"
                    name="description"
                    value={recipeData.description}
                    onChange={handleOnChange}
                    placeholder="Enter recipe description"
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  />
                </div>

                <div className="mb-4.5">
                  <label className="mb-2.5 block text-black dark:text-white">
                    Recipe Image Url
                  </label>
                  <input
                    type="text"
                    name="image"
                    value={recipeData.image}
                    onChange={handleOnChange}
                    placeholder="Enter Recipe image url"
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  />
                </div>

                <div className="mb-6">
                  <label className="mb-2.5 block text-black dark:text-white">
                    Ingredients <span className="text-meta-1">*</span>
                  </label>
                  <input
                    autoComplete="off"
                    type="text"
                    name="ingredients"
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
                  <label className="mb-2.5 block text-black dark:text-white">
                    Instructions <span className="text-meta-1">*</span>
                  </label>
                  <input
                    autoComplete="off"
                    type="text"
                    name="instructions"
                    onKeyUp={handleInstructionOrIngredients}
                    placeholder="Type Instructions and press enter to add in list"
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  />
                  <CustomList
                    listItems={instructions}
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary overflow-y-auto h-35"
                  />
                </div>
                {isLoading ?
                  <button type="button" className="flex w-full justify-center items-center px-4 py-2 font-semibold leading-6 text-sm shadow rounded-md text-white bg-indigo-500 hover:bg-indigo-400 transition ease-in-out duration-150 cursor-not-allowed" disabled>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Processing...
                  </button>
                  :
                  <button type="button" className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90"
                    onClick={handleSubmit}
                  >
                    Submit Recipe
                  </button>}
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddRecipe;
