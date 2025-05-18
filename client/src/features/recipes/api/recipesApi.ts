// Or from '@reduxjs/toolkit/query' if not using the auto-generated hooks
import { createApi } from "@reduxjs/toolkit/query/react";
import { Recipe, RejectionParams, UpdateRecipeParams } from "../types/state";
import { baseQuery } from "../../../app/api/index";

// initialize an empty api service that we'll inject endpoints into later as needed

export const recipesApi = createApi({
  reducerPath: "recipesApi",
  baseQuery,
  tagTypes: ["recipe", "pendingRecipe"],
  endpoints: (builder) => ({
    getAllRecipes: builder.query<Recipe[], void>({
      query: () => "/recipe",
      providesTags: ["recipe"],
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
      invalidatesTags: ["recipe"],
    }),
    updateRecipe: builder.mutation<void, UpdateRecipeParams>({
      query: ({ id, recipe }) => ({
        url: `/recipe/${id}`,
        method: "PUT",
        body: recipe,
      }),
      invalidatesTags: (_result, _error, { id }) => [{ type: "recipe", id }, "recipe"],
    }),
    // Admin endpoints
    getPendingRecipes: builder.query<Recipe[], void>({
      query: () => "/admin/recipes/pending",
      providesTags: ["pendingRecipe"],
    }),
    approveRecipe: builder.mutation<void, string>({
      query: (id) => ({
        url: `/admin/recipes/${id}/approve`,
        method: "PATCH",
      }),
      invalidatesTags: ["recipe", "pendingRecipe"],
    }),
    rejectRecipe: builder.mutation<void, RejectionParams>({
      query: ({ id, reason }) => ({
        url: `/admin/recipes/${id}/reject`,
        method: "DELETE",
        body: { reason },
      }),
      invalidatesTags: ["recipe", "pendingRecipe"],
    }),
  }),
});

export const {
  useGetAllRecipesQuery,
  useFetchRecipeByIdQuery,
  useCreateRecipeMutation,
  useUpdateRecipeMutation,
  // Admin hooks
  useGetPendingRecipesQuery,
  useApproveRecipeMutation,
  useRejectRecipeMutation,
} = recipesApi;
