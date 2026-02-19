/* eslint-disable @typescript-eslint/no-explicit-any */
import { EnhancedStore, configureStore } from "@reduxjs/toolkit";
import { recipesApi } from "../../features/recipes/api/recipesApi";
import authSlice from "../components/Header/slice/authSlice";
import { tagsApi } from "../../features/recipes/api/tagsApi";
import { favoritesApi } from "../../features/favorites/api/favoritesApi";
import { aiApi } from "../../features/ai/api/aiApi";

// eslint-disable-next-line prettier/prettier, @typescript-eslint/no-unused-vars
export const configureStoreWithMiddlewares = (_initialState = {}): EnhancedStore => {
  const store = configureStore({
    reducer: {
      auth: authSlice,
      [recipesApi.reducerPath]: recipesApi.reducer,
      [tagsApi.reducerPath]: tagsApi.reducer,
      [favoritesApi.reducerPath]: favoritesApi.reducer,
      [aiApi.reducerPath]: aiApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(
        recipesApi.middleware,
        tagsApi.middleware,
        favoritesApi.middleware,
        aiApi.middleware
      ),
  });
  return store;
};

export const store = configureStoreWithMiddlewares();

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
// export type AppThunk<ReturnType = void> = ThunkAction<
//   ReturnType,
//   RootState,
//   any,
//   Action<string>
// >;
