import PersonalBookList from '../components/PersonalBookList';
import { Book } from '../types';

interface PersonalBookListPageProps {
  books: Book[];
  onRemove: (book: Book) => void;
}

const PersonalBookListPage = ({ books, onRemove }: PersonalBookListPageProps) => (
  <div className="p-4">
    <h2 className="text-xl mb-4">My Book List</h2>
    <PersonalBookList books={books} onRemove={onRemove} />
  </div>
);

export default PersonalBookListPage;
