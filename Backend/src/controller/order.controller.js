import {asyncHandler} from '../utils/AsyncHandler.js'
import { ApiError } from '../utils/ApiError.js'
import {ApiResponse} from '../utils/ApiResponse.js'

import { Order } from '../model/order.model.js'
import { Product } from "../model/product.model.js";

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
        res.status(201).json(new ApiResponse(201, savedOrder, "Order saved successfully"));
    } catch (error) {
        res.status(500).json(new ApiResponse(404,{},"Failed to save the orders."));
    }
})

const getOrder = asyncHandler(async(req,res) => {
    try {
        const userId = req.user._id;
        const userProducts = await Product.find({ user:userId });
        if(!userProducts){
            throw new ApiError(404,"No product found for that particular user.");
        }
        const userProductsId = userProducts.map(product => product._id);
        console.log(userProductsId);

        const orders = await Order.find({ 'products.productId': { $in: userProductsId } }).populate('products.productId');
        console.log(JSON.stringify(orders, null, 2));

        return res.status(201).json(new ApiResponse(201,orders,"Orders fetched sucessfully."))

    } catch (error) {
        return res.status(401).json(new ApiResponse(404,{},"Failed to fetch order's."));
    }
})

export {
    setOrder,
    getOrder
}