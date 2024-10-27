import express from 'express';
import {
  addToCart,
  getCart,
  updateCartItem,
  removeCartItem,
  clearCart,
} from '../controller/cart.controller.js';
import { verifyJWT } from '../middleware/checkAuth.js';

const router = express.Router();

router.post('/addtocart', verifyJWT, addToCart);         
router.get('/getcartitem', verifyJWT, getCart);             
router.put('/updatecartitem', verifyJWT, updateCartItem);  
router.delete('/removecartitem', verifyJWT, removeCartItem);  
router.delete('/clearcartitem', verifyJWT, clearCart);     

export default router;
