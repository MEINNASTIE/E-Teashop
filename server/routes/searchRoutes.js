import express from 'express';
import { searchProducts } from '../controllers/searchController.js';

const router = express.Router();

router.get('/search', async (req, res) => {
  const { query } = req.query;
  try {
    const products = await searchProducts(query);
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: 'Error searching products' });
  }
});

export default router;
