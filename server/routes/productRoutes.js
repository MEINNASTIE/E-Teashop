import { Router } from 'express';
import { getAllProducts, createProduct, updateProduct, deleteProduct, getProductCategories, getProductById } from '../controllers/productController.js';
import { addToCart, getCartItems, removeFromCart, updateCartItem } from '../controllers/cartController.js';

import uploadCloud from "../middlewares/multerCloudinary.js";

import auth from "../middlewares/auth.js"

const router = Router();

router.get('/products', getAllProducts);
router.get('/products/categories', getProductCategories);
router.get('/products/:id', getProductById);
router.post('/products', uploadCloud.single("image"), createProduct);
router.patch('/products/:id', updateProduct);
router.delete('/products/:id', deleteProduct);

// route for cart control
router.post('/cart', auth, addToCart);
router.get('/cart', auth, getCartItems); 
router.delete('/cart/:productId', auth, removeFromCart); 
router.patch('/cart/:productId', auth, updateCartItem);

export default router;
