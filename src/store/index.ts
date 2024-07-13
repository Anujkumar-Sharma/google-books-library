import { configureStore, combineReducers } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web
import { persistStore, persistReducer } from "redux-persist";
import booksReducer from "./bookSlice";
import personalBooksReducer from "./personalBooksSlice"; // New slice for personal books

const rootReducer: any = combineReducers({
  books: booksReducer,
  personalBooks: personalBooksReducer, // Adding the personal books slice
});

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["personalBooks"], // Only persist the personalBooks slice
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
