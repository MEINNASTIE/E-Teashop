import { useState, useEffect } from 'react';

const useFetchProducts = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function getProducts() {
      try {
        const response = await fetch("http://localhost:5000/admin/products");
        const data = await response.json();
        console.log("products", data);
        if (data.success) {
          setProducts(data.products);
        }
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    }

    getProducts(); // Call the function here
  }, []);

  return products;
};

export default useFetchProducts;