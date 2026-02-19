import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';
import fs from 'fs';

dotenv.config();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

export const uploadToCloudinary = async (localFilePath, folder, resourceType = 'auto') => {
    try {
        if (!localFilePath) {
            console.log("File path not provided");
            return null;
        }

        // Build upload options
        const options = {
            folder: folder,
            resource_type: resourceType,
        };

        // Ensure raw files like PDFs are publicly accessible
        if (resourceType === 'raw') {
            options.access_mode = 'public';
        }

        // Upload the file to Cloudinary from local disk storage
        const result = await cloudinary.uploader.upload(localFilePath, options);

        console.log("File uploaded successfully to Cloudinary:", result.secure_url);
        
        // Delete the temporary file from local storage
        if (fs.existsSync(localFilePath)) {
            fs.unlinkSync(localFilePath);
            console.log("Temporary file deleted:", localFilePath);
        }
        
        return {
            url: result.secure_url,
            public_id: result.public_id
        };
    } catch (error) {
        console.error('Cloudinary upload error:', error);
        
        // Delete the temporary file even if upload fails
        if (fs.existsSync(localFilePath)) {
            fs.unlinkSync(localFilePath);
            console.log("Temporary file deleted after error:", localFilePath);
        }
        
        throw error;
    }
};


export const deleteFromCloudinary = async (publicId) => {
    try {
        await cloudinary.uploader.destroy(publicId);
    } catch (error) {
        console.error('Cloudinary delete error:', error);
        throw error;
    }
};

export default cloudinary;
