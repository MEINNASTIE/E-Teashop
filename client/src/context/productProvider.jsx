import { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';

const ProductContext = createContext();

export const useProductContext = () => useContext(ProductContext);

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [wishlist, setWishlist] = useState([]);

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

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:5000/admin/products');
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };
    fetchProducts();
  }, []);

  const fetchWishlist = async () => {
    try {
      const jwtToken = localStorage.getItem('jwt_token');
      if (!jwtToken) {
        throw new Error('Authentication token not found in local storage');
      }
      const response = await axios.get('http://localhost:5000/wish/wishlist', {
        headers: { Authorization: `Bearer ${jwtToken}` }
      });
      if (response.data.success) {
        setWishlist(response.data.wishlist);
      }
    } catch (error) {
      console.error('Error fetching wishlist:', error.message);
    }
  };

  useEffect(() => {
    
    fetchWishlist();
  }, []);

  const addToWishlist = async (productId) => {
    try {
      const jwtToken = localStorage.getItem('jwt_token');
      if (!jwtToken) {
        throw new Error('Authentication token not found in local storage');
      }
      const response = await axios.post('http://localhost:5000/wish/wishlist', { productId }, {
        headers: { Authorization: `Bearer ${jwtToken}` }
      });
      if (response.data.success) {
        setWishlist([...wishlist, { product: productId }]);
        localStorage.setItem(`wishlist_${productId}`, 'true');
        alert('Item added to wishlist successfully!');
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      console.error('Error adding item to wishlist:', error.message);
    }
  };

  const removeFromWishlist = async (productId) => {
    try {
      const jwtToken = localStorage.getItem('jwt_token');
      if (!jwtToken) {
        return;
      }
      await axios.delete(`http://localhost:5000/wish/wishlist/${productId}`, {
        headers: { Authorization: `Bearer ${jwtToken}` }
      });
      setWishlist(wishlist.filter(item => item.product !== productId));
      localStorage.removeItem(`wishlist_${productId}`);
    } catch (error) {
      console.error('Error removing item from wishlist:', error.message);
    }
  };

  return (
    <ProductContext.Provider value={{ products, addProduct, deleteProduct, updateProduct, wishlist, addToWishlist, removeFromWishlist  }}>
      {children}
    </ProductContext.Provider>
  );
};

 