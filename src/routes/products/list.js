import Product from "../../models/Product.js";

const list = async (req, res, next) => {
  try {
    const products = await Product.find().exec();
    res.json(products);
  } catch (err) {
    next(err);
  }
};

export default list;

/**
 * @swagger
 * /products:
 *   get:
 *     summary: List products
 *     description: get products list
 *     tags: [Products]
 *     responses:
 *       200:
 *         description: Returns product.
 */
