import { Link } from 'react-router-dom';

const Header = () => (
  <header className="bg-blue-500 p-4 text-white flex justify-between">
    <h1 className="text-xl">Book Browser</h1>
    <nav>
      <Link to="/" className="mr-4">Home</Link>
      <Link to="/personal-books">My Books</Link>
    </nav>
  </header>
);

export default Header;
