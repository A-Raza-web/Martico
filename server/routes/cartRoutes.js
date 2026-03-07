const express = require('express');
const router = express.Router();
const Cart = require('../models/cartModel');


// ================================
// Add To Cart
// ================================
router.post('/add', async (req, res) => {

    try {

        const {
            productId,
            userId,
            name,
            image,
            price,
            quantity
        } = req.body;

        const subtotal = price * quantity;

        const cartItem = new Cart({
            productId,
            userId,
            name,
            image,
            price,
            quantity,
            subtotal
        });

        await cartItem.save();

        res.json({
            success: true,
            message: "Product added to cart",
            data: cartItem
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

});


// ================================
// Get User Cart
// ================================
router.get('/user/:userId', async (req, res) => {

    try {

        const cartItems = await Cart.find({
            userId: req.params.userId
        });

        res.json({
            success: true,
            data: cartItems
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

});


// ================================
// Delete Cart Item
// ================================
router.delete('/delete/:id', async (req, res) => {

    try {

        await Cart.findByIdAndDelete(req.params.id);

        res.json({
            success: true,
            message: "Item removed from cart"
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

});


module.exports = router; 