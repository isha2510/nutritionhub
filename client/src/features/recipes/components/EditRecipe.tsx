import {
  ChangeEvent,
  FormEvent,
  KeyboardEvent,
  useRef,
  useState,
  useEffect,
} from "react";
import Breadcrumb from "../../../app/components/Breadcrumb/Breadcrumb";
//import Alert from "../../../app/components/Alerts/Alert";
import { Recipe, Tag } from "../types/state";
import RecipeForm from "./RecipeForm";
import { useParams } from "react-router-dom";
import { useFetchRecipeByIdQuery } from "../api/recipesApi";

const EditRecipe = () => {
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
  const [tags, setEditTag] = useState<Tag[]>([]);
  const params = useParams();
  const recipeId = params.id!;
  const formRef = useRef<HTMLFormElement>(null);

  const { data: fetchedRecipe, isLoading } = useFetchRecipeByIdQuery(recipeId);
  //   const [updateRecipe, { isError, isLoading, isSuccess, error }] =
  //     useUpdateRecipeMutation();

  useEffect(() => {
    if (fetchedRecipe) {
      console.log("tag", fetchedRecipe.tags);
      setRecipeData(fetchedRecipe);
      setIngredients(fetchedRecipe.ingredients);
      setInstructions(fetchedRecipe.instructions);
      setEditTag(fetchedRecipe.tags || []);
    }
  }, [fetchedRecipe]);

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
    console.log("Updated data is", data);
    // updateRecipe({ id: recipeId, ...data });
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
      <Breadcrumb pageName={"Edit Recipe"} prevPath={"recipes"} />
      {/* {isSuccess && (
        <Alert
          title="Recipe Updated Successfully"
          message="Your changes have been saved."
          type="success"
        />
      )} */}
      {/* {isError && <Alert message={JSON.stringify(error)} type="error" />} */}
      <div className="grid grid-cols-1 gap-9 sm:grid-cols-2">
        <div className="flex flex-col gap-9">
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">
                Edit Recipe
              </h3>
            </div>
            {!isLoading ? (
              <RecipeForm
                recipeData={recipeData}
                ingredients={ingredients}
                instructions={instructions}
                handleOnChange={handleOnChange}
                handleInstructionOrIngredients={handleInstructionOrIngredients}
                handleSubmit={handleSubmit}
                isLoading={isLoading}
                setTag={setEditTag}
                tags={tags}
                isEditRecipe={true}
              />
            ) : (
              <div>Loading...</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditRecipe;
