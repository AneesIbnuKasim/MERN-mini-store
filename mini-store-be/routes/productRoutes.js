import express from 'express'
import {getAllProducts, addProducts, getSuggestion} from '../controller/productController.js'
import upload from '../config/multer.js'

const productRouter = express()

productRouter.get('/',getAllProducts)
productRouter.post('/',upload.single('images'),addProducts)
productRouter.get('/suggestion', getSuggestion)

export default productRouter