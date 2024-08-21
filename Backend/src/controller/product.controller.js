import {asyncHandler} from '../utils/AsyncHandler.js'
import { ApiError } from '../utils/ApiError.js'
import {ApiResponse} from '../utils/ApiResponse.js'

import { Product } from "../model/product.model.js";

const registerProduct = asyncHandler(async(req,res) => {
    try {
        const {productName,productDesc,category,price} = req.body;
        if([productName,productDesc,category,price].some((field)=>field?.trim() == "")){
            throw new ApiError(401,"All entries are needed.")
        }


    } catch (error) {
        console.log(error||"Product registration get failed.");
    }
})

