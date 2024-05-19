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
