import express from 'express'
import dotenv from "dotenv";
import userRouter from './routes/productRoutes.js';
import connectDB from './config/dbConfig.js';
import path from 'path';
import cors from 'cors';

//env config to import sensitive keys
dotenv.config();

const app = express()

const PORT = process.env.PORT || 3001

//cors for cross platform connection
app.use(cors());

app.use(express.json());

// -------------set image upload static path to uploads folder---------------
app.use("/uploads", express.static("uploads"));

app.use('/', userRouter)

connectDB()

app.listen(PORT,()=>console.log(` server started at ${PORT}`))

