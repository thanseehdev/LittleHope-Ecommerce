const Product = require('../../models/productModel')

const addProduct = async (req, res) => {
    try {
        console.log('inside addProduct')
        const { name, description, price, category, size, stock } = req.body;
        const imageUrls = req.files.map(file => file.path)
        console.log(`cloudinary url:${imageUrls}`)
        const product = new Product({
            name,
            description,
            price,
            category,
            size: size.split(","), // convert back to array
            stock,
            images: imageUrls,
        });
        const savedProduct = await product.save();
        console.log(`---savedProduct=${savedProduct}---`);
        
        res.status(200).json({ message: 'product added succesfully', savedProduct });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error", error: err.message });
    }
}

module.exports={
    addProduct
}