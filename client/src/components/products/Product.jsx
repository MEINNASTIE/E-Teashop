export default function Product({ product }) {
  return (
    <div className="product">
      <h2>{product.name}</h2>
      <p>{product.description}</p>
      <p>Price: {product.price}</p>
      {product.imageUrl && <img src={product.imageUrl} alt={product.name} />}
    </div>
  );
}


