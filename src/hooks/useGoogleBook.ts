import { useState } from "react";

const useGoogleBook = () => {
  const [books, setBooks] = useState([]);

  return { books, setBooks };
};

export default useGoogleBook;
