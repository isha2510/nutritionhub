import { createSlice } from "@reduxjs/toolkit";
import type { RootState } from "../../../store/store";

interface InitialState {
  token: string | null;
}

// Initial state for the recipes slice
const initialState: InitialState = {
  token: null,
};

// Recipes slice
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
    },
  },
});

export const auth = (state: RootState) => state.token.token;

export const { setToken } = authSlice.actions;

export default authSlice.reducer;
