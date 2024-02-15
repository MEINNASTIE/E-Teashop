import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function WishlistPage() {
  const [wishlistItems, setWishlistItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWishlistItems = async () => {
      try {
        const jwtToken = localStorage.getItem('jwt_token');
        if (!jwtToken) {
          setError('JWT token not found in local storage');
          return;
        }

        console.log("Fetching wishlist items...");
        const response = await axios.get('http://localhost:5000/wish/wishlist', {
          headers: {
            Authorization: `Bearer ${jwtToken}`
          }
        });
        console.log("Response:", response.data);
        setWishlistItems(response.data.wishlist);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching wishlist items:', error);
        setError('Error fetching wishlist items');
      }
    };

    fetchWishlistItems();
  }, []);

  const handleRemoveItem = async (productId) => {
    try {
      const jwt_token = localStorage.getItem('jwt_token');
      if (!jwt_token) {
        return;
      }
  
      console.log("Removing item from wishlist...");
      const response = await axios.delete(`http://localhost:5000/wish/wishlist/${productId}`, {
        headers: {
          Authorization: `Bearer ${jwt_token}`
        },
        data: { productId } 
      });
      console.log("Response data:", response.data);
      console.log("Response status code:", response.status);

      console.log("Item removed from wishlist:", productId);
      setWishlistItems(prevWishlistItems => prevWishlistItems.filter(item => item._id !== productId));
    } catch (error) {
      console.error('Error removing item from wishlist:', error);
    }
  };

  return (
    <div className="min-h-screen m-10">
      <h2 className="text-[30px] mb-4 ml-[155px]">My Wishlist</h2>

      {isLoading && <p>Loading wishlist...</p>}
      {error && <p className="text-red-500">Error: {error}</p>}

      {wishlistItems.length > 0 && (
        <div className="flex gap-10 m-10 ml-[155px]">
          <div className="mb-8 text-gray-500">
            <div className="bg-white shadow-s p-4">
              <ul>
                {wishlistItems.map((item) => (
                 
                  <li key={item._id} className="flex items-center justify-between mb-4"> 
                  <Link to={`/product/${item.product._id}`} key={item.product._id}>
                    <div className="flex items-center">
                      {item.product && item.product.imageUrl && ( 
                        <img src={item.product.imageUrl} alt={item.product.name} className="p-2 bg-white w-[120px]" />
                      )}
                      <span className="font-semibold">{item.product && item.product.name}</span> 
                    </div>
                    </Link>
                    <div className="flex items-center">
                      <button
                        className="border-[#782F10] border text-[#782F10] hover:bg-[#782F10] hover:text-white font-semibold py-2 px-4 transition duration-400 text-[14px] mr-10 ml-10"
                        onClick={() => handleRemoveItem(item._id)}
                      >
                        Remove
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
      {wishlistItems.length === 0 && <p className="text-center text-gray-500">Empty wishlist</p>}
    </div>
  );
}

