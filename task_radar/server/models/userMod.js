import mongoose from "mongoose";
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required"]
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    lowercase: true
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    minlength: 3,
    select: false
  },
  isAdmin: {
    type: Boolean,
    default: false
  },
  assignProjects: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Project',
    default: null
  }],

  status:{
    type: String,
    enum: ["free", "busy"],
    default:"free"
  },
  createdAt: {
    type: Date,
    default: Date.now
  }, 
  avatar:{
    type: String, //cloudinary
    required: true
  },
  refreshToken:{
    type: String
  }
});

userSchema.pre("save", async function(next) {
  if(!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10)
  next()
})

userSchema.methods.isPasswordCorrect = async function (password){
  return await bcrypt.compare(password, this.password)
}

userSchema.methods.generateAccessToken = function(){
  return jwt.sign(
    {
    _id: this._id,
    email: this.email,
    name: this.name,
    },
    process.env.ACCESS_TOKEN_SECRET,{
    expiresIn: process.env.ACCESS_TOKEN_EXPIRY
    }
  )
}
userSchema.methods.generateRefreshToken = function(){
  return jwt.sign(
    {
    _id:this._id,
    },
    process.env.REFRESH_TOKEN_SECRET,{
    expiresIn: process.env.REFRESH_TOKEN_EXPIRY
    }
  )
}

// Indexes
userSchema.index({ email: 1 });
userSchema.index({ isTeamLead: 1 });

export const User = mongoose.model('User', userSchema);
