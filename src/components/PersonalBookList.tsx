import { Book } from '../types';

interface PersonalBookListProps {
  books: Book[];
  onRemove: (book: Book) => void;
}

const PersonalBookList = ({ books, onRemove }: PersonalBookListProps) => (
  <div>
    {books.map(book => (
      <div key={book.id} className="border p-4 flex">
        <div className="ml-4">
          <h2 className="text-xl">{book.volumeInfo.title}</h2>
          <p>{book.volumeInfo.authors?.join(', ')}</p>
          <button onClick={() => onRemove(book)} className="ml-4 bg-red-500 text-white p-2">Remove</button>
        </div>
      </div>
    ))}
  </div>
);

export default PersonalBookList;
