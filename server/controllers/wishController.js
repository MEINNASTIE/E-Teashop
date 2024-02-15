import User from '../models/User.js';
import Product from '../models/Product.js';

// ADD AN ITEM TO USER WISHLIST
export async function addToWishlist(req, res) {
  try {
    const { productId } = req.body;
    const userId = req.user;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(400).json({ success: false, message: 'User not found' });
    }

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(400).json({ success: false, message: 'Product not available' });
    }
    
    if (user.wishlist.includes(productId)) {
      return res.status(400).json({ success: false, message: 'Product already in wishlist' });
    }

    user.wishlist.push({ product: productId });
    await user.save();

    res.status(200).json({ success: true, message: 'Product added to wishlist' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: err });
  }
}

// GET THE WISHLIST AND POPULATE PRODUCT DETAILS
export async function getWishlist(req, res) {
  try {
    const userId = req.user;

    const user = await User.findById(userId).populate({
      path: 'wishlist',
      populate: {
        path: 'product',
        model: 'Product'
      }
    }); 

    if (!user) {
      return res.status(400).json({ success: false, message: 'User not found' });
    }

    res.status(200).json({ success: true, wishlist: user.wishlist });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
}

// REMOVE A PRODUCT FROM WISHLIST
// export async function removeFromWishlist(req, res) {
//   try {
//     const { productId } = req.params;
//     const userId = req.user;

//     const user = await User.findById(userId);
//     if (!user) {
//       return res.status(400).json({ success: false, message: 'User not found' });
//     }

//     const index = user.wishlist.findIndex(item => item.product.equals(productId));
//     if (index === -1) {
//       return res.status(400).json({ success: false, message: 'Product not found in wishlist' });
//     }

//     user.wishlist.splice(index, 1);
//     await user.save();

//     res.status(200).json({ success: true, message: 'Product removed from wishlist' });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ success: false, message: 'Internal server error' });
//   }
// }

/**
 * Same functionality if you need it, just fewer lines
 */
export async function removeFromWishlist(req, res) {
  try {
    const { productId } = req.params;
    const userId = req.user;

    const user = await User.findByIdAndUpdate(
      userId,
      { $pull: { wishlist: productId } },
      { new: true }
    ).populate('wishlist.product');
    
    if (!user) {
      return res.status(400).json({ success: false, message: 'User not found' });
    }

    res.status(200).json({ success: true, message: 'Product removed from wishlist' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
}
