import express from 'express'
import {getAllProducts, addProducts} from '../controller/productController.js'

const userRouter = express()

userRouter.get('/products',getAllProducts)
userRouter.post('/products',addProducts)

export default userRouter