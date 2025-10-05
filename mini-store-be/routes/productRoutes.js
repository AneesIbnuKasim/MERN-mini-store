import express from 'express'
import {getAllProducts, addProducts} from '../controller/productController.js'
import upload from '../config/multer.js'

const userRouter = express()

userRouter.get('/products',getAllProducts)
userRouter.post('/products',upload.single('images'),addProducts)

export default userRouter