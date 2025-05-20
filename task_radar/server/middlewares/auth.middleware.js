import { ApiError } from "../utils/ApiErrors.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken"
import { User } from "../models/userMod.js";


export const verifyJWT = asyncHandler(async(req, res, next)=>{
    try {
        const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "").trim();
        if(!token){
            throw new ApiError(401, "Unauthorized request")
        }
    
        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
        const user = await User.findById(decodedToken?._id).select("-password -refreshToken")
    
        if(!user){
            throw new ApiError(401, "Invalid Access Token ")
        }
    
        // console.log("Decoded token:", decodedToken);
        // console.log("User found:", user);
        req.user = user;
        next()
        

    } catch (error) {
        throw new ApiError(400, error?.message || "Invalid Access Token ")
    }
})

export const verifyAdmin = (req, res, next) => {
    if (!req.user?.isAdmin) {
        throw new ApiError(403, "Forbidden: Admin access only");
    }
    next();
};