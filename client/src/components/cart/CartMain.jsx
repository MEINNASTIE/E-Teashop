import { useEffect, useState } from 'react';
import Navbar from '../sticker/Navbar';
import axios from 'axios';
import Footer from '../sticker/Footer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPagelines } from '@fortawesome/free-brands-svg-icons';
import { Link } from 'react-router-dom';

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

      await axios.patch(`http://localhost:5000/admin/cart/${productId}`, {
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

   const calculateTotalPrice = () => {
    return cartItems.reduce((total, item) => total + (item.product.price * item.quantity), 0);
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
          <div className="w-[1076px]  ml-[155px] border border-gray-300 p-4 text-gray-600">
          <h3 className="text-[20px] font-bold mb-3">TEAPUNKTUR DELIVERY GUARANTEE</h3>
          <p className="text-[12px]">We guarantee delivery for all orders shipped by airmail with a tracking number. (Conditions apply. Exceptions when notified.) Occasionally, orders may require additional customs processing for import. We will aid you to the fullest extent of our ability. If your order does not arrive within ONE month from shipment due to no fault of your own, we will replace or refund your order at no extra cost. We reserve the right to refuse shipment if we think delivery to your address may be difficult. This guarantee does not apply if recipient neglects or refuses to pay customs fees & import taxes, neglects to retrieve an order held at a post office or distribution center, or if the order is not deliverable due to a wrong address.</p>
          </div>

          <div className="w-[1076px] mt-2 ml-[155px] border border-gray-300 p-4 text-gray-600 flex gap-4 items-center text-[28px]">
          <FontAwesomeIcon icon={faPagelines} />
          <p className="text-[12px]">All deliveries are carbon neutral</p>
         </div>
          <div className="flex gap-10 m-10 ml-[155px] ">
            <div className="mb-8 text-gray-500">
              <div className="bg-[#F0EDE8] h-10 flex justify-between items-center p-4">
                <p className="pl-3">Product</p>
                <div className="flex gap-10">
                  <p className="mr-28">Quantity</p>
                  <p className="mr-2">Total</p>
                </div>
              </div>
              <div className="bg-white shadow-s p-4">
                <ul>
                  {cartItems.map((item) => (
                    <li key={item.product._id} className="flex items-center justify-between mb-4">
                      <div className="flex items-center">
                        {item.product.imageUrl && <img src={item.product.imageUrl} alt={item.product.name} className="p-2 bg-white w-[120px]" />}
                        <span className="font-semibold">{item.product.name}</span>
                        
                      </div>
                      <div className="flex items-center">
                        <input
                          type="number"
                          className="border-none p-1 w-16 text-center mr-4 ml-4 focus:outline-none"
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
                          className="border-[#782F10] border text-[#782F10] hover:bg-[#782F10] hover:text-white font-semibold py-2 px-4 transition duration-400 text-[14px] mr-10"
                          onClick={() => removeFromCart(item.product._id)}
                        >
                          Remove
                        </button>
                        
                        <span className="mx-2"> {item.product.price} €</span>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
  
            <div className="bg-white pl-10 pr-10 pt-4 pb-10">
              <div className="shadow-s p-4 flex items-center">
                <p className="mr-10 font-semibold text-[#782F10]">Total Price:</p>
                <p className="font-semibold text-[#782F10] text-[26px]">{calculateTotalPrice()} €</p>
              </div>
              <hr></hr>
              <div className="w-[240px] mt-10"> 
                <Link to="/payment" className="bg-[#E56E3C] w-full text-white font-semibold p-4 hover:bg-[#782F10]  transition duration-200">Checkout</Link>
                <ul className="text-[11px] list-disc text-gray-500 mt-10">
                  <li>Shipping fees calculated at checkout after you enter your address (you may estimate it based on your cart using the Shipping Fee Calculator). Domestic consumption tax added if shipping to a Japanese address.Enter discount code or gift card code on the next (checkout) page. One code may be used per order.
                  </li>
                </ul>
              </div>
            </div>
          </div>
          </>
        )}
      </div>
      <Footer />
    </>
  );
}





