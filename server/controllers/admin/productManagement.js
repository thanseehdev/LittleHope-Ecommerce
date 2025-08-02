const Product = require('../../models/productModel')

const addProduct = async (req, res) => {
  try {

    const {
      name,
      description,
      price,
      discountPrice,
      category,
      gender,
      sizeAndStock: rawSizeAndStock, // <-- Make sure 'sizeAndStock' is sent from frontend
    } = req.body;

    let sizeAndStock;

    try {
      // Parse sizeAndStock based on format
      if (Array.isArray(rawSizeAndStock)) {
        sizeAndStock = rawSizeAndStock.map(item =>
          typeof item === 'string' ? JSON.parse(item) : item
        );
      } else if (typeof rawSizeAndStock === 'string') {
        sizeAndStock = [JSON.parse(rawSizeAndStock)];
      } else if (typeof rawSizeAndStock === 'object') {
        sizeAndStock = [rawSizeAndStock];
      } else {
        throw new Error('Invalid format');
      }
    } catch (err) {
      console.log('parse error: ' + err);
      return res.status(400).json({ message: "Invalid sizeAndStock format" });
    }

    const imageUrls = req.files.map(file => file.path);

    const product = new Product({
      name,
      description,
      price,
      discountPrice,
      category,
      gender,
      sizeAndStock,
      images: imageUrls,
    });

    const savedProduct = await product.save();

    res.status(200).json({ message: 'Product added successfully', savedProduct });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};



const fetchAllProducts=async(req,res)=>{

         const page = parseInt(req.query.page) || 1;
         const limit = parseInt(req.query.limit) || 10;
    try { 
        const totalProducts=await Product.countDocuments()
        const products=await Product.find().skip((page - 1) * limit).limit(limit)
        const totalPages = Math.ceil(totalProducts / limit)
        if(products){
            res.status(200).json({message:'product fetched successfull',products,totalPages})
        }else{
            res.status(400).json({message:'product not found'})
        }
    } catch (error) {
        res.status(500).json({ message: "Server Error"});
    }
}
const getEditProduct=async(req,res)=>{
    try {
        
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
const updateProduct = async (req, res) => {
  try {
    const { name, description, price, discountPrice, category, gender } = req.body;
    let sizeAndStock = [];

    if (req.body.sizeAndStock) {
      sizeAndStock = JSON.parse(req.body.sizeAndStock);
    }

    const productId = req.params.id;
    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ message: "Product not found" });

    product.name = name || product.name;
    product.description = description || product.description;
    product.price = price || product.price;
    product.discountPrice = discountPrice || product.discountPrice;
    product.category = category || product.category;
    product.gender = gender || product.gender;
    product.sizeAndStock = sizeAndStock.length ? sizeAndStock : product.sizeAndStock;

    if (req.files && req.files.length > 0) {
      product.images = req.files.map(file => file.path);
    }

    await product.save();

    res.status(200).json({ message: "Product updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};


module.exports = {
    addProduct,
    fetchAllProducts,
    getEditProduct,
    updateProduct
}