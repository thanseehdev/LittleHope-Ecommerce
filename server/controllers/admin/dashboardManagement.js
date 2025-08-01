const User = require('../../models/userModel');
const Order = require('../../models/orderModel');

const getDashData = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();

    const orders = await Order.find({ status: 'delivered' });
    const totalRevenue = orders.reduce((acc, curr) => acc + curr.pricingSummary.finalAmount, 0);
    const totalOrders = orders.length;

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);

    // Today's Orders (all)
    const todayOrders = await Order.find({
      createdAt: { $gte: today, $lt: tomorrow },
    });

    const startOfToday = new Date();
    startOfToday.setHours(0, 0, 0, 0);

    const endOfToday = new Date();
    endOfToday.setHours(23, 59, 59, 999);

    const todaySalesOrders = await Order.find({
      createdAt: { $gte: startOfToday, $lte: endOfToday },
      status: 'delivered',
    });

    const todayRevenue = todaySalesOrders.reduce(
      (sum, order) => sum + order.pricingSummary.finalAmount,
      0
    )
    

    // Category-based Orders
    const categoryOrders = await Order.aggregate([
      { $unwind: '$items' },
      {
        $lookup: {
          from: 'products',
          localField: 'items.productId',
          foreignField: '_id',
          as: 'productInfo',
        },
      },
      { $unwind: '$productInfo' },
      {
        $group: {
          _id: '$productInfo.category',
          orders: { $sum: '$items.quantity' },
        },
      },
    ]);

    // Gender-based Sales
    const genderSales = await Order.aggregate([
      { $unwind: '$items' },
      {
        $lookup: {
          from: 'products',
          localField: 'items.productId',
          foreignField: '_id',
          as: 'productInfo',
        },
      },
      { $unwind: '$productInfo' },
      {
        $group: {
          _id: '$productInfo.gender',
          value: { $sum: '$items.quantity' },
        },
      },
    ]);

    // Weekly User Signups
    const customerGrowth = await User.aggregate([
      {
        $group: {
          _id: {
            week: { $week: '$createdAt' },
            year: { $year: '$createdAt' },
          },
          users: { $sum: 1 },
        },
      },
      { $sort: { '_id.year': 1, '_id.week': 1 } },
    ]);

    // Best-Selling Products
    const bestSellingProducts = await Order.aggregate([
      { $unwind: '$items' },
      {
        $group: {
          _id: '$items.productId',
          unitsSold: { $sum: '$items.quantity' },
          revenue: { $sum: '$items.discountPriceAtPurchase' },
        },
      },
      { $sort: { unitsSold: -1 } },
      { $limit: 10 },
      {
        $lookup: {
          from: 'products',
          localField: '_id',
          foreignField: '_id',
          as: 'productInfo',
        },
      },
      { $unwind: '$productInfo' },
      {
        $project: {
          id: '$_id',
          name: '$productInfo.name',
          category: '$productInfo.category',
          images: '$productInfo.images',
          unitsSold: 1,
          revenue: 1,
        },
      },
    ]);

    res.json({
      totalRevenue,
      totalOrders,
      todayOrders: todayOrders.length,
      todayRevenue,
      totalUsers,
      categoryOrders,
      genderSales,
      customerGrowth,
      bestSellingProducts,
    });
  } catch (error) {
    console.log('dash Error:' + error);
    return res.status(500).json({ message: 'dashboard data fetch failed' });
  }
};

module.exports = {
  getDashData,
};

