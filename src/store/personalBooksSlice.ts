import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Book } from '../types';

interface PersonalBooksState {
  books: Book[];
}

const initialState: PersonalBooksState = {
  books: [],
};

const personalBooksSlice = createSlice({
  name: 'personalBooks',
  initialState,
  reducers: {
    addBook: (state, action: PayloadAction<Book>) => {
      // Add the book only if it doesn't already exist in the list
      const bookExists = state.books.some((book) => book.id === action.payload.id);
      if (!bookExists) {
        state.books.push(action.payload);
      }
    },
    removeBook: (state, action: PayloadAction<string>) => {
      state.books = state.books.filter((book) => book.id !== action.payload);
    },
  },
});

export const { addBook, removeBook } = personalBooksSlice.actions;

export default personalBooksSlice.reducer;
