import { Router } from 'express';
import { addToWishlist, getWishlist, removeFromWishlist } from '../controllers/wishController.js';
import auth from "../middlewares/auth.js";

const router = Router();

router.post('/wishlist', auth, addToWishlist);
router.get('/wishlist', auth, getWishlist);
router.delete('/wishlist/:productId', auth, removeFromWishlist);

export default router;
