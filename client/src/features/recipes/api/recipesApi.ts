// Or from '@reduxjs/toolkit/query' if not using the auto-generated hooks
import { createApi } from "@reduxjs/toolkit/query/react";
import { Recipe, UpdateRecipeParams } from "../types/state";
import { baseQuery } from "../../../app/api/index";

// initialize an empty api service that we'll inject endpoints into later as needed

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
      providesTags: (_result, _error, id) => [{ type: "recipe", id }],
    }),
    createRecipe: builder.mutation<void, Recipe>({
      query: (recipe) => ({
        url: "/recipe",
        method: "POST",
        body: recipe,
      }),
    }),
    updateRecipe: builder.mutation<void, UpdateRecipeParams>({
      query: ({ id, recipe }) => ({
        url: `/recipe/${id}`,
        method: "PUT",
        body: recipe,
      }),
      invalidatesTags: (_result, _error, { id }) => [{ type: "recipe", id }],
    }),
  }),
});

export const {
  useGetAllRecipesQuery,
  useFetchRecipeByIdQuery,
  useCreateRecipeMutation,
  useUpdateRecipeMutation,
} = recipesApi;
