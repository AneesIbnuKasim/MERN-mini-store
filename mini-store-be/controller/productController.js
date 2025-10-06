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
    res.json(error.message);
   }

}

//function to show all products
const getAllProducts = async(req, res)=>{

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
        try {
            // destructure query params from req.query
            const {category, minPrice, maxPrice, rating, search, sort, page, limit} = req.query
            console.log('price',typeof minPrice);
            

            //empty filter object
            const filter = {}

            //filter logic
            if(category) filter.category = category
            if(minPrice||maxPrice) {
                if(minPrice&&maxPrice) {
                filter.price = {$gte:Number(minPrice),$lte:Number(maxPrice)}
            }
                else if(minPrice) filter.price = {$gte:Number(minPrice)}
                else if(maxPrice) filter.price ={$lte:Number(maxPrice)}
            }
            
            if(rating) filter.rating = {$lte:Number(rating)}
            console.log('filter',filter);

            // search logic
            if(search) filter.title = {$regex:search,$options:'i'}

            //sort logic
            const sortObj = {}
            if(sort) {
                sort.startsWith('-') ? sortObj[sort.slice(1)] = -1 : sortObj[sort] = 1
            }

            //handle pagination
            const currentPage = page || 1
            const productPerPage = limit || 6
            const skipValue = (currentPage-1)*productPerPage

            //db query with all combined filter and sort
            const data = await Product.find(filter).skip(skipValue).limit(productPerPage).sort(sortObj)

            res.json(data)
            
        } catch (error) {
            res.json(error.message)
        }
}


export {
    getAllProducts,
    addProducts
}