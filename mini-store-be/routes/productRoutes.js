import express from 'express'
import {getProducts, addProducts} from '../controller/productController.js'

const userRouter = express()

userRouter.get('/products',getProducts)
userRouter.post('/products',addProducts)

export default userRouter