import React, {
  ChangeEvent,
  FormEvent,
  KeyboardEvent,
  Dispatch,
  SetStateAction,
  useRef,
  useState,
} from "react";
import CustomList from "../../../app/components/CustomList/CustomList";
import TagsInput from "./TagsInput";
import { Tag } from "../types/state";

interface RecipeFormProps {
  recipeData: {
    title: string;
    description: string;
    cuisine: string;
    image: string;
  };
  ingredients: string[];
  instructions: string[];
  setInstructions: Dispatch<SetStateAction<string[]>>;
  setIngredients: Dispatch<SetStateAction<string[]>>;
  handleOnChange: (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void;
  handleInstructionOrIngredients: (
    e: KeyboardEvent<HTMLInputElement>,
    args?: number,
  ) => void;
  handleSubmit: (e: FormEvent) => void;
  isLoading: boolean;
  setTag: Dispatch<SetStateAction<Tag[]>>;
  tags: Tag[];
  isEditRecipe: boolean;
}

const RecipeForm: React.FC<RecipeFormProps> = ({
  recipeData,
  ingredients,
  instructions,
  handleOnChange,
  handleInstructionOrIngredients,
  handleSubmit,
  isLoading,
  setTag,
  tags = [],
  isEditRecipe,
  setInstructions,
  setIngredients,
}) => {
  const formRef = useRef<HTMLFormElement>(null);
  const ingredientsRef = useRef<HTMLInputElement>(null);
  const instructionRef = useRef<HTMLInputElement>(null);
  const [inputValue, setInputValue] = useState("");
  const [instructionValue, setInstructionValue] = useState("");
  const [index, setIndex] = useState(-1);
  const handleIngredientsEdit = (args: string, ind: number) => {
    if (ingredientsRef.current) {
      ingredientsRef.current.focus();
    }
    setInputValue(args);
    setIndex(ind);
    setIngredients((prev) => prev.filter((item) => item !== args));
  };

  const handleInstructionEdit = (args: string, ind: number) => {
    if (instructionRef.current) {
      instructionRef.current.focus();
    }
    setInstructionValue(args);
    setIndex(ind);
    setInstructions((prev) => prev.filter((item) => item !== args));
  };

  const onKeyUp = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      setInputValue("");
      setInstructionValue("");
      handleInstructionOrIngredients(e, index);
    }
  };

  return (
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
          <TagsInput setTag={setTag} defaultTags={tags} />
        </div>

        <div className="mb-6">
          <label
            className="mb-2.5 block text-black dark:text-white"
            htmlFor="ingredients"
          >
            Ingredients <span className="text-meta-1">*</span>
          </label>
          <input
            ref={ingredientsRef}
            autoComplete="off"
            type="text"
            name="ingredients"
            value={inputValue}
            id="ingredients"
            onKeyUp={onKeyUp}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Type Ingredient and press enter to add in list"
            className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
          />
          <CustomList
            listItems={ingredients}
            className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary overflow-y-auto h-35"
            handleEdit={handleIngredientsEdit}
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
            ref={instructionRef}
            autoComplete="off"
            type="text"
            name="instructions"
            id="instructions"
            value={instructionValue}
            onChange={(e) => setInstructionValue(e.target.value)}
            onKeyUp={onKeyUp}
            placeholder="Type Instructions and press enter to add in list"
            className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
          />
          <CustomList
            listItems={instructions}
            className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary overflow-y-auto h-35"
            handleEdit={handleInstructionEdit}
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
            {isEditRecipe ? "Update Recipe" : "Submit Recipe"}
          </button>
        )}
      </div>
    </form>
  );
};

export default RecipeForm;
