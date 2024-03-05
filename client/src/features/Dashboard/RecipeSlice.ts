import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../../store";
import { Recipe } from "../../types/state";

const API_URL = "http://localhost:3001/api/recipe"; // Replace with your actual API endpoint

// Async thunk to fetch recipes from the API
export const fetchRecipes = createAsyncThunk(
  "recipes/fetchRecipes",
  async () => {
    try {
      const response = await axios.get(API_URL);
      return response.data.recipes;
    } catch (error) {
      console.error("Error fetching recipes:", error);
      throw error;
    }
  },
);

interface InitialState {
  recipes: Recipe[];
  status: "idle" | "loading" | "succeeded" | "failed"; // Include possible status values
  error: string | null | undefined; // Specify error type as string or null
}

// Initial state for the recipes slice
const initialState: InitialState = {
  recipes: [],
  status: "idle",
  error: null,
};

// Recipes slice
const recipesSlice = createSlice({
  name: "recipes",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchRecipes.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        fetchRecipes.fulfilled,
        (state, action: PayloadAction<Recipe[]>) => {
          state.status = "succeeded";
          state.recipes = action.payload;
        },
      )
      .addCase(fetchRecipes.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const recipes = (state: RootState) => state.recipes.recipes;

export default recipesSlice.reducer;
