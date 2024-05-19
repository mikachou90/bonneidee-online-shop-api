import Product from "../../models/Product.js";

const getProduct = async (req, res, next) => {
  try {
    const productId = req.params.productId;
    const product = await Product.findById(productId).exec();
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }
    return res.json(product);
  } catch (err) {
    next(err);
  }
};

export default getProduct;

/**
 * @swagger
 * /products/{productId}:
 *   get:
 *     summary: Get product
 *     description: get product data
 *     responses:
 *       200:
 *         description: Returns product.
 */
