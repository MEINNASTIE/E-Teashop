import { createContext, useState, useEffect, useContext } from 'react';
import { UserContext } from "../context/userProvider.jsx";
import axios from 'axios';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const { user } = useContext(UserContext); // Assuming you have a UserContext for managing user authentication

  // Load cart items from server on component mount
//   useEffect(() => {
//     const fetchCartItems = async () => {
//       try {
//         const response = await axios.get(`http://localhost:5000/admin/cart`, {
//           headers: {
//             Authorization: `Bearer ${user.token}` // Pass user token for authentication
//           }
//         });
//         setCartItems(response.data.cart);
//       } catch (error) {
//         console.error('Error fetching cart items:', error);
//       }
//     };
//     fetchCartItems();
//   }, [user.token]); // Add user.token as dependency

  const clearCart = async () => {
    try {
      await axios.delete(`http://localhost:5000/admin/cart/clear`, {
        headers: {
          Authorization: `Bearer ${user.token}` // Pass user token for authentication
        }
      });
      setCartItems([]); // Clear cart items in state
    } catch (error) {
      console.error('Error clearing cart:', error);
      // Add error handling here (e.g., display an error message to the user)
    }
  };

  return (
    <CartContext.Provider value={{ cartItems, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};
