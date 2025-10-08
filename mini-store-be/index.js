import express from 'express'
import dotenv from "dotenv";
import productRouter from './routes/productRoutes.js';
import connectDB from './config/dbConfig.js';
import cors from 'cors';

//env config to import sensitive keys
dotenv.config();

const app = express()

const PORT = process.env.PORT || 3001

//cors for cross platform connection
app.use(cors({
  origin: ["https://suqq.netlify.app",
    "http://localhost:5173"
  ], 
  
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
}));

app.use(express.json());

// -------------set image upload static path to uploads folder---------------
app.use("/uploads", express.static("uploads"));

app.use('/api/products', productRouter)

connectDB()

app.listen(PORT,()=>console.log(` server started at ${PORT}`))

