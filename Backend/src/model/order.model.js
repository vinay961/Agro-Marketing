import mongoose,{Schema} from 'mongoose'

const orderSchema = new Schema({
    product:{
        type:String,
        required:true
    },
    seller:{
        type:String,
        required:true
    },
    user:{
        type:Schema.Types.ObjectId,
        ref:"Users"
    }
},{timestamps:true})

export const Order = mongoose.model("order",orderSchema);