import mongoose,{Schema} from "mongoose";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

const userSchema = new Schema({
    name:{
        type:String,
        required:[true,"Name is required."],
        lowercase:true,
        trim:true,
        index:true
    },
    email:{
        type:String,
        unique:true,
        trim:true,
        required:[true,"Email is required."]
    },
    password:{
        type:String,
        required:[true,"password is required."]
    },
    role:{
        type:String,
        required:true
    },
    accessToken:{
        type:String
    }
},{timestamps:true})

// password bcrypt method
userSchema.pre("save",async function(next){
    if(!this.isModified("password")){
        return next;
    }
    this.password = await bcrypt.hash(this.password,10);
    next();
})

// password checker
userSchema.methods.isPasswordCorrect = async function(password){
    return bcrypt.compare(password,this.password)
}

// jwt token generator
userSchema.methods.generateToken = function(){
    return jwt.sign(
        {
            _id:this._id,
            email:this.email,
            role:this.role
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn:'1h'
        }
    )
}


export const User = mongoose.model("user",userSchema)