import { useState } from 'react';

export default function SearchQuery() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

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

  return (
    <div>
      <input
        type="text"
        placeholder="Search for products"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>

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
