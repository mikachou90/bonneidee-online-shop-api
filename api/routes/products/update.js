import Product from "../../models/Product.js";

const updateProduct = async (req, res, next) => {
  try {
    const productId = req.params.productId;
    const {
      name,
      description,
      picture,
      price,
      category,
      sizeDescription,
      maxColors,
    } = req.body;
    const product = await Product.findById(productId).exec();
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }
    product.name = name || product.name;
    product.description = description || product.description;
    product.picture = picture || product.picture;
    product.price = price || product.price;
    product.category = category || product.category;
    product.sizeDescription = sizeDescription || product.sizeDescription;
    product.maxColors = maxColors || product.maxColors;
    await product.save();
    res.send(product);
  } catch (err) {
    next(err);
  }
};

export default updateProduct;
