import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { CartContext } from '../context/cartContext.jsx';

import axios from 'axios';

export default function ShippingForm() {
  const { clearCart } = useContext(CartContext);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [cartItems, setCartItems] = useState([]);
    const [touchedFields, setTouchedFields] = useState({
        firstName: false,
        lastName: false,
        email: false,
        address: false,
        address2: false,
        country: false,
        state: false,
        zip: false,
        ccName: false,
        ccNumber: false,
        ccExpiration: false,
        ccCvv: false
    });

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

   const calculateTotalPrice = () => {
    return cartItems.reduce((total, item) => total + (item.product.price * item.quantity), 0);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowSuccessModal(true);
    clearCart(); 
  };

  const handleFieldBlur = (field) => {
    setTouchedFields({ ...touchedFields, [field]: true });
  };

  const isInvalid = (field) => {
    return touchedFields[field] && !document.getElementById(field).checkValidity();
  };

  return (
    <div className="container mx-auto py-5">
      <div className="flex justify-center">
        <div className="mb-4 mr-10">
        <div className="mb-8 text-gray-500">
              <div className="bg-white shadow-s p-4 ml-10 pb-20">
                <ul>
                  {cartItems.map((item) => (
                    <li key={item.product._id} className="flex items-center justify-between mb-4 pr-8">
                      <div className="flex items-center">
                        {item.product.imageUrl && <img src={item.product.imageUrl} alt={item.product.name} className="p-2 bg-white w-[80px]" />}
                        <span className="font-semibold pr-4">{item.product.name}</span>
                        <span>{item.product.price} €</span>
                      </div>
                        
                    </li>
                  ))}
                </ul>
                <p className="font-semibold text-[#782F10] text-[26px] float-right">{calculateTotalPrice()} €</p>
              </div> 
        </div>
        </div>
        <div className="w-1/2">
          <h4 className="mb-3">Billing address</h4>
          <form className="needs-validation" noValidate onSubmit={handleSubmit}>
            <div className="flex flex-wrap -mx-2">
              <div className="w-full md:w-1/2 px-2 mb-4">
                <label htmlFor="firstName" className="block text-gray-600 text-sm font-semibold mb-1">First name</label>
                <input
                  type="text"
                  className={`form-input w-full p-2 border-gray-300 ${isInvalid('firstName') ? 'border-red-500' : ''}`}
                  id="firstName"
                  placeholder=""
                  required
                  onBlur={() => handleFieldBlur('firstName')}
                />
                {touchedFields.firstName && !document.getElementById('firstName').value && <div className="invalid-feedback">Valid first name is required.</div>}
              </div>
              <div className="w-full md:w-1/2 px-2 mb-4">
                <label htmlFor="lastName" className="block text-gray-600 text-sm font-semibold mb-1">Last name</label>
                <input
                  type="text"
                  className={`form-input w-full p-2 border-gray-300 ${isInvalid('lastName') ? 'border-red-500' : ''}`}
                  id="lastName"
                  placeholder=""
                  required
                  onBlur={() => handleFieldBlur('lastName')}
                />
                {touchedFields.lastName && !document.getElementById('lastName').value && <div className="invalid-feedback">Valid last name is required.</div>}
              </div>
            </div>

            {/* Email */}
            <div className="mb-4">
              <label htmlFor="email" className="block text-gray-600 text-sm font-semibold mb-1">Email <span className="text-xs text-gray-400">(Optional)</span></label>
              <input
                type="email"
                className={`form-input w-full p-2 border-gray-300 ${isInvalid('email') ? 'border-red-500' : ''}`}
                id="email"
                placeholder="you@example.com"
                onBlur={() => handleFieldBlur('email')}
              />
              {touchedFields.email && !document.getElementById('email').value && <div className="invalid-feedback">Please enter a valid email address for shipping updates.</div>}
            </div>

            {/* Address */}
            <div className="mb-4">
              <label htmlFor="address" className="block text-gray-600 text-sm font-semibold mb-1">Address</label>
              <input
                type="text"
                className={`form-input w-full p-2 border-gray-300 ${isInvalid('address') ? 'border-red-500' : ''}`}
                id="address"
                placeholder="1234 Main St"
                required
                onBlur={() => handleFieldBlur('address')}
              />
              {touchedFields.address && !document.getElementById('address').value && <div className="invalid-feedback">Please enter your shipping address.</div>}
            </div>

            {/* Address 2 */}
            <div className="mb-4">
              <label htmlFor="address2" className="block text-gray-600 text-sm font-semibold mb-1">Address 2 <span className="text-xs text-gray-400">(Optional)</span></label>
              <input
                type="text"
                className="form-input w-full p-2 border-gray-300"
                id="address2"
                placeholder="Apartment or suite"
                onBlur={() => handleFieldBlur('address2')}
              />
            </div>

            {/* Country, State, Zip */}
            <div className="flex flex-wrap -mx-2">
              {/* Country */}
              <div className="w-full md:w-1/2 px-2 mb-4">
                <label htmlFor="country" className="block text-gray-600 text-sm font-semibold mb-1">Country</label>
                <select
                  className={`form-select w-full p-2 border-gray-300 ${isInvalid('country') ? 'border-red-500' : ''}`}
                  id="country"
                  required
                  onBlur={() => handleFieldBlur('country')}
                >
                  <option value="">Choose...</option>
                  <option>United States</option>
                </select>
                {touchedFields.country && !document.getElementById('country').value && <div className="invalid-feedback">Please select a valid country.</div>}
              </div>
              {/* State */}
              <div className="w-full md:w-1/2 px-2 mb-4">
                <label htmlFor="state" className="block text-gray-600 text-sm font-semibold mb-1">State</label>
                <select
                  className={`form-select w-full p-2 border-gray-300 ${isInvalid('state') ? 'border-red-500' : ''}`}
                  id="state"
                  required
                  onBlur={() => handleFieldBlur('state')}
                >
                  <option value="">Choose...</option>
                  <option>California</option>
                </select>
                {touchedFields.state && !document.getElementById('state').value && <div className="invalid-feedback">Please provide a valid state.</div>}
              </div>
              {/* Zip */}
              <div className="w-full md:w-1/2 px-2 mb-4">
                <label htmlFor="zip" className="block text-gray-600 text-sm font-semibold mb-1">Zip</label>
                <input
                  type="text"
                  className={`form-input w-full p-2 border-gray-300 ${isInvalid('zip') ? 'border-red-500' : ''}`}
                  id="zip"
                  placeholder=""
                  required
                  onBlur={() => handleFieldBlur('zip')}
                />
                {touchedFields.zip && !document.getElementById('zip').value && <div className="invalid-feedback">Zip code required.</div>}
              </div>
            </div>

            {/* Checkbox inputs */}
            <hr className="mb-6" />
            <div className="mb-4">
              <input type="checkbox" className="form-checkbox rounded border-gray-300 text-gray-700" id="same-address" />
              <label htmlFor="same-address" className="ml-2 text-sm">Shipping address is the same as my billing address</label>
            </div>
            <div className="mb-4">
              <input type="checkbox" className="form-checkbox rounded border-gray-300 text-gray-700" id="save-info" />
              <label htmlFor="save-info" className="ml-2 text-sm">Save this information for next time</label>
            </div>

            {/* Payment */}
            <hr className="mb-6" />
            <h4 className="mb-3">Payment</h4>

            {/* Payment radio inputs */}
            <div className="mb-4">
              <input id="credit" name="paymentMethod" type="radio" className="form-radio rounded border-gray-300 text-gray-700" checked required />
              <label htmlFor="credit" className="ml-2 text-sm">Credit card</label>
            </div>
            <div className="mb-4">
              <input id="debit" name="paymentMethod" type="radio" className="form-radio rounded border-gray-300 text-gray-700" required />
              <label htmlFor="debit" className="ml-2 text-sm">Debit card</label>
            </div>
            <div className="mb-4">
              <input id="paypal" name="paymentMethod" type="radio" className="form-radio rounded border-gray-300 text-gray-700" required />
              <label htmlFor="paypal" className="ml-2 text-sm">PayPal</label>
            </div>

            {/* Credit card details */}
            <div className="flex flex-wrap -mx-2">
              <div className="w-full md:w-1/2 px-2 mb-4">
                <label htmlFor="cc-name" className="block text-gray-600 text-sm font-semibold mb-1">Name on card</label>
                <input
                  type="text"
                  className={`form-input w-full p-2 border-gray-300 ${isInvalid('ccName') ? 'border-red-500' : ''}`}
                  id="cc-name"
                  placeholder=""
                  required
                  onBlur={() => handleFieldBlur('ccName')}
                />
                {touchedFields.ccName && !document.getElementById('cc-name').value && <div className="invalid-feedback">Name on card is required</div>}
              </div>
              <div className="w-full md:w-1/2 px-2 mb-4">
                <label htmlFor="cc-number" className="block text-gray-600 text-sm font-semibold mb-1">Credit card number</label>
                <input
                  type="text"
                  className={`form-input w-full p-2 border-gray-300 ${isInvalid('ccNumber') ? 'border-red-500' : ''}`}
                  id="cc-number"
                  placeholder=""
                  required
                  onBlur={() => handleFieldBlur('ccNumber')}
                />
                {touchedFields.ccNumber && !document.getElementById('cc-number').value && <div className="invalid-feedback">Credit card number is required</div>}
              </div>
              <div className="w-full md:w-1/2 px-2 mb-4">
                <label htmlFor="cc-expiration" className="block text-gray-600 text-sm font-semibold mb-1">Expiration</label>
                <input
                  type="text"
                  className={`form-input w-full p-2 border-gray-300 ${isInvalid('ccExpiration') ? 'border-red-500' : ''}`}
                  id="cc-expiration"
                  placeholder=""
                  required
                  onBlur={() => handleFieldBlur('ccExpiration')}
                />
                {touchedFields.ccExpiration && !document.getElementById('cc-expiration').value && <div className="invalid-feedback">Expiration date required</div>}
              </div>
              <div className="w-full md:w-1/2 px-2 mb-4">
                <label htmlFor="cc-cvv" className="block text-gray-600 text-sm font-semibold mb-1">CVV</label>
                <input
                  type="text"
                  className={`form-input w-full p-2 border-gray-300 ${isInvalid('ccCvv') ? 'border-red-500' : ''}`}
                  id="cc-cvv"
                  placeholder=""
                  required
                  onBlur={() => handleFieldBlur('ccCvv')}
                />
                {touchedFields.ccCvv && !document.getElementById('cc-cvv').value && <div className="invalid-feedback">Security code required</div>}
              </div>
            </div>

            <hr className="mb-4" />
            <button className="border-[#782F10] border text-[#782F10] hover:bg-[#782F10] hover:text-white font-semibold py-2 px-4 hover:transform hover:-translate-y-1 transition duration-200" type="submit">Submit</button>
          </form>
        </div>
      </div>
       {/* Success modal */}
       {showSuccessModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white border border border-[#BCC490] border-4 p-8 shadow-lg flex flex-col justify-center items-center">
            <p className="text-lg font-semibold text-gray-500">Purchase Successful!</p>
            <Link to="/"
              className="bg-white p-2 font-semibold hover:bg-[#BCC490] hover:text-white transition duration-200 border-[#BCC490] mt-6"
              onClick={() => setShowSuccessModal(false)}
            >
              Close
            </Link>
          </div>
        </div>
      )}
      <Link to="/" className="absolute top-12 left-20 bg-white p-2 shadow-s font-semibold hover:bg-[#782F10] hover:text-white transition duration-200 border-[#BCC490] border-2">Go Back</Link>
    </div>
  );
}

