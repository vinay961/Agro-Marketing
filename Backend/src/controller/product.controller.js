import {asyncHandler} from '../utils/AsyncHandler.js'
import { ApiError } from '../utils/ApiError.js'
import {ApiResponse} from '../utils/ApiResponse.js'
import path from 'path';

import { Product } from "../model/product.model.js";
import {uploadOnCloudinary} from "../utils/cloudinary.js"

const registerProduct = asyncHandler(async(req,res) => {
    try {
        const {productName,productDesc,category,price} = req.body;
        if([productName,productDesc,category,price].some((field)=>field?.trim() == "")){
            throw new ApiError(401,"All entries are needed.")
        }
        const localFilePath = req.file?.path;
        console.log(localFilePath);
        if(!localFilePath){
            throw new ApiError(400,"Image file/path is not founded.")
        }
        const productImage = await uploadOnCloudinary(localFilePath);
        const product = await Product.create({
            productName,
            productDesc,
            category,
            price,
            productImage:productImage?.url || null,
            user: req.user._id
        })
        res.status(201).json(new ApiResponse(201,{product},"Product Registered."))

    } catch (error) {
        console.log(error||"Product registration get failed.");
    }
})

export {
    registerProduct
}