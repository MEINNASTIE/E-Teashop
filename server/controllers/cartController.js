import User from '../models/User.js';
import Product from '../models/Product.js';

// Add an item to the user's cart
export async function addToCart(req, res) {
  try {
    const { productId } = req.body;
    const userId = req.user;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(400).json({ success: false, message: 'User not found' });
    }

    const product = await Product.findById(productId);
    if (!product || product.quantity === 0) {
      return res.status(400).json({ success: false, message: 'Product not available' });
    }

    // Check if user has a cart
    if (!user.cart) {
      user.cart = []; // If user doesn't have a cart, initialize an empty cart array
    }

    product.quantity -= 1;
    await product.save();

    user.cart.push({ product: productId, quantity: 1 }); // Push object with productId and quantity
    await user.save(); // Await user save operation

    res.status(200).json({ success: true, message: 'Item added to cart' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
}

export async function getCartItems(req, res) {
  try {
    const userId = req.user;

    const user = await User.findById(userId).populate('cart.product'); // Populate the 'product' field in the 'cart' array with actual product details

    if (!user) {
      return res.status(400).json({ success: false, message: 'User not found' });
    }

    res.status(200).json({ success: true, cart: user.cart });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
}


// NOTICE CODE: Work on additional settings