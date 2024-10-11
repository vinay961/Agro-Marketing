import express from 'express';
import { verifyJWT } from '../middleware/checkAuth.js';
import { setOrder } from '../controller/order.controller.js';

const router = express.Router();

router.post('/setorder', verifyJWT, setOrder);

export default router;
