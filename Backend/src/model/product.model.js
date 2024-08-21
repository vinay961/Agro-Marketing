import mongoose,{ Schema } from "mongoose";

const productSchema = new Schema({
    productName:{
        type:String,
        required:[true,"Product name is requried."],
        trim:true
    },
    productDesc:{
        type:String,
        trim:true
    },
    category:{
        type:String,
        trim:true
    },
    price:{
        type:String,
        required:[true,"Price is required."]
    },
    productImage:{
        type:String,
        required:[true,"Product image is required."]
    }
},{timestamps:true})

export const Product = mongoose.model("product",productSchema)