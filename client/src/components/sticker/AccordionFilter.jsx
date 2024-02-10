import { useState, useEffect } from 'react';
import axios from 'axios';

export default function Accordion({ title, onSelectCategory }) {
  const [isOpen, setIsOpen] = useState(false);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('http://localhost:5000/admin/products/categories');
        setCategories(response.data.categories);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  const handleCheckboxChange = (category) => {
    onSelectCategory(category);
  };

  return (
    <div className="border border-gray-300 rounded-md mb-4">
      <div
        className="flex justify-between items-center px-4 py-2 bg-gray-100 cursor-pointer"
        onClick={toggleAccordion}
      >
        <span className="font-semibold">{title}</span>
        <svg
          className={`h-6 w-6 ${isOpen ? 'transform rotate-180' : ''}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d={isOpen ? 'M5 15l7-7 7 7' : 'M19 9l-7 7-7-7'}
          />
        </svg>
      </div>
      {isOpen && (
        <div className="px-4 py-2">
          {categories.map(category => (
            <div key={category} className="flex items-center mb-2">
              <input
                type="checkbox"
                id={category}
                className="mr-2"
                onChange={() => handleCheckboxChange(category)}
              />
              <label htmlFor={category}>{category}</label>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

