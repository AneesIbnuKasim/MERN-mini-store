import express from 'express'
import dotenv from "dotenv";
import productRouter from './routes/productRoutes.js';
import connectDB from './config/dbConfig.js';
import cors from 'cors';

//env config to import sensitive keys
dotenv.config();

const app = express()




//change environment on env file to switch between prod or dev
const FRONTEND_URL = process.env.NODE_ENV == 'production' ? process.env.FRONTEND_URL_PROD : process.env.FRONTEND_URL_DEV

const PORT = process.env.PORT || 3001
console.log('frnt',FRONTEND_URL)
//cors for cross platform connection
app.use(cors({
  origin: [FRONTEND_URL], 
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
}));

app.use(express.json());

// -------------set image upload static path to uploads folder---------------
app.use("/uploads", express.static("uploads"));

app.use('/api/products', productRouter)

connectDB()

app.listen(PORT,()=>console.log(` server started at ${PORT}`))

