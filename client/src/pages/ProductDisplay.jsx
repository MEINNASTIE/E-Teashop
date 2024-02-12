import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Navbar from '../components/sticker/Navbar';

export default function ProductDisplay() {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [addToCartError, setAddToCartError] = useState('');
  const [quantity, setQuantity] = useState(1);

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
        <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-2">{product.name}</h2>
            <p className="text-gray-700 mb-4">{product.description}</p>
            <p className="text-gray-800 font-semibold mb-2">Price: {product.price}</p>
            {product.imageUrl && <img src={product.imageUrl} alt={product.name} className="w-1/2 mb-4" />}
            <label className="block mb-2">
            Quantity:
            <input type="number" min="1" value={quantity} onChange={handleQuantityChange} className="block w-full mt-1 p-2 border rounded-md" />
            </label>
            <button onClick={addToCart} className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md">
            Add to Cart
            </button>
            {addToCartError && <p className="text-red-500 mt-2">{addToCartError}</p>}
        </div>
    </div>
  );
}
