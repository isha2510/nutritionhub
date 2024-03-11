// Or from '@reduxjs/toolkit/query' if not using the auto-generated hooks
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Recipe } from "../../features/recipes/types/state";

// initialize an empty api service that we'll inject endpoints into later as needed
export const recipesApi = createApi({
  reducerPath: "recipesApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3001/api/",
    headers: { Authorization: `Bearer ${sessionStorage.getItem("token")}` },
  }),

  endpoints: (builder) => ({
    getAllRecipes: builder.query<Recipe[], void>({
      query: () => "recipe",
    }),
  }),
});

export const { useGetAllRecipesQuery } = recipesApi;
