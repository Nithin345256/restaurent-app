import mongoose from "mongoose";

const userScheama=new mongoose.Schema({
    FirstName:{
        type:String,
        required:true
    },
    SecondName:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    phonenumber:{
        type:Number,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
    },
    role:{
        type:String,
        enum:["user","hotel"],
        required:true
    },
    createdAt:{
        type:Date,
        default:Date.now
    },
    otp: { type: String },
  otpExpires: { type: Date },
})

const User=mongoose.model("User",userScheama);

export default User