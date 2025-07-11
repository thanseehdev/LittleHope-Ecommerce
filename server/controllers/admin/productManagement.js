const Product = require('../../models/productModel')

const addProduct = async (req, res) => {
    try {
        console.log('inside addProduct')
        const { name, description, price,discountPrice, category, size,gender, stock } = req.body;
        const imageUrls = req.files.map(file => file.path)
        const product = new Product({
            name,
            description,
            price,
            discountPrice,
            category,
            size,
            gender,
            stock,
            images: imageUrls,
        });
        const savedProduct = await product.save();
        console.log(`---savedProduct=${savedProduct}---`);

        res.status(200).json({ message: 'product added succesfully', savedProduct });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error"});
    }
}

const fetchAllProducts=async(req,res)=>{
    try {
        console.log('inside admin fetchAllProducts');
        
        const products=await Product.find()
        if(products){
            res.status(200).json({message:'product fetched successfull',products})
        }else{
            res.status(400).json({message:'product not found'})
        }
    } catch (error) {
        res.status(500).json({ message: "Server Error"});
    }
}
const getEditProduct=async(req,res)=>{
    try {
        console.log('inside get editProduct');
        
        const product=await Product.findById(req.params.id)
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }
        res.status(200).json(product)
    } catch (error) {
        console.error("Error getEditProduct product:", error);
        res.status(500).json({ message: "Server Error"});
    }
}

module.exports = {
    addProduct,
    fetchAllProducts,
    getEditProduct
}