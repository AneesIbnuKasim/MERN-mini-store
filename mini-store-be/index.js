import express from 'express'
import dotenv from "dotenv";

//env config to import sensitive keys
dotenv.config();

const app = express()

const PORT = process.env.PORT || 3001

app.use(express.json());

app.get('/',(req,res)=>{
        res.send('hi')
})

app.listen(PORT,()=>console.log(` server started at ${PORT}`))