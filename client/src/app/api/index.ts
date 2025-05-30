import { fetchBaseQuery, FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { RootState } from "../store/store";
import { getAccessToken } from "../utils/auth0-helper";

// Get the API base URL based on environment
export const getApiBaseUrl = (): string => {
  return window.location.origin.includes("netlify")
    ? "https://nutritionhub-api.netlify.app/api"
    : "http://localhost:3001/api";
};

// Create a base query that handles token refresh
export const baseQuery = fetchBaseQuery({
  baseUrl: getApiBaseUrl(),
  prepareHeaders: async (headers, { getState }: { getState: () => RootState }) => {
    let token = getState().auth.token;
    
    // If we're getting auth errors or no token, try to get it from cache or refresh it
    if (!token) {
      try {
        // Use our cached token system which handles rate limiting
        token = await getAccessToken();
      } catch (error) {
        console.error("Failed to get token:", error);
      }
    }
    
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
    
    return headers;
  },
});
