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

const getOrder = asyncHandler(async(req, res) => {    
    try {
        const userId = req.user ? req.user._id : null;  
        if (!userId) {
            return res.status(401).json(new ApiResponse(401, {}, "Unauthorized access."));
        }

        const userProducts = await Product.find({ user: userId });
        if (userProducts.length === 0) {
            return res.status(404).json(new ApiResponse(404, {}, "No products found for this user."));
        }

        const userProductsId = userProducts.map(product => product._id);
        // console.log(userProductsId);

        const orders = await Order.find({ 'products.productId': { $in: userProductsId } }).populate('products.productId');
        // console.log(JSON.stringify(orders, null, 2));

        return res.status(200).json(new ApiResponse(200, orders, "Orders fetched successfully."));
    } catch (error) {
        console.error(error);  
        return res.status(500).json(new ApiResponse(500, {}, "Failed to fetch orders."));
    }
});

const updateOrder = asyncHandler(async(req,res) => {
    const { orderId } = req.params; 
    const { status } = req.body; 

    try {
        if (status !== 'Processed' && status !== 'Rejected') {
        return res.status(400).json({ message: 'Invalid status. Must be "Processed" or "Rejected".' });
        }

        const updatedOrder = await Order.findByIdAndUpdate(
        orderId,
        { status },
        { new: true }
        );

        if (!updatedOrder) {
        return res.status(404).json({ message: 'Order not found.' });
        }

        return res.status(200).json({ message: 'Order status updated successfully.', updatedOrder });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Server error while updating order status.' });
    }
})

const deleteOrder = asyncHandler(async(req,res) => {
    const { orderId } = req.params; 

    try {
        const deletedOrder = await Order.findByIdAndDelete(orderId);

        if (!deletedOrder) {
        return res.status(404).json({ message: 'Order not found.' });
        }

        return res.status(200).json({ message: 'Order deleted successfully.', deletedOrder });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Server error while deleting order.' });
    }
})

const getUserOrder = asyncHandler(async(req,res) => {
    try {
        const userId = req.user._id;
        if(!userId){
            throw new ApiError(404,"User not found.")
        }
        const userOrder = await Order.find({ userId });
        if(!userOrder){
            throw new ApiError(404,"No Order is placed by user!!")
        }
        // console.log(userOrder);
        return res.status(201).json(new ApiResponse(201,userOrder,"Order fetched successfully"))
    } catch (error) {
        console.log(error);
        return res.status(400).json(new ApiResponse(400,{},"Error found while finding order of user."))
    }
})

export {
    setOrder,
    getOrder,
    updateOrder,
    deleteOrder,
    getUserOrder
}