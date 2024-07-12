interface SearchBarProps {
    searchTerm: string;
    setSearchTerm: (term: string) => void;
  }
  
  const SearchBar = ({ searchTerm, setSearchTerm }: SearchBarProps) => (
    <input
      type="text"
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      placeholder="Search for books..."
      className="border p-2 w-full"
    />
  );
  
  export default SearchBar;
  