import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import SearchBar from "../components/SearchBar";
import BookList from "../components/BookList";
import { Book } from "../types";
import { useDebounce } from "../hooks/useDebounce";
import { RootState } from "../store";
import Modal from "../components/Modal";
import { addBook } from "../store/personalBooksSlice"; // Import the addBook action
import { fetchBooksAsync } from "../store/bookSlice";

interface BookListPageProps {}

const BookListPage = ({}: BookListPageProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
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

  const handleAddBook = (book: Book) => {
    dispatch(addBook(book)); // Dispatch the addBook action
    setIsModalOpen(true);
  };

  return (
    <div className="p-4">
      <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <BookList
        searchTerm={debouncedSearchTerm}
        onAdd={handleAddBook}
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
          {Array.from(
            { length: totalPages > 5 ? 5 : totalPages },
            (_, index) => (
              <button
                key={index}
                onClick={() => handlePageChange(index)}
                className={`mx-1 ${page === index ? "font-bold" : ""}`}
              >
                {index + 1}
              </button>
            )
          )}
          {totalPages > 5 && page < totalPages - 3 && <span>...</span>}
          {totalPages > 5 && (
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
      <Modal
        isOpen={isModalOpen}
        title="Book Added"
        message="The book has been added to your personal book list."
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
};

export default BookListPage;
