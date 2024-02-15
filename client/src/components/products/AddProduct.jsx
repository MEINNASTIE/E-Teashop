import  { useState } from 'react';
import { useProductContext } from '../../context/productProvider.jsx';

export default function AddProduct() {
  const { addProduct } = useProductContext();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState(0);
  const [category, setCategory] = useState('');
  const [quantity, setQuantity] = useState(0);
  const [image, setImage] = useState(null); // Initialize image state with null, was very important for the DOM manipulation error

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('name', name);
      formData.append('description', description);
      formData.append('price', price);
      formData.append('category', category);
      formData.append('quantity', quantity);
      formData.append('image', image);
      
      await addProduct(formData);
      setName('');
      setDescription('');
      setPrice(0);
      setCategory('');
      setQuantity(0);
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
    <div className="add-product container mx-auto py-8">
      <h2 className="text-3xl font-bold mb-4">Add Product</h2>
      <form onSubmit={handleSubmit} className="max-w-lg mx-auto">
        <div className="mb-4">
          <input 
            type="text" 
            placeholder="Name" 
            value={name} 
            onChange={(e) => setName(e.target.value)} 
            required 
            className="w-full px-4 py-2 border border-gray-300  focus:outline-none focus:border-[#BCC490]"
          />
        </div>
  
        <div className="mb-4">
          <textarea 
            placeholder="Description" 
            value={description} 
            onChange={(e) => setDescription(e.target.value)} 
            required 
            className="w-full px-4 py-2 border border-gray-300  focus:outline-none focus:border-[#BCC490]"
          />
        </div>
  
        <div className="mb-4">
          <input 
            type="number" 
            placeholder="Price" 
            value={price} 
            onChange={(e) => setPrice(e.target.value)} 
            required 
            className="w-full px-4 py-2 border border-gray-300 focus:outline-none focus:border-[#BCC490]"
          />
        </div>
  
        <div className="mb-4">
          <input 
            type="text" 
            placeholder="Category" 
            value={category} 
            onChange={(e) => setCategory(e.target.value)} 
            required 
            className="w-full px-4 py-2 border border-gray-300 focus:outline-none focus:border-[#BCC490]"
          />
        </div>
  
        <div className="mb-4">
          <input 
            type="number" 
            placeholder="Quantity" 
            value={quantity} 
            onChange={(e) => setQuantity(e.target.value)} 
            required 
            className="w-full px-4 py-2 border border-gray-300  focus:outline-none focus:border-[#BCC490]"
          />
        </div>
  
        <div className="mb-4">
          <input 
            type="file" 
            accept="image/png, image/jpeg" 
            onChange={handleImageSelect} 
            required 
            className="absolute opacity-0 cursor-pointer"
          />
           <span className="px-4 py-2 border-[#BCC490] border hover:bg-[#BCC490] text-[#BCC490] px-4 py-2 hover:text-white focus:outline-none focus:border-[#BCC490]">
               Browse
           </span>
        </div>
  
        <button type="submit" className="border-[#BCC490] border hover:bg-[#BCC490] text-[#BCC490] px-4 py-2 hover:text-white focus:outline-none transition duration-300">Add Product</button>
      </form>
    </div>
  );
  
}




