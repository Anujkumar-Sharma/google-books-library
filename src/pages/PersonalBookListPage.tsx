import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store";
import { Book } from "../types";
import { removeBook } from "../store/personalBooksSlice";

const PersonalBookListPage: React.FC = () => {
  const dispatch = useDispatch();
  const personalBooks = useSelector(
    (state: RootState) => state.personalBooks.books
  );

  const handleRemoveBook = (bookId: string) => {
    dispatch(removeBook(bookId));
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">My Personal Book List</h2>
      {personalBooks.length === 0 ? (
        <p>No books added to your personal list yet.</p>
      ) : (
        <div>
          {personalBooks.map((book: Book) => (
            <div key={book.id} className="border p-4 mb-4 flex">
              <img
                src={book.volumeInfo.imageLinks?.thumbnail}
                alt={book.volumeInfo.title}
                className="w-20 h-20 mr-4"
              />
              <div>
                <h3 className="text-lg font-bold">{book.volumeInfo.title}</h3>
                <p>{book.volumeInfo.authors?.join(", ")}</p>
                <button
                  onClick={() => handleRemoveBook(book.id)}
                  className="mt-2 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                >
                  Remove from My Book List
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PersonalBookListPage;
