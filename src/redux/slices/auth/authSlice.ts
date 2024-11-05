// src/redux/slices/authSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Session, UserMetadata } from "@supabase/supabase-js";

interface AuthState {
  user: Session | null;
  userDetails: UserMetadata | null;
  loading: boolean;
}

const initialState: AuthState = {
  user: null,
  userDetails: null,
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
    setUserDetails: (state, action: PayloadAction<UserMetadata>) => {
      state.userDetails = action.payload;
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

export const { setUser, setUserDetails, setLoading, clearUser } =
  authSlice.actions;
export default authSlice.reducer;
