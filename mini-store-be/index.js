import express from 'express'
import dotenv from "dotenv";
import userRouter from './routes/productRoutes.js';
import connectDB from './config/dbConfig.js';
import path from 'path';

//env config to import sensitive keys
dotenv.config();

const app = express()

const PORT = process.env.PORT || 3001

app.use(express.json());

// -------------set image upload static path to uploads folder---------------
app.use("/uploads", express.static(path.resolve("uploads")));

app.use('/', userRouter)

connectDB()

app.listen(PORT,()=>console.log(` server started at ${PORT}`))

