import { createContext, useState, useContext } from 'react';
import axios from 'axios';

const ProductContext = createContext();

export const useProductContext = () => useContext(ProductContext);

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);

  const addProduct = async (newProduct) => {
    try {
      const response = await axios.post(`http://localhost:5000/admin/products`, newProduct); 
      const addedProduct = response.data;
      setProducts([...products, addedProduct]);
    } catch (error) {
      console.error('Error adding product:', error);
    }
  };

  const deleteProduct = async (productId) => {
    try {
      await axios.delete(`http://localhost:5000/admin/products/${productId}`);
      setProducts(products.filter(product => product._id !== productId));
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  const updateProduct = async (productId, updatedProductData) => {
    try {
      const response = await axios.patch(`http://localhost:5000/admin/products/${productId}`, updatedProductData);
      const updatedProduct = response.data;
      
      setProducts(products.map(product => (product._id === productId ? updatedProduct : product)));
    } catch (error) {
      console.error('Error updating product:', error);
    }
  };

  return (
    <ProductContext.Provider value={{ products, addProduct, deleteProduct, updateProduct }}>
      {children}
    </ProductContext.Provider>
  );
};

 