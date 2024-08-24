import dotenv from 'dotenv';
dotenv.config();

import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

// Configure Cloudinary
cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_API_SECRET 
});

const uploadOnCloudinary = async (localFilePath) => {
    try {
        if (!localFilePath) return null;

        // Upload the file to Cloudinary
        const response = await cloudinary.uploader.upload(localFilePath, { resource_type: "auto" });
        console.log("File uploaded on Cloudinary:", response.url);

        // Remove the local file after successful upload
        fs.unlinkSync(localFilePath);

        return response;
    } catch (error) {
        // If upload fails, remove the local file and handle the error
        fs.unlink(localFilePath, (err) => {
            if (err) console.error("Failed to remove file:", err);
        });
        console.error("Cloudinary upload failed:", error);
        return null;
    }
};

export { uploadOnCloudinary };
