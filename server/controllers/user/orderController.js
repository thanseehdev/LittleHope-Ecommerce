const Order = require('../../models/orderModel')
const Coupon = require('../../models/couponModel')
const Cart = require('../../models/cartModel')
const Product = require('../../models/productModel')
const CouponUsage = require('../../models/couponUsageModel')


const createOrder = async (req, res) => {
    console.log('inside create order controller');

    const userId = req.user._id;
    const { items, coupon } = req.body;

    try {
        if (coupon) {
            const alreadyUsed = await CouponUsage.findOne({ user: userId, coupon });
            if (alreadyUsed) {
                return res.status(400).json({ message: 'Coupon already used' });
            }
        }

        // 2. Decrease stock (only if sufficient stock exists)
        for (const item of items) {
            const updatedProduct = await Product.findOneAndUpdate(
                {
                    _id: item.productId,
                    "sizeAndStock.size": item.size,
                    "sizeAndStock.stock": { $gte: item.quantity }
                },
                {
                    $inc: { "sizeAndStock.$.stock": -item.quantity }
                },
                { new: true }
            );

            if (!updatedProduct) {
                return res.status(400).json({
                    message: `Insufficient stock for product ${item.productId}, size ${item.size}`
                });
            }
        }

        const order = new Order({
            user: userId,
            ...req.body,
        });
        await order.save();

        await Cart.updateOne({ userId }, { $set: { items: [] } });

        if (coupon) {
            await CouponUsage.create({
                user: userId,
                coupon,
            });
        }

        res.status(200).json({ message: 'Order created successfully' });

    } catch (error) {
        console.error("Order Error:", error);
        res.status(500).json({ message: "Failed to place order." });
    }
}


const getUserOrders = async (req, res) => {
    console.log('inside getUserOrders');

    const userId = req.user._id
    try {
        const orders = await Order.find({ user: userId })
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

const cancellOrder = async (req, res) => {
    const orderId = req.params.id;

    try {
        const order = await Order.findById(orderId);

        if (!order) {
            return res.status(404).json({ message: "Order not found" });
        }

        if (order.status !== "pending") {
            return res.status(400).json({ message: "Only pending orders can be cancelled" });
        }

        order.status = "cancelled";
        await order.save();

        const restoreStockPromises = order.items.map(item => {
            return Product.updateOne(
                { _id: item.productId, "sizeAndStock.size": item.size },
                { $inc: { "sizeAndStock.$.stock": item.quantity } }
            );
        });
        await Promise.all(restoreStockPromises);


        if (order.coupon) {
            await CouponUsage.deleteOne({
                user: order.user,
                coupon: order.coupon,
            });
        }

        res.status(200).json({ message: "Order cancelled successfully" });

    } catch (error) {
        console.error("Cancel Order Error:", error);
        res.status(500).json({ message: "Failed to cancel order" });
    }
};



module.exports = {
    createOrder,
    getUserOrders,
    getSingleOrder,
    cancellOrder
}