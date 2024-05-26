import Category from "../../models/Category.js";

const deleteCategory = async (req, res, next) => {
  try {
    const categoryId = req.params.categoryId;
    await Category.findByIdAndDelete(categoryId).exec();
    res.send({ message: "Category deleted" });
  } catch (err) {
    next(err);
  }
};

export default deleteCategory;
