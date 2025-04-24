import {asyncHandler} from "../utils/asyncHandler.js";
import { ApiError} from "../utils/ApiErrors.js";
import { User } from "../models/userMod.js";
import { uploadCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import multer from "multer";

const genAccAndRefTokens = async(userId)=>{
   try {
      const user = await User.findById(userId)
      const accessToken  = user.generateAccessToken()
      const refreshToken = user.generateRefreshToken()

      user.refreshToken = refreshToken
      await user.save({validateBeforeSave: false})

      return{accessToken, refreshToken}
   }catch (error) {
      throw new ApiError(500, "Something went wrong at Referesh and Access Token")
   }
}


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
   console.log(req.file);


   
   // const upload = multer({storage})
   const base64photo = req.file ? req.file.buffer.toString('base64'):null;
   if(!base64photo){
      throw new ApiError(400, "Avatar file is required")
   }

  
   // const avatarLocalPath = req.file ? req.file.path: null;
   // if(!avatarLocalPath){
   //  throw new ApiError(400, "Avatar file is required")
   // }

   //upload on cloudinary
   // const avatar = await uploadCloudinary(avatarLocalPath)

   // if(!avatar){
   //  throw new ApiError(400, "Avatar file is required")
   // }

   // dataBase entry
   const user = await User.create({
    name: name.toLowerCase(),
    email,
    password,
    avatar: base64photo
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
});
const loginUser = asyncHandler(async(req, res)=>{
   const {name, email, password} = req.body

   if(!name || !email){
      throw new ApiError(400, "User Name or Email is required")
   }
   const user = await User.findOne({
      $or: [{email}, {name}]
   });
   if(!user){
      throw new ApiError(400, "User does not exist !!")
   }

   const isPasswordValid = await user.isPasswordCorrect(password);

   if(!isPasswordCorrect){
      throw new ApiError(400, "Incorrect Password!!")
   }

   const {accessToken, refreshToken} = await genAccAndRefTokens(user._id)

   const loggedinUser = await User.findById(user._id).select("-password -refreshToken")

   const Option ={
      httpOnly: true,
      secure: true
   }

   return res.status(200)
   .cookie("accessToken", accessToken, Options)
   .cookie("refreshToken", refreshToken, Options)
   .json(
      new ApiResponse(
         200, {
            user: loggedinUser, accessToken, refreshToken
         },
         "user Logged in Successfully !!"
      )
   )
});
const logoutUser = asyncHandler(async(req,res)=>{
   await User.findByIdAndUpdate(
      req.user._id,{
         $set: {
            refreshToken: undefined
         }
      },
      {
         new: true
      }
   )

   const Options ={
      httpOnly: true,
      secure: true
   }

   return res.status(200)
   .clearCookie("accessToken", Options)
   .clearCookie("refreshToken", Options)
   .json(new ApiResponse(200, {},"User Logged Out"))
})

export {registerUser, loginUser, logoutUser};