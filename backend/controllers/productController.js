import asyncHandler from 'express-async-handler'
import Product from '../models/productModel.js'


// @desc Fetch All products
// @route GET /api/products
// @access Public
export const getProducts = asyncHandler(async (req, res) => {
    const products = await Product.find({})

    res.send(products)

})


// @desc Fetch a single Product
// @route GET /api/products/:id
// @access Public
export const getProductsByID = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id)
    if(!product){
        res.status(404)
        throw new Error('Product not found')
    }
    res.send(product)

})