import express from 'express';
import { verifyJWT } from '../middleware/checkAuth.js';
import { deleteOrder, getOrder, setOrder, updateOrder } from '../controller/order.controller.js';

const router = express.Router();

router.post('/setorder', verifyJWT, setOrder);
router.get('/getorder',verifyJWT,getOrder);
router.put('/updateorder/:orderId',verifyJWT,updateOrder);
router.delete('/deleteorder/:orderId',verifyJWT,deleteOrder);

export default router;
