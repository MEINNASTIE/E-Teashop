import User from '../models/User.js';
import Product from '../models/Product.js';

// ADD AN ITEM TO USER CART
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


// GET THE CART AND POPULATE PRODUCT
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

// DELETE A PRODUCT FROM CART
export async function removeFromCart(req, res) {
  try {
    const { productId } = req.params;
    const userId = req.user;

    const user = await User.findById(userId);
    if (!user) return res.status(400).json({ success: false, message: 'User not found' });

    const index = user.cart.findIndex(item => item.product.toString() === productId);
    if (index === -1) return res.status(400).json({ success: false, message: 'Item not found in cart' });

    const product = await Product.findById(user.cart[index].product);
    product.quantity += user.cart[index].quantity;
    await Promise.all([product.save(), user.cart.splice(index, 1), user.save()]);

    res.status(200).json({ success: true, message: 'Item removed from cart' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
}

// UPDATE CART ITEM
export async function updateCartItem(req, res) {
  try {
    const { productId, quantity } = req.body;
    const userId = req.user;

    const user = await User.findById(userId);
    if (!user) return res.status(400).json({ success: false, message: 'User not found' });

    const index = user.cart.findIndex(item => item.product.toString() === productId);
    if (index === -1) return res.status(400).json({ success: false, message: 'Item not found in cart' });

    const product = await Product.findById(user.cart[index].product);
    const originalQuantity = user.cart[index].quantity;

    if (quantity > product.quantity + originalQuantity)
      return res.status(400).json({ success: false, message: 'Insufficient quantity of product' });

    const quantityDifference = quantity - originalQuantity;
    user.cart[index].quantity = quantity;
    product.quantity -= quantityDifference;

    await Promise.all([product.save(), user.save()]);

    res.status(200).json({ success: true, message: 'Cart item quantity updated' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
}


// NOTICE CODE: Work on additional settings