import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState, useEffect, useRef } from 'react';

export default function SearchQuery() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const searchRef = useRef(null);

  const handleSearch = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/search?query=${query}`);
      if (!response.ok) {
        throw new Error('Failed to fetch products');
      }
      const products = await response.json();
      setResults(products);
    } catch (error) {
      console.error('Error searching products:', error.message);
      // Handle error
    }
  };

  const handleClickOutside = (event) => {
    if (searchRef.current && !searchRef.current.contains(event.target)) {
      setQuery(''); // Clear search query when clicked outside the search
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  return (
    <div ref={searchRef} className="h-8 flex gap-2 ml-4 mt-4">
      <input
        type="text"
        placeholder="Search for products"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="border p-2"
      />
      <button onClick={handleSearch}><FontAwesomeIcon icon={faMagnifyingGlass} /></button>

      <div>
        {results.map((product) => (
          <div key={product._id}>
            <h3>{product.name}</h3>
            <p>{product.description}</p>
            <p>Price: {product.price}</p>
            {/* Display other product information as needed */}
          </div>
        ))}
      </div>
    </div>
  );
}

