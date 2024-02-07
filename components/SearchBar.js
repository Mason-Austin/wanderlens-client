import { useState } from 'react';
import { useRouter } from 'next/router';

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const router = useRouter();

  const handleKeyUp = (e) => {
    setSearchTerm(e.target.value);
    router.push(`/search/${e.target.value}`);
  };
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission
    router.push(`/search/${searchTerm}`);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onKeyUp={handleKeyUp}
      />
    </form>
  );
};

export default SearchBar;
