import { useEffect, useState } from 'react';
import Navbar from '../sticker/Navbar';
import axios from 'axios';

export default function CartPage() {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const jwt_token = localStorage.getItem('jwt_token');
        if (!jwt_token) {
          console.error('JWT token not found in local storage');
          return;
        }

        const response = await axios.get(`http://localhost:5000/admin/cart`, {
          headers: {
            Authorization: `Bearer ${jwt_token}`
          }
        });
        console.log('Cart Items:', response.data.cart);
        setCartItems(response.data.cart);
      } catch (error) {
        console.error('Error fetching cart items:', error);
      }
    };
    fetchCartItems();
  }, []);

  const removeFromCart = async (productId) => {
    try {
      const jwt_token = localStorage.getItem('jwt_token');
      if (!jwt_token) {
        console.error('JWT token not found in local storage');
        return;
      }

      await axios.delete(`http://localhost:5000/admin/cart/${productId}`, {
        headers: {
          Authorization: `Bearer ${jwt_token}`
        }
      });

      setCartItems(prevCartItems => prevCartItems.filter(item => item.product._id !== productId));
    } catch (error) {
      console.error('Error removing item from cart:', error);
    }
  };

  const updateQuantity = async (productId, newQuantity) => {
    try {
      const jwt_token = localStorage.getItem('jwt_token');
      if (!jwt_token) {
        console.error('JWT token not found in local storage');
        return;
      }

      await axios.put(`http://localhost:5000/admin/cart/${productId}`, {
        quantity: newQuantity
      }, {
        headers: {
          Authorization: `Bearer ${jwt_token}`
        }
      });

      setCartItems(prevCartItems =>
        prevCartItems.map(item =>
          item.product._id === productId ? { ...item, quantity: newQuantity } : item
        )
      );
    } catch (error) {
      console.error('Error updating item quantity in cart:', error);
    }
  };

  return (
    <div className="cart-page">
      <Navbar />
      <h2>Shopping Cart</h2>
      <ul>
        {cartItems.map(item => (
          <li key={item.product._id}>
            <span>{item.product.name} - ${item.product.price}</span>
            <input
              type="number"
              min="1"
              value={item.quantity}
              onChange={(e) => {
                const newQuantity = parseInt(e.target.value);
                if (!isNaN(newQuantity) && newQuantity >= 1) {
                  updateQuantity(item.product._id, newQuantity);
                }
              }}
            />
            <button onClick={() => removeFromCart(item.product._id)}>Remove</button>
          </li>
        ))}
      </ul>
    </div>
  );
}





