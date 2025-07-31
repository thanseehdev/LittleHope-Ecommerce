const Product = require('../../models/productModel')

const getNewArrivals = async (req, res) => {
    try {
        const latestProducts = await Product.find().sort({ createdAt: -1 }).limit(10)
        res.status(200).json(latestProducts)
    } catch (error) {
        console.error("Error fetching latest products:", error);
        res.status(500).json({ message: "Server Error" });
    }
}


const productDetails = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id)
        if (!product) {
            return res.status(400).json({ message: "Product not found" })
        }
        const similarProducts = await Product.find({
            _id: { $ne: product._id },
            //category: product.category,
            gender: product.gender,
        }).limit(6)
        res.status(200).json({ product, similarProducts })

    } catch (error) {
        console.log('product detail' + error)
        res.status(500).json({ error: "Server Error" });
    }
}


const getAllProducts = async (req, res) => {

  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;

  try {
    const totalProducts = await Product.countDocuments();
    const products = await Product.find()
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit);

    const totalPages = Math.ceil(totalProducts / limit);

    res.status(200).json({
      products,
      totalPages,
      currentPage: page,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to fetch products", error: error.message });
  }
};



const searchResult = async (req, res) => {
    
    const query = (req.query.q || '').trim();

    try {
        const products = await Product.find({
            $or: [
                { name: { $regex: query, $options: 'i' } },
                { category: { $regex: query, $options: 'i' } },
                { gender: { $regex: query, $options: 'i' } },
                { description: { $regex: query, $options: 'i' } },
            ],
        });

        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: "Search failed" });
    }
}

module.exports = {
    getNewArrivals,
    productDetails,
    getAllProducts,
    searchResult,
    searchResult
}