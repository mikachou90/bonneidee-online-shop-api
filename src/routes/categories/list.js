import Category from "../../models/Category.js";

const list = async (req, res, next) => {
  try {
    const categories = await Category.find().exec();
    res.json(categories);
  } catch (err) {
    next(err);
  }
};

export default list;

/**
 * @swagger
 * /categories:
 *   get:
 *     summary: List categories
 *     security:
 *      - bearerAuth: []
 *     description: get categories list
 *     responses:
 *       200:
 *         description: return the categories
 */
