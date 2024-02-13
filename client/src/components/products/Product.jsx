import { Link } from 'react-router-dom';

export default function Product({ product }) {
  return (
    <>
    <div className="hover:transform hover:-translate-y-2 transition duration-200">
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
    </div>
    </>
  );
}







