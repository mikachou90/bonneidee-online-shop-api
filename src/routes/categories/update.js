import Category from "../../models/Category.js";

const updateCategory = async (req, res, next) => {
  try {
    const categoryId = req.params.categoryId;
    const { name, description } = req.body;
    const category = await Category.findById(categoryId).exec();
    if (!category) {
      return res.status(404).json({ error: "Category not found" });
    }
    category.name = name || category.name;
    category.description = description || category.description;
    await category.save();
    res.send(category);
  } catch (err) {
    next(err);
  }
};

export default updateCategory;
