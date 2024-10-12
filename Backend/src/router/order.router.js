import express from 'express';
import { verifyJWT } from '../middleware/checkAuth.js';
import { getOrder, setOrder } from '../controller/order.controller.js';

const router = express.Router();

router.post('/setorder', verifyJWT, setOrder);
router.get('/getorder',verifyJWT,getOrder);

export default router;
