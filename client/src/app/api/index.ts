import { fetchBaseQuery } from "@reduxjs/toolkit/query";
import { RootState } from "../store/store";

export const baseQuery = fetchBaseQuery({
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
