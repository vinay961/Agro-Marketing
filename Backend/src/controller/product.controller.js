import {asyncHandler} from '../utils/AsyncHandler.js'
import { ApiError } from '../utils/ApiError.js'
import {ApiResponse} from '../utils/ApiResponse.js'
import path from 'path';

import { Product } from "../model/product.model.js";
import {User} from "../model/user.model.js"
import {uploadOnCloudinary} from "../utils/cloudinary.js"

const registerProduct = asyncHandler(async(req,res) => {
    try {
        const {productName,productDesc,category,price,quantity} = req.body;
        if([productName,productDesc,category,price,quantity].some((field)=>field?.trim() == "")){
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
            quantity,
            productImage:productImage?.url || null,
            user: req.user._id
        })
        res
            .status(201)
            .json(new ApiResponse(201,{product},"Product Registered."))

    } catch (error) {
        console.log(error||"Product registration get failed.");
    }
})

const editProduct = asyncHandler(async(req,res) => {
    const {productName,productDesc,category,price,quantity} = req.body;
    try {
        const productId = req.params.id;
        if(!productId){
            throw new ApiError(400,"Product Id not found.");
        }

        let product = await Product.findById(productId);
        if(req.file){
            const localFilePath = req.file?.path;
            const productImage = await uploadOnCloudinary(localFilePath);
            product.productImage = productImage?.url
        }
        if(productName){
            product.productName = productName;
        }
        if(productDesc){
            product.productDesc = productDesc;
        }
        if(category){
            product.category = category;
        }
        if(price){
            product.price = price;
        }
        if(quantity){
            product.quantity = quantity;
        }
        await product.save({validateBeforeSave:false})
        res
            .status(201)
            .json(new ApiResponse(201,{product},"Product Updated successfully."))
    } catch (error) {
        console.log(error || "Error found while editing product."); 
    }
})

const getProduct = asyncHandler(async(req,res) => {
    try {
        const products = await Product.find();
        res
            .status(200)
            .json(new ApiResponse(200,products,"Products fetched successfully."));
    } catch (error) {
        throw new ApiError(400,"Error!! Products searching..")
    }
})

const getUserProduct = asyncHandler(async (req, res) => {
    try {
        const userId = req.user._id;
        const products = await Product.find({ user: userId });
        if (!products) {
            throw new ApiError(404, "No products found for this user.");
        }
        res.status(200).json(new ApiResponse(200, products, "User products fetched successfully."));
    } catch (error) {
        console.log(error);
        res
            .status(error.statusCode || 500)
            .json(new ApiResponse(error.statusCode || 500, null, error.message || "Server Error"));
    }
});

const deleteProduct = asyncHandler(async(req,res) =>{
    try {
        const productId = req.params.id;
        if(!productId){
            throw new ApiError(301,"Product Id not found.");
        }
        await Product.findByIdAndDelete(productId)
        res
            .status(201)
            .status(201,{},"Product Successfully deleted.")
    } catch (error) {
        console.log(error)
        res
            .status(error.statusCode || 500)
            .json(new ApiResponse(error.statusCode || 500, {}, message || "Server Error"));
    }
})

const getSpecificProduct = asyncHandler(async (req, res) => {
    try {
        const productId = req.params.id;

        if (!productId) {
            throw new ApiError(400, "Product ID not provided.");
        }

        const product = await Product.findById(productId);

        if (!product) {
            throw new ApiError(404, "Product not found.");
        }

        res.status(200).json(new ApiResponse(200,{product},"Product successfully fetched."));
    } catch (error) {
        console.error(error);
        res.status(error.statusCode || 500).json({
            success: false,
            message: error.message || "Server Error"
        });
    }
});


export {
    registerProduct,
    editProduct,
    getProduct,
    getUserProduct,
    deleteProduct,
    getSpecificProduct
}