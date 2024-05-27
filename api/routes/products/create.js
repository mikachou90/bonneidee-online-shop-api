import Product from "../../models/Product.js";

const create = async (req, res, next) => {
  try {
    const {
      name,
      description,
      picture,
      price,
      category,
      colors,
      sizeDescription,
      maxColors,
    } = req.body;

    const newProduct = new Product({
      name,
      description,
      picture,
      price,
      category,
      colors,
      sizeDescription,
      maxColors,
    });
    await newProduct.save();
    res.send(newProduct);
  } catch (err) {
    next(err);
  }
};

export default create;
