/* eslint-disable @typescript-eslint/no-explicit-any */
import { EnhancedStore, configureStore } from "@reduxjs/toolkit";
//import recipesReducer from "../../features/dashboard/redux/RecipeSlice";
import { recipesApi } from "../api";

// eslint-disable-next-line prettier/prettier, @typescript-eslint/no-unused-vars
export const configureStoreWithMiddlewares = (_initialState = {}): EnhancedStore => {
  const store = configureStore({
    reducer: {
      //recipes: recipesReducer,
      [recipesApi.reducerPath]: recipesApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(recipesApi.middleware),
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
