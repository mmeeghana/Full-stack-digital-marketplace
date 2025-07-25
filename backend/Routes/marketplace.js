const express = require('express');
const {PublishedProducts,Product } = require("../db");
const { authMiddleware } = require("../middlewares/AuthMiddleware");
const router = express.Router();

router.post("/publish-product/:productId",authMiddleware, async (req, res) => {
    try {
        const userId = req.userId;
        const productId = req.params.productId;
        const user = await Product.findOne({ userId: userId });
        if (!user) {
            return res.status(404).json({ message: "user not found" });
        }
        const product = user.products.id(productId);
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }
        const publishedProduct = await PublishedProducts.create({
            productId: product._id,
            productOwner: userId,
            productName: product.productName,
            productDescription: product.productDescription,
            productThumbnail: product.productThumbnail,
            sales : product.sales,
            price: product.price,
        });
        product.published = true;
        await user.save();
        res.json({
            message: "Product published successfully",
            data: publishedProduct,
        });
    } catch (error) {
        console.error("Error Publishing Product:", error);
        res.status(500).json({
            error: "An error occurred while publishing the product",
        });
    }
});

router.get("/bulk", async (req, res) => {
    try {
        const products = await PublishedProducts.find({});
        if (!products) {
            return res.status(404).json({ message: "No products found" });
        }
        res.json({
            message: "Products Fetched successfully",
            data: products,
        });
    } catch (error) {
        console.error("Error fetching Products:", error);
        res.status(500).json({
            error: "An error occurred while fetching the tokens",
        });
    }
})


module.exports = router;