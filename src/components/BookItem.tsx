import { Book } from '../types';

interface BookItemProps {
  book: Book;
  onAdd: (book: Book) => void;
}

const BookItem = ({ book, onAdd }: BookItemProps) => (
  <div className="border p-4 flex">
    {book.volumeInfo.imageLinks && (
      <img src={book.volumeInfo.imageLinks.thumbnail} alt={book.volumeInfo.title} className="w-24 h-32" />
    )}
    <div className="ml-4">
      <h2 className="text-xl">{book.volumeInfo.title}</h2>
      <p>{book.volumeInfo.authors?.join(', ')}</p>
      <a href={book.volumeInfo.infoLink} target="_blank" rel="noopener noreferrer" className="text-blue-500">More Info</a>
      <button onClick={() => onAdd(book)} className="ml-4 bg-blue-500 text-white p-2">Add to My Books</button>
    </div>
  </div>
);

export default BookItem;
