import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Navbar from '../components/sticker/Navbar';
import Footer from '../components/sticker/Footer';

export default function ProductDisplay() {
  const [selectedSize, setSelectedSize] = useState(null);
 
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [addToCartError, setAddToCartError] = useState('');
  const [quantity, setQuantity] = useState(1); 
  
  const handleSizeSelect = (size) => {
    setSelectedSize(size);
    // Do something with the selected size, like updating state or performing an action
  };

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/admin/products/${productId}`);
        setProduct(response.data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

  const handleQuantityChange = (event) => {
    const newQuantity = parseInt(event.target.value);
    setQuantity(newQuantity);
  };

  const addToCart = async () => {
    try {
      const jwt_token = localStorage.getItem('jwt_token');

      if (!jwt_token) {
        throw new Error('Authentication token not found in local storage');
      }

      await axios.post(
        `http://localhost:5000/admin/cart`,
        { productId: product._id, quantity },
        { headers: { Authorization: `Bearer ${jwt_token}` } }
      );

      alert('Item added to cart successfully!');
    } catch (error) {
      console.error('Error adding item to cart:', error.message);
      setAddToCartError('Failed to add item to cart');
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!product) return <div>Product not found</div>;

  return (
    <div>
        <Navbar />
        <div className="m-4 flex justify-center item-center gap-2">
          <div className="p-2 w-1/3 pb-4 shadow-s">
            <div className="bg-white">
              {product.imageUrl && <img src={product.imageUrl} alt={product.name} className="mb-4 p-2" />}
            </div>
            
            <div className="bg-[#F0EDE8] p-4">
              <h2 className="text-[26px] ml-4 pt-4">Description</h2>
              <p className="text-gray-700 mb-4 p-4 leading-7">{product.description}</p> 
              <h3 className="text-[24px] ml-4 pt-4 text-center">Shipping Tips</h3>
              <p className="text-gray-700 mb-4 p-4">To maximize the shipping tiers for DHL, purchase 1kg + 500g for the first weight tier, or 4 x 1kg for the second weight tier.</p>
            </div>
           
          </div>
          <div className="bg-white mt-2 p-4 pl-10 pr-10">
            <h2 className="text-[24px] font-semibold mb-10 text-[#782F10]">{product.name}</h2>
            <hr></hr>
            <div className="flex items-center justify-center gap-4 mt-10">
              <div 
                className={`p-2 border cursor-pointer ${selectedSize === 'small' ? 'border-[#782F10]' : 'bg-white'}`}
                onClick={() => handleSizeSelect('small')}
              >
                Small / 10g / sample bag
              </div>
              <div 
                className={`p-2 border cursor-pointer ${selectedSize === 'medium' ? 'border-[#782F10]' : 'bg-white'}`}
                onClick={() => handleSizeSelect('medium')}
              >
                Medium / 50g
              </div>
              <div 
                className={`p-2 border cursor-pointer ${selectedSize === 'large' ? 'border-[#782F10]' : 'bg-white'}`}
                onClick={() => handleSizeSelect('large')}
              >
                Large / 375g
              </div>
            </div>
            <p className="mt-16 text-[12px] mb-4 text-center">For leaf teas and multi-packs: if one size is out-of-stock but a different size is available, we may be able to repack the item. Please inquire.</p>
            <p className="text-gray-800 font-semibold mb-2 mt-20"><span className="text-[#782F10] font-bold mr-3">Price:</span> <span className="text-[30px] text-gray-700">{product.price} €</span></p>
           
            <div className="flex items-center gap-4"> 
              <span className="text-[#782F10] font-bold mr-10">Quantity:</span>
              <input type="number" min="1" value={quantity} onChange={handleQuantityChange} className="block w-1/6 mt-1 p-2 border focus:outline-none " />
            </div>

            <div className="mt-20">
              <h2 className="text-[20px] mb-10 text-[#782F10]">Payment & Security</h2>
              <div className="flex gap-4 items-center w-10">
                <img src="/assets/american-express.png" alt="card"></img>
                <img src="/assets/google-pay.png" alt="card"></img>
                <img src="/assets/visa.png" alt="card"></img>
                <img src="/assets/symbols.png" alt="card"></img>
                <img src="/assets/logo.png" alt="card"></img>
                <img src="/assets/card.png" className="h-6" alt="card"></img>
              </div>
              <p className="text-[12px] mt-2">Your payment information is processed securely. We do not store credit card details nor have access to your credit card information.</p>
            </div>
            
            <div className="flex justify-center">
            <button onClick={addToCart} className="border-[#782F10] border text-[#782F10] hover:bg-[#782F10] hover:text-white font-semibold py-2 px-4 mt-[50px] hover:transform hover:-translate-y-1 transition duration-200">
            Add to Cart
            </button>
            {addToCartError && <p className="text-red-500 mt-2">{addToCartError}</p>}
            </div>
          </div>
        </div>
        <Footer />
    </div>
  );
}
