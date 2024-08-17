import mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config()

const connectDB = async () => {
    try {
        const connection = mongoose.connect(process.env.MONGO_URI,{dbName:process.env.DB_NAME});
        console.log(`\n MongoDB connected !! DB HOST: ${connection.host}`);

    } catch (error) {
        console.log(error);
        console.log('DB connection failed.');
        process.exit(1)
    }
}

export default connectDB