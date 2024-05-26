import Product from "../../models/Product.js";

const list = async (req, res, next) => {
  try {
    const products = await Product.find().exec();
    res.json(products);
  } catch (err) {
    next(err);
  }
};

export default list;
