import Product from "../../models/Product.js";

const list = async (req, res, next) => {
  try {
    const products = await Product.find()
      .populate("colors")
      .populate("category");
    res.json(products);
  } catch (err) {
    next(err);
  }
};

export default list;
