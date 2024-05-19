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
