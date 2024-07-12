import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import SearchBar from "../components/SearchBar";
import BookList from "../components/BookList";
import { Book } from "../types";
import { useDebounce } from "../hooks/useDebounce";
import { RootState } from "../store";
import { fetchBooksAsync } from "../store/bookSlice";

interface BookListPageProps {
  onAdd: (book: Book) => void;
}

const BookListPage = ({ onAdd }: BookListPageProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(0);
  const debouncedSearchTerm = useDebounce(searchTerm, 500);
  const dispatch = useDispatch();
  const books = useSelector(
    (state: RootState) => state.books.books[debouncedSearchTerm]?.items || []
  );
  const totalItems = useSelector(
    (state: RootState) =>
      state.books.books[debouncedSearchTerm]?.totalItems || 0
  );
  const status = useSelector((state: RootState) => state.books.status);
  const error = useSelector((state: RootState) => state.books.error);

  useEffect(() => {
    if (debouncedSearchTerm) {
      dispatch(
        fetchBooksAsync({ query: debouncedSearchTerm, startIndex: page * 10 })
      );
    }
  }, [debouncedSearchTerm, page, dispatch]);

  const handleNextPage = () => {
    if (books.length < totalItems) {
      setPage(page + 1);
    }
  };

  const handlePrevPage = () => {
    if (page > 0) {
      setPage(page - 1);
    }
  };
  console.log({ books });
  return (
    <div className="p-4">
      <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <BookList
        searchTerm={debouncedSearchTerm}
        onAdd={onAdd}
        books={books}
        status={status}
        error={error}
      />
      <div className="flex justify-between mt-4">
        <button onClick={handlePrevPage} disabled={page === 0}>
          Previous
        </button>
        <button onClick={handleNextPage} disabled={books.length >= totalItems}>
          Next
        </button>
      </div>
    </div>
  );
};

export default BookListPage;
