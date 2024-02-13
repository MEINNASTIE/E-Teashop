import Product from '../models/Product.js';

export async function searchProducts(query) {
  try {
    const products = await Product.find({
      $or: [
        { name: { $regex: query, $options: 'i' } }, 
        { description: { $regex: query, $options: 'i' } },
        { category: { $regex: query, $options: 'i' } } 
      ]
    }).populate('author');
    return products;
  } catch (error) {
    throw new Error('Error searching products');
  }
}
