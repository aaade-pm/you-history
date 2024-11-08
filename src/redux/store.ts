import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";

import authReducer from "./slices/auth/authSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});

setupListeners(store.dispatch);
export type RootState = ReturnType<typeof store.getState>;
