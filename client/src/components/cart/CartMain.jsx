import { useEffect, useState } from 'react';
import Navbar from '../sticker/Navbar';
import axios from 'axios';
import Footer from '../sticker/Footer';

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
    <>
      <Navbar />
      <div className="min-h-screen m-10">
        <h2 className="text-[30px] mb-4 ml-[155px]">My cart</h2>
  
        {cartItems.length === 0 ? (
          <p className="text-center text-gray-500">Empty cart</p>
        ) : (
          <>
            <div className="max-w-md mx-auto mb-8">
              <div className="bg-white shadow-md rounded-md p-4">
                <ul>
                  {cartItems.map((item) => (
                    <li key={item.product._id} className="flex items-center justify-between mb-4">
                      <div className="flex items-center">
                        <span className="font-semibold">{item.product.name}</span>
                        <span className="mx-2">- ${item.product.price}</span>
                      </div>
                      <div className="flex items-center">
                        <input
                          type="number"
                          className="border border-gray-300 rounded-md p-1 w-16 text-center"
                          min="1"
                          value={item.quantity}
                          onChange={(e) => {
                            const newQuantity = parseInt(e.target.value);
                            if (!isNaN(newQuantity) && newQuantity >= 1) {
                              updateQuantity(item.product._id, newQuantity);
                            }
                          }}
                        />
                        <button
                          className="ml-4 bg-red-500 text-white px-2 py-1 rounded-md"
                          onClick={() => removeFromCart(item.product._id)}
                        >
                          Remove
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
  
            <div className="max-w-md mx-auto">
              <div className="bg-white shadow-md rounded-md p-4">
                <h3 className="text-lg font-semibold mb-2">Checkout</h3>
              </div>
            </div>
          </>
        )}
      </div>
      <Footer />
    </>
  );
}





