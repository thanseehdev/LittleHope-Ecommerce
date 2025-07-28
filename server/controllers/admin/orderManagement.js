const Order = require('../../models/orderModel')

const getAllOrder = async (req, res) => {
    console.log('inside getOrders');
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    try {
        const totalOrder = await Order.countDocuments()
        const order = await Order.find()
            .sort({ createdAt: -1 })
            .skip((page - 1) * limit)
            .limit(limit);
        const totalPages = Math.ceil(totalOrder / limit);
        if (order) {
            res.status(200).json({ order, totalPages })
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
}

const getOrderDetails = async (req, res) => {
    console.log('inside getOrderDetails');
    const { id } = req.params;

    try {
        const order = await Order.findById(id)
            .populate('user', 'name email') // customize fields as needed
            .populate('items.productId', 'name price images') // customize fields
            .populate('coupon', 'code discount'); // optional

        if (!order) {
            return res.status(404).json({ message: "Order not found" });
        }

        res.status(200).json(order);
    } catch (error) {
        console.error("Error fetching order details:", error);
        res.status(500).json({ message: "Server Error" });
    }
};

const updateOrderStatus = async (req, res) => {
    console.log('inside updateOrderStatus');

    const { orderId, Ostatus } = req.body
    try {
        const order = await Order.findById(orderId)
        order.status = Ostatus
        await order.save()
        res.status(200).json({ message: 'order status changed' })
    } catch (error) {
        console.error("update Order status failed:", error);
        res.status(500).json({ message: "Server Error" });
    }
}


module.exports = {
    getAllOrder,
    getOrderDetails,
    updateOrderStatus
}