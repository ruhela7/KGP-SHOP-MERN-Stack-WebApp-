import asyncHandler from 'express-async-handler'
import Order from '../models/orderModel.js'

//@desc create new order
//@route POST api/orders
//@access private
export const addOrderItems = asyncHandler(async (req, res) => {
    const { orderItems, shippingAddress, paymentMethod, itemsPrice, shippingPrice, taxPrice, totalPrice } = req.body

    if (orderItems && orderItems.length === 0) {
        res.status(400) //400 - bad request
        throw new Error("No order item")
        return
    } else {
        const order = new Order({
            orderItems,
            user: req.user._id,
            shippingAddress,
            paymentMethod,
            itemsPrice,
            shippingPrice,
            taxPrice,
            totalPrice
        })

        const createdOrder = await order.save()

        res.status(201).json(createdOrder)
    }
})

//@desc get order details by id
//@route GET api/orders/:id
//@access private
export const getOrderById = asyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id).populate('user', 'name email')

    if (order) {
        res.json(order)
    } else {
        res.status(404)
        throw new Error('Order Not Found')
    }
})

//@desc update order to paid
//@route PUT api/orders/:id/pay
//@access private
export const updateOrderToPaid = asyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id)

    if (order) {
        order.isPaid = true
        order.paidAt = Date.now()
        order.paymentResult = {
            id: req.body.id,
            status: req.body.status,
            update_time: req.body.update_time,
            emial_address: req.body.emial_address
        }

        const updatedOrder = await order.save();

        res.json(updatedOrder)

    } else {
        res.status(404)
        throw new Error('Order Not Found')
    }
})

//@desc update order to deleivered i.e. set deleivered true
//@route PUT api/orders/:id/pay/deleivered
//@access private/admin
export const updateOrderToDelivered = asyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id)

    if (order) {
        order.isDelivered = true
        order.deliveredAt = Date.now()

        const updatedOrder = await order.save();

        res.json(updatedOrder)

    } else {
        res.status(404)
        throw new Error('Order Not Found')
    }
})

//@desc get loggedin user orders
//@route PUT api/orders/myorders
//@access private
export const getMyOrder = asyncHandler(async (req, res) => {
    const orders = await Order.find({user: req.user._id})
    res.json(orders)
})

//@desc get all orders
//@route GET api/orders
//@access private/admin
export const getOrders = asyncHandler(async (req, res) => {
    const allOrders = await Order.find({}).populate('user', 'id name');
    res.json(allOrders)
})

