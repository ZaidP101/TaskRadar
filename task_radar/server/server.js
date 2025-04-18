
import express from 'express';
import mongoose from 'mongoose';
import connectDB from './DB/indexDB.js';
import dotenv from "dotenv";

dotenv.config()

const app = express();
connectDB();

app.get('/', (req,res) =>{
    res.send("hello zaid ")
});

const port = process.env.PORT || 3000;

app.listen(port,()=>{
    console.log(`Server started at http://localhost:${port}`);
})

