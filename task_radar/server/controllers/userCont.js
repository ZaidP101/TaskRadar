import {asyncHandler} from "../utils/asyncHandler.js";
import { ApiError} from "../utils/ApiErrors.js";
import { User } from "../models/userMod.js";
import { uploadCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import multer from "multer";
import jwt from "jsonwebtoken"

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
   const {name, email, password, isAdmin} = req.body
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
    avatar: base64photo,
    isAdmin : isAdmin==="true"
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
   try {
      const { email, password } = req.body;
      console.log("Email:", email);
   
      if (!email || !password) {
      throw new ApiError(400, "Email and Password are required");
   }
   
   const user = await User.findOne({ email }).select("+password");

   
      if(!user){
         throw new ApiError(400, "User does not exist !!")
      }
   
      const isPasswordCorrect = await user.isPasswordCorrect(password);
   
      if(!isPasswordCorrect){
         throw new ApiError(400, "Incorrect Password!!")
      }
   
      const {accessToken, refreshToken} = await genAccAndRefTokens(user._id)
   
      const loggedinUser = await User.findById(user._id).select("-password -refreshToken").populate("assignProjects");
      // .populate("project");
   
      const Options ={
         httpOnly: true,
         secure: true
      }
   
      return res
  .status(200)
  .cookie("accessToken", accessToken, Options)
  .cookie("refreshToken", refreshToken, Options)
  .json(
    new ApiResponse(
      200,
      {
        user: {
          _id: loggedinUser._id,
          name: loggedinUser.name,
          email: loggedinUser.email,
          isAdmin: loggedinUser.isAdmin,
          project: loggedinUser.assignProjects?._id || null,
          status: loggedinUser.status || 'free', // default fallback
          avatar: loggedinUser.avatar || null,
        },
        accessToken,
        refreshToken,
      },
      "User logged in successfully!"
    )
  );

   } catch (error) {
      console.error("Login error:", error); // Log detailed error
    throw new ApiError(500, "Internal Server Error");
   }
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

const refreshAccesssToken = asyncHandler(async(req, res)=>{
   const incomingRefreshToken = req.cookies.refreshToken 
   || req.body.refreshToken

   if(!incomingRefreshToken){
      throw new ApiError(401, "Unauthorized request")
   }
   try {
      const decodedToken = jwt.verify(incomingRefreshToken, 
         process.env.REFRESH_TOKEN_SECRET
      )
      const user = await User.findById(decodedToken?._id)
      if(!user){
         throw new ApiError(401, "Invalid referesh token")
      }
      if(incomingRefreshToken !== user?.refreshToken){
         throw new ApiError(401, "refresh token is expired or user")
      }
      const Options = {
         httpOnly:true,
         secure:true
      }
      const {accessToken, newRefreshToken} = await genAccAndRefTokens(user._id)
      return res.status(200)
      .cookie("accessToken", accessToken, Options)
      .cookie("refreshToken", newRefreshToken, Options)
      .json(
         new ApiResponse(
            200,
            {accessToken, refreshToken: newRefreshToken},
            "Access Token refereshed"
         )
      )
   } catch (error) {
      throw new ApiError(401, error?.message 
         || "Invalid Refresh Token"
      )
   }
})

const changeCurrentPassword = asyncHandler(async(req, res)=>{
   const {oldPassword, newPassword} = req.body
   const user = await User.findById(req.user?._id)
   const isPasswordCorrect = await user.isPasswordCorrect(oldPassword)
   if(!isPasswordCorrect){
      throw new ApiError(400, "Invalid Password")
   }

   user.password = newPassword
   await user.save({ validateBeforeSave: false})
   return res
   .status(200)
   .json(new ApiResponse(200, {}, "Password changed succefully"))

})

const getCurrentUser = asyncHandler(async(req, res)=>{
   return res
   .status(200)
   .json(new ApiResponse(200, req.user, "current users fetched succefully"))
})

const updateAccountDetails = asyncHandler(async(req, res)=>{
   const {name, email, } = req.body
   if(!name || !email){
      throw new ApiError(400, "All feilds are required")
   }
   const user = await User.findByIdAndUpdate(req.user?._id,
      {
         $set:{
            name,
            email
         }
      },
      {new : true} 
   
   ).select("-password")
   return res.status(200)
   .json(200, user, "Account details updated successfullt")
   
})

const updateAvatar = asyncHandler(async (req, res) => {
   // Check for new avatar file
   const base64photo = req.file ? req.file.buffer.toString('base64') : null;
   if (!base64photo) {
     throw new ApiError(400, "New avatar file is required");
   }
 
   // Update user's avatar
   const updatedUser = await User.findByIdAndUpdate(
     req.user._id,
      { 
         $set:{avatar: base64photo}
      },
     { new: true }
   ).select("-password -refreshToken");
 
   if (!updatedUser) {
     throw new ApiError(404, "User not found");
   }
 
   return res.status(200).json(
     new ApiResponse(200, updatedUser, "Avatar updated successfully")
   );
});


 
export {
   registerUser,
   loginUser, 
   logoutUser,
   refreshAccesssToken,
   changeCurrentPassword,
   getCurrentUser,
   updateAccountDetails,
   updateAvatar,
};