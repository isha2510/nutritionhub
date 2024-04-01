// Or from '@reduxjs/toolkit/query' if not using the auto-generated hooks
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Recipe } from "../../features/recipes/types/state";

// initialize an empty api service that we'll inject endpoints into later as needed
export const recipesApi = createApi({
  reducerPath: "recipesApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api",
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  }),

  endpoints: (builder) => ({
    getAllRecipes: builder.query<Recipe[], void>({
      query: () => "/recipe",
    }),
    fetchRecipeById: builder.query<Recipe, string>({
      query: (id) => ({ url: `/recipe/${id}` }),
    }),
  }),
});

export const { useGetAllRecipesQuery, useFetchRecipeByIdQuery } = recipesApi;
