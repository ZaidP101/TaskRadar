import {asyncHandler} from "../utils/asyncHandler.js";
import { ApiError} from "../utils/ApiErrors.js";
import { User } from "../models/userMod.js";
import { uploadCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";


const registerUser = asyncHandler(async (req, res)=>{
   const {name, email, password} = req.body
   console.log(name, "\n", email, "\n",  password,);

   if(
    [name, email, password].some((field)=>
    field==="") // if any filed is blank 
   ){
    throw new ApiError(400, "All fields are Required")
   }

   // Existing User Check
   const existingUser = await User.findOne({
    $or: [{name},{email}]
   })

   if(existingUser){
    throw new ApiError(400, "User name or Email already exist")
   }

   const avatarLocalPath = req.file?.avatar?.path;
   if(!avatarLocalPath){
    throw new ApiError(400, "Avatar file is required")
   }

   //upload on cloudinary
   const avatar = await uploadCloudinary(avatarLocalPath)

   if(!avatar){
    throw new ApiError(400, "Avatar file is required")
   }

   // dataBase entry
   const user = await User.create({
    name: name.toLowerCase(),
    avatar: avatar.url,
    email,
    password
   })

   const createdUser = await User.findById(user._id).select(
    "-password"
   )

   if(!createdUser){
    throw new ApiError(500, "Something went wrong while Registaration")
   }

   return res.status(201).json(
    new ApiResponse(200, createdUser, "User Registered Successfully")
   )
})

export {registerUser}