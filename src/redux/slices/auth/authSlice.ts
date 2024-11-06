// src/redux/slices/authSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Session } from "@supabase/supabase-js";

interface AuthState {
  user: Session | null;
  loading: boolean;
}

const initialState: AuthState = {
  user: null,
  loading: true,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<Session | null>) => {
      state.user = action.payload;
      state.loading = false;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    clearUser: (state) => {
      state.user = null;
      state.loading = false;
    },
  },
});

export const { setUser, setLoading, clearUser } = authSlice.actions;
export default authSlice.reducer;
