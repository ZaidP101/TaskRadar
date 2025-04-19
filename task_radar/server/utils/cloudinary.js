import { v2 as cloudinary } from 'cloudinary';
import fs from "fs"
import { response } from 'express';



    // Configuration
cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
    api_key: CLOUDINARY_API_KEY, 
    api_secret: CLOUDINARY_CLOUD_SECRET // Click 'View API Keys' above to copy your API secret
});

// Upload an image
const uploadCloudinary = async(localFilePath) =>{
    try {
        if(!localFilePath) return null
        cloudinary.uploader.upload(localFilePath,{
            resource_type: "auto"
        })
        console.log("file uploaded", response.url);
    } catch (error) {
        FileSystem.unlinkSync(localFilePath)
        return null
    }
}

export{uploadCloudinary}