import mongoose from "mongoose";
import {DB_NAME} from "../constants.js";

const connectDB = async () =>{
    try {
        const connectionInstence = await mongoose.connect(process.env.MONGODB_URL)
        console.log(`\n DB Connected Successfully. DB Host: ${connectionInstence.connection.host}`)
    } catch (error) {
        console.log("DB connection Error", error);
        process.exit(1)
    }
}

export default connectDB;