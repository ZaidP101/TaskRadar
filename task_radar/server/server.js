
import express from 'express';
import mongoose from 'mongoose';
import connectDB from './DB/indexDB.js';
import dotenv from "dotenv";
import { app } from './App.js';
import path from "path";

dotenv.config({ path: path.resolve("../.env") });


connectDB();

app.get('/', (req,res) =>{
    res.send("hello zaid ")
});

app.get('/health', (req, res) => {    // added for docker-copose.yml
  res.status(200).json({ status: 'ok' });
}); 


const port = process.env.PORT || 5000;

app.listen(port,'0.0.0.0', ()=>{
    console.log(`Server started at http://localhost:${port}`);
})

