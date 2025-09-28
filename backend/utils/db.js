import mongoose from "mongoose";
import dotenv from "dotenv"


dotenv.config()


const connectDB=async()=>{
    try {
        const conn=await mongoose.connect(process.env.MONGO_URI);
        if(conn){
            console.log("mongodb connected");
        }
    } catch (error) {
        console.log(error);
    }
}

export default connectDB;

