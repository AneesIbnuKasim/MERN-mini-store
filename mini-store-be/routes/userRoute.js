import express from 'express'
import {getProducts} from '../controller/userController.js'

const userRouter = express()

userRouter.get('/products',getProducts)

export default userRouter