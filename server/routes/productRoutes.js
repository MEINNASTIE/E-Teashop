import { Router } from 'express';
import { getAllProducts, createProduct, updateProduct, deleteProduct, getProductCategories } from '../controllers/productController.js';
import uploadCloud from "../middlewares/multerCloudinary.js";

const router = Router();

router.get('/products', getAllProducts);
router.get('/products/categories', getProductCategories);
router.post('/products', uploadCloud.single("image"), createProduct);
router.patch('/products/:id', updateProduct);
router.delete('/products/:id', deleteProduct);

export default router;
