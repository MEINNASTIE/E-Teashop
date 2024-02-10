import  { useState } from 'react';
import { useProductContext } from '../../context/productProvider.jsx';

export default function AddProduct() {
  const { addProduct } = useProductContext();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');
  const [image, setImage] = useState(null); // Initialize image state with null, was very important for the DOM manipulation error

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('name', name);
      formData.append('description', description);
      formData.append('price', price);
      formData.append('category', category);
      formData.append('image', image);
      
      await addProduct(formData);
      setName('');
      setDescription('');
      setPrice('');
      setCategory('');
      setImage(null); 
    } catch (error) {
      console.error('Error adding product:', error);
    }
  };

  const handleImageSelect = (e) => {
    const selectedImage = e.target.files[0];
    setImage(selectedImage);
  };

  return (
    <div className="add-product">
      <h2>Add Product</h2>
      <form onSubmit={handleSubmit}>
        <input 
          type="text" 
          placeholder="Name" 
          value={name} 
          onChange={(e) => setName(e.target.value)} 
          required 
        />

        <textarea 
          placeholder="Description" 
          value={description} 
          onChange={(e) => setDescription(e.target.value)} 
          required 
        />

        <input 
          type="text" 
          placeholder="Price" 
          value={price} 
          onChange={(e) => setPrice(e.target.value)} 
          required 
        />

        <input 
          type="text" 
          placeholder="Category" 
          value={category} 
          onChange={(e) => setCategory(e.target.value)} 
          required 
        />

        <input 
          type="file" 
          accept="image/png, image/jpeg" 
          onChange={handleImageSelect} 
          required 
        />

        <button type="submit">Add Product</button>
      </form>
    </div>
  );
}




