import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { AuthSliceState, GetSessionPayload, LoginPayload } from "../interfaces";

const initialState: AuthSliceState = {
  isLogged: false,
  email: "",
  name: "",
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login(state, { payload }: PayloadAction<LoginPayload>) {
      console.log({ payload });
      state.isLogged = true;
      state.email = payload.email;
      state.name = payload.name;
      localStorage.setItem("@auth-token", payload.token);
    },
    logout() {
      localStorage.removeItem("@auth-token");
      return { ...initialState };
    },
    setUserSession(state, { payload }: PayloadAction<GetSessionPayload>) {
      state.isLogged = true;
      state.name = payload.name;
      state.email = payload.email;
    },
  },
});

export const { login, logout, setUserSession } = authSlice.actions;
