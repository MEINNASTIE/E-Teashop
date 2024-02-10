import useFetchProducts from '../../hooks/useFetchProducts.js';
import Product from './Product';

const ProductList = () => {
  const products = useFetchProducts();

  return (
    <div className="product-list">
      <h2>All Products</h2>
      {products.map(product => (
        <Product key={product._id} product={product} />
      ))}
    </div>
  );
};

export default ProductList;

