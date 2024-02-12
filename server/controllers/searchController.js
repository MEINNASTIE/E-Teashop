import Product from '../models/Product.js';

export async function searchProducts(query) {
  try {
    const products = await Product.find({
      $or: [
        { name: { $regex: query, $options: 'i' } }, // Case-insensitive search for name
        { description: { $regex: query, $options: 'i' } }, // Case-insensitive search for description
        { category: { $regex: query, $options: 'i' } } // Case-insensitive search for category
      ]
    }).populate('author'); // Populate the author field if needed
    return products;
  } catch (error) {
    throw new Error('Error searching products');
  }
}
