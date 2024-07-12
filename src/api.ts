import axios from "axios";
import { Book } from "./types";

const API_URL = "https://www.googleapis.com/books/v1/volumes";

export const fetchBooks = async (
  query: string,
  startIndex = 0,
  maxResults = 10
): Promise<Book[]> => {
  try {
    const response = await axios.get(
      `${API_URL}?q=${query}&startIndex=${startIndex}&maxResults=${maxResults}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching books: ", error);
    throw error;
  }
};
