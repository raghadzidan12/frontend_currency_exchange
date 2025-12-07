import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";
import { type PropsWithChildren } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { TypedUseSelectorHook } from "react-redux";
import React from "react";
import { AuthReducer } from "../store/slices/auth-slice";
import { Api } from "./api-store";
import { ErrorLoggerMiddleware } from "./error-middleware";





const rootReducer = {
  auth: AuthReducer,
  [Api.reducerPath]: Api.reducer,
};

const store = configureStore({
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat([
      ErrorLoggerMiddleware,
      Api.middleware,
    ]),
  reducer: combineReducers(rootReducer),
});
const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const { getState, dispatch } = store;
export const StoreProvider = ({ children }: PropsWithChildren) => {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>{children}</PersistGate>
    </Provider>
  );
};

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
