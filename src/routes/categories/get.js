import Category from "../../models/Category.js";

const get = async (req, res, next) => {
  try {
    const categoryId = req.params.categoryId;
    const category = await Category.findById(categoryId);
    res.json(category);
  } catch (err) {
    next(err);
  }
};

export default get;

/**
 * @swagger
 * /categories/{categoryId}:
 *   get:
 *     summary: Get the category
 *     description: get the category
 *     tags: [Categories]
 *     responses:
 *       200:
 *         description: return the category
 */
