// Or from '@reduxjs/toolkit/query' if not using the auto-generated hooks
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Cookies from "js-cookie";
import { Recipe } from "../../features/recipes/types/state";

// initialize an empty api service that we'll inject endpoints into later as needed
const token = Cookies.get("token");
export const recipesApi = createApi({
  reducerPath: "recipesApi",
  baseQuery: fetchBaseQuery({
    baseUrl: window.location.origin.includes("netlify")
      ? "https://nutritionhub-api.netlify.app/api"
      : "http://localhost:3001/api",
    headers: { Authorization: `Bearer ${token}` },
  }),
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
