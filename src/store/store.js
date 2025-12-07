import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { combineReducers } from "@reduxjs/toolkit";
import { AuthReducer } from "./slices/auth-slice";
import { Api } from "../api/api-store";

const rootReducer = combineReducers({
  auth: AuthReducer,
  [Api.reducerPath]: Api.reducer,
});

const persistConfig = {
  key: "root",
  storage: storage,
  whitelist: ["auth"], // Only persist auth slice
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"],
      },
    }).concat(Api.middleware),
});

export const persistor = persistStore(store);

