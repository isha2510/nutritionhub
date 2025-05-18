import { createApi } from "@reduxjs/toolkit/query/react";
import { Recipe } from "../../recipes/types/state";
import { baseQuery } from "../../../app/api/index";

// Create interface for the transformed favorites response
interface FavoritesResponse {
  recipes: Recipe[];
  ids: string[];
}

// Interface for the favorite IDs response
interface FavoriteIdsResponse {
  favoriteIds: string[];
}

// Maintain a simple in-memory count cache
const favoriteCountsCache: Record<string, number> = {};

export const favoritesApi = createApi({
  reducerPath: "favoritesApi",
  baseQuery,
  tagTypes: ["favorite", "favoriteCount"],
  endpoints: (builder) => ({
    // Get user favorites with full recipe data
    getUserFavorites: builder.query<FavoritesResponse, void>({
      query: () => "/favorites",
      providesTags: ["favorite"],
      transformResponse: (response: Recipe[]) => {
        const recipes = response || [];
        const ids = recipes.map(recipe => recipe._id?.toString() || '');
        return {
          recipes,
          ids
        };
      }
    }),

    // Get just the IDs of favorited recipes (more efficient endpoint)
    getUserFavoriteIds: builder.query<FavoriteIdsResponse, void>({
      query: () => "/favorites/ids",
      providesTags: ["favorite"],
      // Cache for longer period
      keepUnusedDataFor: 3600, // 1 hour
    }),

    // Count favorites for a recipe
    countFavorites: builder.query<{ count: number }, string>({
      query: (recipeId) => `/favorites/count/${recipeId}`,
      providesTags: (_result, _error, id) => [{ type: "favoriteCount", id }],
      keepUnusedDataFor: 300, // Keep cached data for 5 minutes
      
      // Cache the result in-memory to avoid duplicate requests
      transformResponse: (response: { count: number }, _meta, recipeId) => {
        // Update the in-memory cache
        favoriteCountsCache[recipeId] = response.count;
        return response;
      },

      // Use any cached value if available
      async onQueryStarted(recipeId, { dispatch }) {
        // If we already have a count cached, use it
        if (recipeId in favoriteCountsCache) {
          dispatch(
            favoritesApi.util.updateQueryData('countFavorites', recipeId, () => ({
              count: favoriteCountsCache[recipeId]
            }))
          );
        }
      }
    }),

    // Add a recipe to favorites
    addToFavorites: builder.mutation<{ favorited: boolean }, string>({
      query: (recipeId) => ({
        url: `/favorites/${recipeId}`,
        method: "POST",
      }),
      invalidatesTags: (_result, _error, id) => [
        "favorite", 
        { type: "favoriteCount", id }
      ],
    }),

    // Remove a recipe from favorites
    removeFromFavorites: builder.mutation<{ favorited: boolean }, string>({
      query: (recipeId) => ({
        url: `/favorites/${recipeId}`,
        method: "DELETE",
      }),
      invalidatesTags: (_result, _error, id) => [
        "favorite", 
        { type: "favoriteCount", id }
      ],
    }),
  }),
});

export const {
  useGetUserFavoritesQuery,
  useGetUserFavoriteIdsQuery,
  useCountFavoritesQuery,
  useAddToFavoritesMutation,
  useRemoveFromFavoritesMutation,
} = favoritesApi; 