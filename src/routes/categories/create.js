import Category from "../../models/Category.js";

const createCategory = async (req, res, next) => {
  try {
    const { name, description } = req.body;
    if (!name || !description) {
      return res.status(400).json({ error: "Missing required fields" });
    }
    const newCategory = new Category({ name, description });
    await newCategory.save();
    res.send(newCategory);
  } catch (err) {
    next(err);
  }
};

export default createCategory;

/**
 * @swagger
 * /categories:
 *   post:
 *     summary: Create category
 *     security:
 *      - bearerAuth: []
 *     parameters:
 *       - name: name
 *         description: category name.
 *         in: formData
 *         required: true
 *         type: string
 *       - name: description
 *         description: the category description.
 *         in: formData
 *         required: true
 *         type: number
 *     description: create new category
 *     tags: [Admin]
 *     responses:
 *       200:
 *         description: return the new category
 */
