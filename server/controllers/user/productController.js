const Product=require('../../models/productModel')

const getNewArrivals =async(req,res)=>{
    try {
       const latestProducts=await Product.find().sort({createdAt:-1}).limit(10)
       res.status(200).json(latestProducts) 
    } catch (error) {
        console.error("Error fetching latest products:", error);
        res.status(500).json({ message: "Server Error" });
    }
}
const productDetails=async(req,res)=>{
    try {
        const product=await Product.findById(req.params.id)
        if (!product){
            return res.status(400).json({ message: "Product not found" })
        }
        res.status(200).json(product)

    } catch (error) {
        console.log('product detail'+error)
        res.status(500).json({ error:"Server Error" });
    }
}
const getAllProducts=async(req,res)=>{
    console.log('inside getAllproduct controller');
    
    try {
        const products=await Product.find()
        res.status(200).json(products)
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch products", error: error.message });
    }
}

module.exports={
    getNewArrivals,
    productDetails,
    getAllProducts
}