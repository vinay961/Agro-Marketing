import {asyncHandler} from '../utils/AsyncHandler.js'
import { ApiError } from '../utils/ApiError.js'
import {ApiResponse} from '../utils/ApiResponse.js'

import { Order } from '../model/order.model.js'

const setOrder = asyncHandler(async(req,res) =>{
    const { userId, cartItems, totalAmount, paymentMethod } = req.body;
    try {
        const newOrder = new Order({
            userId,
            products: cartItems,
            totalAmount,
            paymentMethod,
        });

        const savedOrder = await newOrder.save();
        res.status(201).json(savedOrder);
    } catch (error) {
        res.status(500).json({ error: 'Failed to save order' });
    }
})

export {
    setOrder
}