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
    category: '',
    quantity: 0
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
      await updateProduct(editProduct._id, {
        ...editProduct,
        ...updatedData 
      });
      setEditProduct(null);
      setUpdatedData({
        name: '',
        description: '',
        price: '',
        category: '',
        quantity: 0
      });
    } catch (error) {
      console.error('Error updating product:', error);
    }
  }

  const handleEdit = (product) => {
    setEditProduct(product);

    setUpdatedData({
      name: product.name,
      description: product.description,
      price: product.price,
      category: product.category,
      quantity: product.quantity
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedData({
      ...updatedData,
      [name]: name === 'quantity' ? parseInt(value) : value
    });
  };

  return (
    <div className="container mx-auto py-8">
      <h2 className="text-3xl font-bold mb-4">Inventory</h2>
      <div className="overflow-x-auto">
        <table className="table-auto w-full border-collapse border border-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2"></th>
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Description</th>
              <th className="px-4 py-2">Price</th>
              <th className="px-4 py-2">Category</th>
              <th className="px-4 py-2">Quantity</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map(product => (
              <tr key={product._id} className="border-b border-gray-200">
                <td className="px-8 py-4">
                  {product.imageUrl && 
                  <img src={product.imageUrl} alt={product.name} className="w-40 h-13" />}
                </td>
                <td className="px-4 py-2">{editProduct === product ? <input type="text" name="name" value={updatedData.name} onChange={handleInputChange} className="border border-gray-300 px-2 py-1" /> : product.name}</td>
                <td className="px-4 py-2">
                  {editProduct === product ? (
                    <input
                      type="text"
                      name="description"
                      value={updatedData.description}
                      onChange={handleInputChange}
                      className="border border-gray-300 px-2 py-1 w-full truncate"
                    />
                  ) : (
                    <div className="w-60 truncate">{product.description}</div>
                  )}
                </td>
                <td className="px-4 py-2">{editProduct === product ? <input type="text" name="price" value={updatedData.price} onChange={handleInputChange} className="border border-gray-300 px-2 py-1 w-20" /> : product.price}</td>
                <td className="px-4 py-2">{editProduct === product ? <input type="text" name="category" value={updatedData.category} onChange={handleInputChange} className="border border-gray-300 px-2 py-1" /> : product.category}</td>
                <td className="px-4 py-2">{editProduct === product ? <input type="number" name="quantity" value={updatedData.quantity} onChange={handleInputChange} min="1" step="1" className="border border-gray-300 px-2 py-1 w-20" /> : product.quantity}</td>
                <td className="px-8 py-2">
                  {editProduct === product ? (
                    <>
                      <button className="bg-white hover:bg-[#BCC490] px-2 py-1 mr-2 mb-4" onClick={handleUpdate}>Update</button>
                      <button className="bg-white hover:bg-[#BCC490] px-2 py-1 mb-4" onClick={() => setEditProduct(null)}>Cancel</button>
                    </>
                  ) : (
                    <button className="bg-white hover:bg-[#BCC490] px-2 py-1 mr-2 mb-4" onClick={() => handleEdit(product)}>Edit</button>
                  )}
                  <button className="bg-white hover:bg-[#BCC490] px-2 py-1 " onClick={() => handleDelete(product._id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  ); 
}

// notes: if there is an empty field, it cannot be edited for some reason // needs a fix