// src/routes/index.ts
import express from 'express';
import { ProductController } from '../controllers/ProductController';
import { CartController } from '../controllers/CartController';

const router = express.Router();

router.get('/products', ProductController.getAll);
router.post('/cart', CartController.createCart);
router.post('/cart/:cartId/items', CartController.addItem);
router.get('/cart/:cartId', CartController.getCart);

export default router;