
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import { persistReducer } from "redux-persist";
import localStorage from "redux-persist/es/storage";
import { LoginResponseDto, User } from "../../api/apis";

const NAME = "auth";
export type IAuthState = {
  user?: User;
  accessToken?: string;
};
const initialState: IAuthState = {
  user: undefined,
  accessToken: "",
};
export const AuthSlice = createSlice({
  name: NAME,
  initialState: initialState,
  reducers: {
    login: (state, action: PayloadAction<LoginResponseDto>) => {
      const accessToken = action.payload.accessToken;
      const user = action.payload.user as User;

      state.accessToken = accessToken;  
      state.user = user;
    },
    logout: (state) => {
      return {
        ...state,
        user: undefined,
        accessToken: "",
        refreshToken: "",
        loginLayoutType: undefined,
      };
    },

}});

export const AuthActions = AuthSlice.actions;
export const authSelector = (state: { auth: IAuthState }) => state.auth;

export const AuthReducer = persistReducer(
  {
    storage: localStorage,
    key: NAME,
    debug: false,
    whitelist: [
      "user",
      "accessToken",
    ],
  },
  AuthSlice.reducer,
);

export const useAuthSlice = () => useSelector(authSelector);
