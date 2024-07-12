import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { Book } from "../types";
import { fetchBooks } from "../api";

interface BooksState {
  books: { [key: string]: Book[] };
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: BooksState = {
  books: {},
  status: "idle",
  error: null,
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const fetchBooksAsync: any = createAsyncThunk(
  "books/fetchBooks",
  async ({
    query,
    startIndex,
  }: {
    query: string;
    startIndex: number;
    maxCount?: number;
  }) => {
    const response = await fetchBooks(query, startIndex);
    console.log({ response });
    return { query, books: response };
  }
);

const booksSlice = createSlice({
  name: "books",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBooksAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        fetchBooksAsync.fulfilled,
        (state, action: PayloadAction<{ query: string; books: Book[] }>) => {
          state.status = "succeeded";
          state.books[action.payload.query] = action.payload.books;
        }
      )
      .addCase(fetchBooksAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || null;
      });
  },
});

export default booksSlice.reducer;
