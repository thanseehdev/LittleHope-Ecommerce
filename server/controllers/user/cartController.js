const Cart = require('../../models/cartModel')


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
            const existingItem = cart.items.find(
                (item) => item.productId.toString() === productId
            );

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
        const cartItem = await Cart.findOne({
             userId:req.user._id,
            'items.productId': productId,
            'items.size': size,
        });

        if (!cartItem) return res.status(404).json({ message: 'Cart item not found' });

        const itemIndex = cartItem.items.findIndex(
            (item) => item.productId.toString() === productId && item.size === size
        );

        if (itemIndex >= 0) {
            cartItem.items[itemIndex].quantity = quantity;
            await cartItem.save();
            return res.status(200).json({ message: 'Cart updated successfully'});
        }

        res.status(404).json({ message: 'Item not found in cart' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
}



module.exports = {
    addToCart,
    getCartItems,
    updateQuantity
}