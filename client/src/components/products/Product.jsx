import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faHeartBroken } from '@fortawesome/free-solid-svg-icons';

export default function Product({ product }) {
  const [inWishlist, setInWishlist] = useState(false);

  useEffect(() => {
    const checkWishlist = async () => {
      try {
        const jwt_token = localStorage.getItem('jwt_token');

        if (!jwt_token) {
          throw new Error('Authentication token not found in local storage');
        }

        const response = await axios.get(
          `http://localhost:5000/wish/wishlist`,
          { headers: { Authorization: `Bearer ${jwt_token}` } }
        );

        if (response.data.success) {
          const isInWishlist = response.data.wishlist.some(item => item.product === product._id);
          setInWishlist(isInWishlist);
        }
      } catch (error) {
        console.error('Error checking wishlist:', error.message);
      }
    };

    checkWishlist();
  }, [product._id]);

  const addToWishlist = async () => {
    try {
      const jwt_token = localStorage.getItem('jwt_token');

      if (!jwt_token) {
        throw new Error('Authentication token not found in local storage');
      }

      const response = await axios.post(
        `http://localhost:5000/wish/wishlist`,
        { productId: product._id },
        { headers: { Authorization: `Bearer ${jwt_token}` } }
      );

      if (response.data.success) {
        setInWishlist(true);
        alert('Item added to wishlist successfully!');
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      console.error('Error adding item to wishlist:', error.message);
    }
  };

  const handleRemoveItem = async () => {
    try {
      const jwtToken = localStorage.getItem('jwt_token');
      if (!jwtToken) {
        return;
      }

      console.log("Removing item from wishlist...");
      const response = await axios.delete(`http://localhost:5000/wish/wishlist/${product._id}`, {
        headers: {
          Authorization: `Bearer ${jwtToken}`
        },
      });
      console.log("Response data:", response.data);
      console.log("Response status code:", response.status);

      if (response.data.success) {
        const wishlist = JSON.parse(localStorage.getItem('wishlist'));
        const updatedWishlist = wishlist.filter(item => item !== product._id);
        localStorage.setItem('wishlist', JSON.stringify(updatedWishlist));
        setInWishlist(false);
      }

      console.log("Item removed from wishlist:", product._id);
    } catch (error) {
      console.error('Error removing item from wishlist:', error);
    }
  };

  return (
    <>
      <div className="hover:transform hover:-translate-y-2 transition duration-200 relative">
        <Link to={`/product/${product._id}`} key={product._id}>
          <div className="p-2 text-center">
            {product.imageUrl && <img src={product.imageUrl} alt={product.name} className="p-2 bg-white" />}
            <h2 className="font-bold text-[14px] mt-4">{product.name}</h2>
            <div>
              <p className="text-[12px] mt-4">From</p>
              <p className="text-[20px]">{product.price}€</p>
            </div>
          </div>
        </Link>
        <button
          onClick={inWishlist ? handleRemoveItem : addToWishlist}
          className="absolute top-5 text-[28px] left-7 text-[#E15438]"
          disabled={inWishlist}
        >
          {inWishlist ? <FontAwesomeIcon icon={faHeart} /> : <FontAwesomeIcon icon={faHeartBroken} />}
        </button>
      </div>
    </>
  );
}










