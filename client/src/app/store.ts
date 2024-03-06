/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Action,
  EnhancedStore,
  ThunkAction,
  configureStore,
} from "@reduxjs/toolkit";
import recipesReducer from "../features/Dashboard/RecipeSlice";

// eslint-disable-next-line prettier/prettier, @typescript-eslint/no-unused-vars
export const configureStoreWithMiddlewares = (initialState = {}): EnhancedStore => {
  const store = configureStore({
    reducer: { recipes: recipesReducer },
  });
  return store;
};

export const store = configureStoreWithMiddlewares();

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  any,
  Action<string>
>;
