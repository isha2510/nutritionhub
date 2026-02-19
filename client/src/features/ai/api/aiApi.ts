import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "../../../app/api/index";
import { RecipeInsights, DashboardInsights } from "../types/aiTypes";

export const aiApi = createApi({
  reducerPath: "aiApi",
  baseQuery,
  tagTypes: ["aiRecipeAnalysis", "aiDashboardInsights"],
  endpoints: (builder) => ({
    analyzeRecipe: builder.mutation<RecipeInsights, string>({
      query: (recipeId) => ({
        url: `/ai/analyze-recipe/${recipeId}`,
        method: "POST",
      }),
    }),
    getDashboardInsights: builder.query<DashboardInsights, void>({
      query: () => "/ai/dashboard-insights",
      providesTags: ["aiDashboardInsights"],
    }),
  }),
});

export const { useAnalyzeRecipeMutation, useGetDashboardInsightsQuery } = aiApi;
