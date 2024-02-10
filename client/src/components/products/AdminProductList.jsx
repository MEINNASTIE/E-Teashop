import { useState } from 'react';

import { useProductContext } from '../../context/productProvider.jsx';
import useFetchProducts from '../../hooks/useFetchProducts.js';

export default function ProductList() {
  const products = useFetchProducts();
  const { deleteProduct, updateProduct } = useProductContext();
  const [editProduct, setEditProduct] = useState(null); 
  const [updatedData, setUpdatedData] = useState({
    name: '',
    description: '',
    price: '',
    category: ''
  });

  const handleDelete = async (productId) => {
    try {
      await deleteProduct(productId);
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  const handleUpdate = async () => {
    try {
      await updateProduct(editProduct._id, updatedData);
      setEditProduct(null);
      setUpdatedData({
        name: '',
        description: '',
        price: '',
        category: ''
      });
    } catch (error) {
      console.error('Error updating product:', error);
    }
  };

  const handleEdit = (product) => {
    setEditProduct(product);

    setUpdatedData({
      name: product.name,
      description: product.description,
      price: product.price,
      category: product.category
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedData({
      ...updatedData,
      [name]: value
    });
  };

  return (
    <div className="product-list">
      <h2>All Products</h2>
      <table>
        <thead>
          <tr>
            <th></th>
            <th>Name</th>
            <th>Description</th>
            <th>Price</th>
            <th>Category</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {products.map(product => (
            <tr key={product._id}>
              <td>{product.imageUrl && 
              <img src={product.imageUrl} alt={product.name} className="w-10 h-10 rounded-full" />}
              </td>

              <td>{editProduct === product ? 
              <input type="text" name="name" value={updatedData.name} onChange={handleInputChange} /> : product.name}
              </td>

              <td>{editProduct === product ? 
              <input type="text" name="description" value={updatedData.description} onChange={handleInputChange} /> : product.description}
              </td>

              <td>{editProduct === product ? 
              <input type="text" name="price" value={updatedData.price} onChange={handleInputChange} /> : product.price}
              </td>

              <td>{editProduct === product ? 
              <input type="text" name="category" value={updatedData.category} onChange={handleInputChange} /> : product.category}
              </td>

              <td>
                {editProduct === product ? (
                  <>
                    <button onClick={handleUpdate}>Update</button>
                    <button onClick={() => setEditProduct(null)}>Cancel</button>
                  </>
                ) : (
                  <button onClick={() => handleEdit(product)}>Edit</button>
                )}
                <button onClick={() => handleDelete(product._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// notes: if there is an empty field, it cannot be edited for some reason // needs a fix
