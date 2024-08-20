import {asyncHandler} from '../utils/AsyncHandler.js'
import { ApiError } from '../utils/ApiError.js'
import {ApiResponse} from '../utils/ApiResponse.js'
import jwt from "jsonwebtoken"

import {User} from '../model/user.model.js'

const generateAccessToken = async(userId) => {
    try {
        const user = await User.findById(userId);
        const accessToken = user.generateToken();
        user.accessToken = accessToken;
        await user.save({
            validateBeforeSave:false
        })
        return accessToken;
    } catch (error) {
        throw new ApiError(401,"Error while generating token.")
    }
}

const registerUser = asyncHandler(async(req,res) => {
    const {name,email,password,role} = req.body;
    if([name,email,password,role].some((field)=>{field?.trim() === ""})){
        throw new ApiError(404,"All fields are requried.")
    }
    const existedUser = await User.findOne({
        $or:[{name},{email}]
    })
    if(existedUser){
        throw new ApiError(400,"User Already exist.")
    }

    const user = await User.create({
        name,
        email,
        password,
        role
    })

    const createdUser = await User.findById(user._id).select("-password")
    if(!createdUser){
        throw new ApiError(400,"Registration failed.")
    }

    return res
        .status(201)
        .json(new ApiResponse(200,createdUser,"Registration Successfull."))
})

const login = asyncHandler(async(req,res)=> {
    const {email,password} = req.body;
    if([email,password].some((field)=>{field?.trim() === ""})){
        throw new ApiError(404,"All Fields are required")
    }

    const user = await User.findOne({email})
    if(!user){
        throw new ApiError(404,"User doesn't exist.")
    }
    const isPasswordCorrect = await user.isPasswordCorrect(password);
    if(!isPasswordCorrect){
        throw new ApiError(400,"Password is incorrect.")
    }
    const accessToken = await generateAccessToken(user._id);
    const loggedInUser = await User.findById(user._id).select("-password");
    const options = {
        httpOnly:true,
        secure:true,
    }
    return res
        .status(201)
        .cookie("accessToken",accessToken,options)
        .json(new ApiResponse(201,loggedInUser,"Login successfully"))
})

export {
    registerUser,
    login,
}