import express from 'express'
import dotenv from "dotenv";
import userRouter from './routes/userRoute.js';
import connectDB from './config/dbConfig.js';

//env config to import sensitive keys
dotenv.config();

const app = express()

const PORT = process.env.PORT || 3001

app.use(express.json());

app.use('/', userRouter)

connectDB()

app.listen(PORT,()=>console.log(` server started at ${PORT}`))

