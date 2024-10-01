import {asyncHandler} from '../utils/AsyncHandler.js'
import { ApiError } from '../utils/ApiError.js'
import {ApiResponse} from '../utils/ApiResponse.js'

import { Order } from '../model/order.model.js'

const setOrder = asyncHandler(async(req,res) =>{
    const { products } = req.body;
    if(!products){
        throw new ApiError(404,"Cart is empty.")
    }
    try {
        
    } catch (error) {
        console.log(error);
        throw new ApiResponse(404,{},"Something went wrong while setting the cart.")
    }
})