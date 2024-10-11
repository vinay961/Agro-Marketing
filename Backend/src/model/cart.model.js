import mongoose,{Schema} from 'mongoose';

const cartItem = new Schema({
    userId:{
        type:Schema.Types.ObjectId,
        ref:'User'
    },
    cartItems:[
        {
            productId:{
                type:Schema.Types.ObjectId,
                ref:'Product'
            },
            quantity:{
                type:String,
                required:true,
                default:'1'
            }
        }
    ]
})

export const Cart = mongoose.model('cart',cartItem);
