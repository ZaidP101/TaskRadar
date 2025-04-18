import { v2 as cloudinary } from 'cloudinary';



    // Configuration
cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
    api_key: CLOUDINARY_API_KEY, 
    api_secret: CLOUDINARY_CLOUD_SECRET // Click 'View API Keys' above to copy your API secret
});