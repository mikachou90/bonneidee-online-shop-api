import Product from "../../models/Product.js";

const deleteProduct = async (req, res, next) => {
  try {
    const productId = req.params.productId;
    const product = await Product.findById(productId).exec();
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }
    await product.remove();
    res.send({ message: "Product deleted" });
  } catch (err) {
    next(err);
  }
};

export default deleteProduct;

/**
 * @swagger
 * /products/{productId}:
 *   delete:
 *     summary: Delete product
 *     security:
 *      - bearerAuth: []
 *     description: Delete product
 *     tags: [Admin]
 *     responses:
 *       200:
 *         description:
 */
