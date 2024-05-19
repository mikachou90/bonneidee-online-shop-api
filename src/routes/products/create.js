import Product from "../../models/Product.js";

const create = async (req, res, next) => {
  try {
    const { name, description, picture, price, category, colors } = req.body;

    const newProduct = new Product({
      name,
      description,
      picture,
      price,
      category,
      colors,
    });
    await newProduct.save();
    res.send(newProduct);
  } catch (err) {
    next(err);
  }
};

export default create;

/**
 * @swagger
 * /products:
 *   post:
 *     summary: Create product
 *     security:
 *      - bearerAuth: []
 *     parameters:
 *     - in: body
 *       name: userId
 *       schema:
 *         type: string
 *       required: true
 *       description: The user id
 *     description: create new product
 *     responses:
 *       200:
 *         description: return the new product
 */
