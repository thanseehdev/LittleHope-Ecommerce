const Order=require('../../models/orderModel')

const getAllOrder=async(req,res)=>{
    console.log('inside getOrders');
    
    try {
        const order=await Order.find()
        if(order){
            res.status(200).json(order)
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


module.exports={
    getAllOrder,
    getOrderDetails
}