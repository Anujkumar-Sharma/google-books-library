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
  const itemsPerPage = 10;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  useEffect(() => {
    if (debouncedSearchTerm) {
      dispatch(
        fetchBooksAsync({
          query: debouncedSearchTerm,
          startIndex: page * itemsPerPage,
        })
      );
    }
  }, [debouncedSearchTerm, page, dispatch]);

  const handlePageChange = (newPage: number) => {
    if (newPage >= 0 && newPage < totalPages) {
      setPage(newPage);
    }
  };

  const getPageNumbers = () => {
    const pages = [];
    if (totalPages <= 5) {
      for (let i = 0; i < totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (page <= 2) {
        pages.push(0, 1, 2, 3, 4);
      } else if (page >= totalPages - 3) {
        pages.push(
          totalPages - 5,
          totalPages - 4,
          totalPages - 3,
          totalPages - 2,
          totalPages - 1
        );
      } else {
        pages.push(page - 2, page - 1, page, page + 1, page + 2);
      }
    }
    return pages;
  };

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
        <button
          onClick={() => handlePageChange(page - 1)}
          disabled={page === 0}
        >
          Previous
        </button>
        <div>
          {page > 2 && totalPages > 5 && (
            <button onClick={() => handlePageChange(0)}>1</button>
          )}
          {page > 2 && totalPages > 5 && <span>...</span>}
          {getPageNumbers().map((pageNumber) => (
            <button
              key={pageNumber}
              onClick={() => handlePageChange(pageNumber)}
              className={`mx-1 ${page === pageNumber ? "font-bold" : ""}`}
            >
              {pageNumber + 1}
            </button>
          ))}
          {page < totalPages - 3 && totalPages > 5 && <span>...</span>}
          {page < totalPages - 3 && totalPages > 5 && (
            <button onClick={() => handlePageChange(totalPages - 1)}>
              {totalPages}
            </button>
          )}
        </div>
        <button
          onClick={() => handlePageChange(page + 1)}
          disabled={page === totalPages - 1}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default BookListPage;
