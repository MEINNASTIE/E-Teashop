import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faHeartBroken } from '@fortawesome/free-solid-svg-icons';
import { useProductContext } from '../../context/productProvider';

export default function Product({ product }) {
  const { wishlist, addToWishlist, removeFromWishlist } = useProductContext();
  const [inWishlist, setInWishlist] = useState(false);

  useEffect(() => {
    const isInWishlist = wishlist.some(item => item.product === product._id);
    setInWishlist(isInWishlist);
  }, [product._id, wishlist]);

  const handleWishlistToggle = () => {
    if (inWishlist) {
      removeFromWishlist(product._id);
    } else {
      addToWishlist(product._id);
    }
  };

  return (
      <div key={inWishlist ? 'inWishlist' : 'notInWishlist'} className="hover:transform hover:-translate-y-2 transition duration-200 relative">
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
        onClick={handleWishlistToggle}
        className="absolute top-5 text-[28px] left-7 text-[#E15438]"
        disabled={inWishlist}
      >
        {inWishlist ? <FontAwesomeIcon icon={faHeart} /> : <FontAwesomeIcon icon={faHeartBroken} />}
      </button>
      </div>
  );
}












