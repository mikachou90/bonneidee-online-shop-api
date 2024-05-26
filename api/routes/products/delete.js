import Product from "../../models/Product.js";

const deleteProduct = async (req, res, next) => {
  try {
    const productId = req.params.productId;
    await Product.findByIdAndDelete(productId).exec();
    res.send({ message: "Product deleted" });
  } catch (err) {
    next(err);
  }
};

export default deleteProduct;
