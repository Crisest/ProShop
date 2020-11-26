import e from 'express'
import asyncHandler from 'express-async-handler'
import Order from '../models/orderModel.js'


// @desc Create new Order
// @route POST /api/orders
// @access Private
export const addOrderItems = asyncHandler(async (req, res) => {
    const { orderItems, 
        shippingAddress, 
        paymentMethod, 
        itemsPrice, 
        taxPrice, 
        shippingPrice, 
        totalPrice } = req.body 

    if(orderItems && orderItems.lenght === 0){
        res.status(400)
        throw new Error('no order items')
        return
    }
    else{
        const order = new Order({
            orderItems, 
            user: req.user._id,
            shippingAddress, 
            paymentMethod,
            itemsPrice, 
            taxPrice, 
            shippingPrice, 
            totalPrice
        })

        const createdOrder = await order.save()

        res.status(201).json(createdOrder)
    }

})


