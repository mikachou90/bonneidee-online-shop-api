import Category from "../../models/Category.js";

const deleteCategory = async (req, res, next) => {
  try {
    const categoryId = req.params.categoryId;
    const category = await Category.findById(categoryId).exec();
    if (!category) {
      return res.status(404).json({ error: "Category not found" });
    }
    await category.delete();
    res.send({ message: "Category deleted" });
  } catch (err) {
    next(err);
  }
};

export default deleteCategory;
