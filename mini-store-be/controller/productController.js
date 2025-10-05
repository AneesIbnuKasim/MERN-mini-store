import express from 'express'
import Product from '../Model/productModel.js'

// add products to mongodb
const addProducts = async(req, res)=>{
    const { title,description,category,price,rating,brand} = req.body
   try {
         const product = new Product({
        title,
        description,
        category,
        price,
        rating,
        brand,
        images: req.file? [`/uploads/products/${req.file.filename}`] : []
    })
    await product.save()
    res.json({message:'Product Uploaded Successfully'})
   } catch (error) {
    console.log(error.message);
    
   }

}

//function to show all products
const getProducts = async(req, res)=>{

    // --------------------------made to save 20 dummy products to database using fetch--------------

        // const response = await fetch('https://dummyjson.com/products')
        // const data = await response.json()
        // const products = data.products
        // const product = products.slice(0,20)
        
        // await Promise.all(
        //     product.map(async(item)=>{
        //     const {title,description,category,price,rating,brand, images} = item
        //     const prod = new Product({
        //         title,
        //         description,
        //         category,
        //         price,
        //         rating,
        //         brand,
        //         images
        // })
        // await prod.save()
        // })
        // )
        
        
}


export {
    getProducts,
    addProducts
}