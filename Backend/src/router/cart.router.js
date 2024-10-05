import express from 'express';
import {
  addToCart,
  getCart,
  updateCartItem,
  removeCartItem,
  clearCart,
} from '../controllers/cart.controller.js';
import { verifyJWT } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/add', verifyJWT, addToCart);         
router.get('/', verifyJWT, getCart);             
router.put('/update', verifyJWT, updateCartItem);  
router.delete('/remove', verifyJWT, removeCartItem);  
router.delete('/clear', verifyJWT, clearCart);     

export default router;
