import axios from 'axios';
import { useState } from 'react';

export default function Product({ product }) {
  const [addToCartError, setAddToCartError] = useState('');

  const addToCart = async () => {
    try {
      // Retrieve the authentication token from local storage
      const jwt_token = localStorage.getItem('jwt_token');

      // Check if the authToken exists
      if (!jwt_token) {
        throw new Error('Authentication token not found in local storage');
      }

      // Send request to add product to cart with authentication token
      await axios.post(`http://localhost:5000/admin/cart`, { productId: product._id }, { headers: { Authorization: `Bearer ${jwt_token}` } });
      
      // Notify the user that the item has been added to the cart successfully
      alert('Item added to cart successfully!');
    } catch (error) {
      // Handle errors
      console.error('Error adding item to cart:', error.message);
      setAddToCartError('Failed to add item to cart');
    }
  };

  return (
    <div className="product">
      <h2>{product.name}</h2>
      <p>{product.description}</p>
      <p>Price: {product.price}</p>
      {product.imageUrl && <img src={product.imageUrl} alt={product.name} />}
      <button onClick={addToCart}>Add to Cart</button>
      {addToCartError && <p className="error">{addToCartError}</p>}
    </div>
  );
}




