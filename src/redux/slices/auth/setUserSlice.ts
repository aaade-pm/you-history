import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "../../../types/User";

interface UserState {
  user: User | null;
}

const initialState: UserState = {
  user: null,
};

export const setUserSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User | null>) => {
      state.user = action.payload;
    },

    clearUser: (state) => {
      state.user = null;
    },
  },
});

export const { setUser, clearUser } = setUserSlice.actions;
export default setUserSlice.reducer;
