const Wishlist=require('../../models/wishlistModel')
const Product=require('../../models/productModel')

const addToWishlist = async (req, res) => {
  console.log('inside addToWIsh contorller');
  const userId = req.user._id;
  const productId = req.params.id;
  console.log(`productId:`, productId);

  try {
    let wishlist = await Wishlist.findOne({ user: userId });

    if (!wishlist) {
      wishlist = new Wishlist({ user: userId, products: [] });
    }

    // Optional: Clean up invalid entries
    wishlist.products = wishlist.products.filter(p => p && p.product);

    const alreadyExists = wishlist.products.some(p =>
      p && p.product && p.product.toString() === productId
    );

    if (!alreadyExists) {
      wishlist.products.push({ product: productId }); // ✅ Correct structure
      await wishlist.save();
    }

    res.status(200).json({ success: true, message: 'Added to wishlist'});
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: 'Server Error', error: error.message });
  }
};



const removeFromWish = async (req, res) => {
  console.log('inside removeFromWish controller');

  const userId = req.user._id;
  const { productId } = req.params;

  try {
    const wishlist = await Wishlist.findOne({ user: userId });

    if (!wishlist) {
      return res.status(404).json({ success: false, message: 'Wishlist not found' });
    }

    wishlist.products = wishlist.products.filter(
      (item) => item.product.toString() !== productId
    );

    await wishlist.save();

    res.status(200).json({ success: true, message: 'Removed from wishlist' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server Error', error: error.message });
  }
};


const getWishItem=async(req,res)=>{
    console.log('inside getWish contorller');
    const userId=req.user._id
    try {
    const wishlist = await Wishlist.findOne({ user: userId }).populate('products.product');

    if (!wishlist) {
      return res.status(200).json({ success: true, wishlist: [] });
    }

    res.status(200).json(wishlist);
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server Error', error: error.message });
  }
}

module.exports={
    addToWishlist,
    removeFromWish,
    getWishItem
}