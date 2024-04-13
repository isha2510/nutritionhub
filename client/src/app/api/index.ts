// Or from '@reduxjs/toolkit/query' if not using the auto-generated hooks
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Recipe } from "../../features/recipes/types/state";
import { RootState } from "../store/store";

// initialize an empty api service that we'll inject endpoints into later as needed

const baseQuery = fetchBaseQuery({
  baseUrl: window.location.origin.includes("netlify")
    ? "https://nutritionhub-api.netlify.app/api"
    : "http://localhost:3001/api",
  prepareHeaders: (headers, { getState }: { getState: () => RootState }) => {
    const token = getState().auth.token; // Access token from state using getState
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

export const recipesApi = createApi({
  reducerPath: "recipesApi",
  baseQuery,
  tagTypes: ["recipe"],
  endpoints: (builder) => ({
    getAllRecipes: builder.query<Recipe[], void>({
      query: () => "/recipe",
    }),
    fetchRecipeById: builder.query<Recipe, string>({
      query: (id) => ({ url: `/recipe/${id}` }),
    }),
    createRecipe: builder.mutation<void, Recipe>({
      query: (recipe) => ({
        url: "/recipe",
        method: "POST",
        body: recipe,
      }),
    }),
  }),
});

export const {
  useGetAllRecipesQuery,
  useFetchRecipeByIdQuery,
  useCreateRecipeMutation,
} = recipesApi;
