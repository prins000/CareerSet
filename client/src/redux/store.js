import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";

import authReducer from "./slices/authSlice";
import jobReducer from "./slices/jobSlice";

/* Persist only part of auth */
const authPersistConfig = {
  key: "auth",
  storage,
  blacklist: ["loading"], 
};

const rootReducer = combineReducers({
  auth: persistReducer(authPersistConfig, authReducer),
  job: jobReducer,
});

/* Root persist */
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth", "job"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);
