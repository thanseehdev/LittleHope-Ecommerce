const Cart = require('../../models/cartModel')
const Product=require('../../models/productModel')


const addToCart = async (req, res) => {

    console.log('inside addToCart controller');

    const userId = req.user._id
    const { productId, quantity, size } = req.body;

    if (!productId || !quantity) {
        return res.status(400).json({ message: "Product and quantity are required." });
    }

    try {
        let cart = await Cart.findOne({ userId });

        if (!cart) {
            cart = new Cart({
                userId,
                items: [{ productId, quantity, size }],
            });
        } else {
            const existingItem = cart.items.find((item) => item.productId.toString() === productId && item.size === size)

            if (existingItem) {
                return res.status(200).json({ message: 'product already in cart' })
            } else {
                cart.items.push({ productId, quantity, size });
            }
        }
        await cart.save();

        res.status(200).json({ message: 'product added to cart successfully' });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
}

const getCartItems = async (req, res) => {
    console.log('inside get cart item');

    try {
        const userId = req.user._id;
        const cart = await Cart.findOne({ userId }).populate('items.productId'); // Assuming productId is a ref

        if (!cart || cart.items.length === 0) {
            return res.status(200).json({ items: [], message: 'cart is empty' });
        }
        res.status(200).json({ items: cart.items });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
}

const updateQuantity = async (req, res) => {
    console.log('>>>>inside update Quantity');

    const { productId, size, quantity } = req.body;

    try {
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        const sizeVariant = product.sizeAndStock.find(
            (s) => s.size.toString() === size.toString()
        );

        if (!sizeVariant) {
            return res.status(404).json({ message: 'Size not available for this product' });
        }

        if (quantity > sizeVariant.stock) {
            return res.status(400).json({
                message: `Requested quantity exceeds available stock. Available: ${sizeVariant.stock}`,
            });
        }

    
        const cartItem = await Cart.findOne({ userId: req.user._id });
        if (!cartItem) {
            return res.status(404).json({ message: 'Cart not found' });
        }

        const itemIndex = cartItem.items.findIndex(
            (item) =>
                item.productId.toString() === productId &&
                item.size.toString() === size.toString()
        )

        if (itemIndex === -1) {
            return res.status(404).json({ message: 'Item not found in cart' });
        }

        cartItem.items[itemIndex].quantity = quantity;
        await cartItem.save();

        return res.status(200).json({ message: 'quantity updated' });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
}


const removeFromCart = async (req, res) => {
    const { productId, size } = req.body
    const userId = req.user._id
    console.log('inside remove from cart')
  try {
    if (!productId || !size) {
      return res.status(400).json({ message: "Product ID and size are required." });
    }

    const cart = await Cart.findOne({ userId });

    if (!cart) {
      return res.status(404).json({ message: "Cart not found." });
    }

    // Filter out the item matching both productId and size
    const updatedItems = cart.items.filter(
      (item) => !(item.productId.equals(productId) && item.size === size)
    );

    if (updatedItems.length === cart.items.length) {
      return res.status(404).json({ message: "Item not found in cart." });
    }

    cart.items = updatedItems;
    await cart.save();

    res.status(200).json({ message: "Item removed from cart." });
  } catch (error) {
    console.error("Error removing item from cart:", error);
    res.status(500).json({ message: "Server error." });
  }
};



module.exports = {
    addToCart,
    getCartItems,
    updateQuantity,
    removeFromCart
}