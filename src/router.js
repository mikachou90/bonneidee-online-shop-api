import { Router } from "express";
import Product from "./models/Product.js";
import middleware from "./middleware.js";

const router = Router();

router.get("/user", middleware.jwtCheck, async (req, res) => {
  res.send("Hello from user route!");
});

router.get("/product/:productId", async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.productId).exec();
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }
    return res.json(product);
  } catch (err) {
    next(err);
  }
});

router.get("/products", async (req, res) => {
  const product = new Product({
    name: "test",
  });

  await product.save();

  const products = await Product.find().exec();
  res.json(products);
});

export default router;
