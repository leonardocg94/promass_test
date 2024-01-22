import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "../../features/User/store";

export const store = configureStore({
  reducer: {
    [authSlice.name]: authSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
