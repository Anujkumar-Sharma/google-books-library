import { Book } from "../types";
import BookItem from "./BookItem";

interface BookListProps {
  searchTerm: string;
  onAdd: (book: Book) => void;
  books: Book[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const BookList = ({
  onAdd,
  books,
  status,
  error,
}: BookListProps) => {
  if (status === "loading") return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!books.length) return <p>No books found.</p>;

  return (
    <div>
      {books.map((book) => (
        <BookItem key={book.id} book={book} onAdd={onAdd} />
      ))}
    </div>
  );
};

export default BookList;
