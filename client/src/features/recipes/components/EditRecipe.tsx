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
import { useNavigate, useParams } from "react-router-dom";
import {
  useFetchRecipeByIdQuery,
  useUpdateRecipeMutation,
} from "../api/recipesApi";
import AddRecipeSteps from "./AddRecipeSteps";
import Alert from "../../../app/components/Alerts/Alert";

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
  const navigate = useNavigate();

  const { data: fetchedRecipe, isLoading } = useFetchRecipeByIdQuery(recipeId);
  const [updateRecipe, { isError, isSuccess, isLoading: isFetching, error }] =
    useUpdateRecipeMutation();

  useEffect(() => {
    if (fetchedRecipe) {
      console.log("tag", fetchedRecipe.tags);
      setRecipeData(fetchedRecipe);
      setIngredients(fetchedRecipe.ingredients);
      setInstructions(fetchedRecipe.instructions);
      setEditTag(fetchedRecipe.tags || []);
    }
  }, [fetchedRecipe]);

  useEffect(() => {
    if (isSuccess) {
      navigate(`/recipes/${recipeId}`);
    }
  }, [isSuccess]);

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
    updateRecipe({ id: recipeId, recipe: data });
  };

  const handleInstructionOrIngredients = (
    e: KeyboardEvent<HTMLInputElement>,
    ind?: number,
  ) => {
    if (e.key === "Enter") {
      const { name, value } = e.target as HTMLInputElement;
      if (name === "ingredients") {
        if (ind !== undefined && ind > -1 && ind < ingredients.length) {
          setIngredients((prevVal) => {
            const updatedIngredients = [...prevVal];
            const arr = [];
            for (let i = 0; i < updatedIngredients.length; i++) {
              if (i === ind) {
                arr.push(value);
              }
              arr.push(updatedIngredients[i]);
            }
            return arr;
          });
        } else {
          // Add new item
          setIngredients((prevVal) => [...prevVal, value]);
        }
      } else if (name === "instructions") {
        if (ind !== undefined && ind > -1 && ind < instructions.length) {
          setInstructions((prevVal) => {
            const updatedInstructions = [...prevVal];
            const arr = [];
            for (let i = 0; i < updatedInstructions.length; i++) {
              if (i === ind) {
                arr.push(value);
              }
              arr.push(updatedInstructions[i]);
            }
            return arr;
          });
        } else {
          // Add new item
          setInstructions((prevVal) => [...prevVal, value]);
        }
      }
      e.currentTarget.value = "";
    }
  };

  return (
    <div className="mx-auto">
      <Breadcrumb pageName={"Edit Recipe"} prevPath={"recipes"} />
      {isError && <Alert message={JSON.stringify(error)} type="error" />}
      <div className="grid grid-cols-1 gap-9 sm:grid-cols-2">
        <AddRecipeSteps isEdit={true} />
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
                isLoading={isFetching}
                setTag={setEditTag}
                tags={tags}
                isEditRecipe={true}
                setInstructions={setInstructions}
                setIngredients={setIngredients}
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
