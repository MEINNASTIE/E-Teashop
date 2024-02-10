export default function Product({ product, addToCart }) {
  const handleAddToCart = () => {
    addToCart(product);
    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    const updatedCart = [...cartItems, product];
    localStorage.setItem('cartItems', JSON.stringify(updatedCart));
  };

  return (
    <div className="product">
      <h2>{product.name}</h2>
      <p>{product.description}</p>
      <p>Price: {product.price}</p>
      {product.imageUrl && <img src={product.imageUrl} alt={product.name} />}
      <button onClick={handleAddToCart}>Add to Cart</button>
    </div>
  );
}


