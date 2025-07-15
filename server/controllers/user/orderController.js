const Order = require('../../models/orderModel')
const Coupon = require('../../models/couponModel')
const Cart = require('../../models/cartModel')


const createOrder = async (req, res) => {
    console.log('inside create order controller');

    const userId = req.user._id
    try {
        const order = new Order({
            user: userId,
            ...req.body,
        })
        await Cart.updateOne({ userId }, { $set: { items: [] } })
        await order.save()

        res.status(200).json({ message: 'order created successfull' })
    } catch (error) {
        console.error("Order Error:", error);
        res.status(500).json({ message: "Failed to place order." });
    }
}

const getUserOrders = async (req, res) => {
    console.log('inside getUserOrders');

    const userId = req.user._id; // assuming you're using a middleware that sets req.user

    try {
        const orders = await Order.find({ user: userId })
            .populate('address')
            .populate('items.productId', 'name price')
            .populate('coupon', 'code discount')
            .sort({ createdAt: -1 });

        res.status(200).json(orders);
    } catch (error) {
        console.error("Error fetching user orders:", error);
        res.status(500).json({ message: "Failed to fetch user orders." });
    }
};

const getSingleOrder = async (req, res) => {
    console.log('inside getSingleOrder')
    const orderId = req.params.id;

    try {
        const order = await Order.findById(orderId)
            .populate('user', 'name email')
            .populate('address')
            .populate({
    path: "items.productId",
    select: "name images"
  })
            .populate('coupon', 'code discount');

        if (!order) {
            return res.status(404).json({ message: "Order not found" });
        }

        res.status(200).json(order);
    } catch (error) {
        console.error("Error fetching order:", error);
        res.status(500).json({ message: "Failed to fetch orderDetail." });
    }
}



module.exports = {
    createOrder,
    getUserOrders,
    getSingleOrder
}