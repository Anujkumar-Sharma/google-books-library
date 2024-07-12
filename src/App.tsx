import { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import BookListPage from './pages/BookListPage';
import PersonalBookListPage from './pages/PersonalBookListPage';
import { Book } from './types';

const App = () => {
  const [personalBooks, setPersonalBooks] = useState<Book[]>([]);

  const addBook = (book: Book) => {
    if (!personalBooks.find(b => b.id === book.id)) {
      setPersonalBooks([...personalBooks, book]);
    }
  };

  const removeBook = (book: Book) => {
    setPersonalBooks(personalBooks.filter(b => b.id !== book.id));
  };

  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<BookListPage onAdd={addBook} />} />
        <Route path="/personal-books" element={<PersonalBookListPage books={personalBooks} onRemove={removeBook} />} />
      </Routes>
    </Router>
  );
};

export default App;
