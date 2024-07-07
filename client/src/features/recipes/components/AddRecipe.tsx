import { ChangeEvent, FormEvent, KeyboardEvent, useRef, useState } from "react";
import Breadcrumb from "../../../app/components/Breadcrumb/Breadcrumb";
import { useCreateRecipeMutation } from "../api/recipesApi";
import Alert from "../../../app/components/Alerts/Alert";
import { Recipe, Tag } from "../types/state";
import AddRecipeSteps from "./AddRecipeSteps";
import RecipeForm from "./RecipeForm";

const AddRecipe = () => {
  interface RecipeFormData extends Recipe {}

  const initialData: RecipeFormData = {
    title: "",
    description: "",
    cuisine: "",
    image: "",
    ingredients: [],
    instructions: [],
    tags: [],
  };

  const [recipeData, setRecipeData] = useState<RecipeFormData>(initialData);
  const [ingredients, setIngredients] = useState<string[]>([]);
  const [instructions, setInstructions] = useState<string[]>([]);
  const [tags, setTag] = useState<Tag[]>([]);

  const formRef = useRef<HTMLFormElement>(null);

  const [createRecipe, { isError, isLoading, isSuccess, error }] =
    useCreateRecipeMutation();

  const handleOnChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    e.preventDefault();
    const { name, value } = e.target;
    setRecipeData((prevRecipeData) => ({ ...prevRecipeData, [name]: value }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const form = formRef.current;
    if (form && !form.checkValidity()) {
      form.reportValidity();
      return;
    }
    const data = { ...recipeData, ingredients, instructions, tags };
    createRecipe(data);
    setRecipeData(initialData);
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
      } else if (name === "instructions") {
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
        <AddRecipeSteps isEdit={false} />
        <div className="flex flex-col gap-9">
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">
                Create Recipe
              </h3>
            </div>
            <RecipeForm
              recipeData={recipeData}
              ingredients={ingredients}
              instructions={instructions}
              handleOnChange={handleOnChange}
              handleInstructionOrIngredients={handleInstructionOrIngredients}
              handleSubmit={handleSubmit}
              isLoading={isLoading}
              setTag={setTag}
              tags={tags}
              isEditRecipe={false}
              setIngredients={setIngredients}
              setInstructions={setInstructions}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddRecipe;
