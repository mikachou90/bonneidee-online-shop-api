import Cart from "../../models/Cart.js";
import Product from "../../models/Product.js";

const createCart = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { productId, quantity } = req.body;
    const product = await Product.findById(productId).exec();
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }
    let cart = await Cart.findOne({ userId }).exec();
    if (!cart) {
      cart = new Cart({ userId, products: [] });
    }
    const existingProduct = cart.products.find(
      (p) => p.product.toString() === productId,
    );
    if (existingProduct) {
      existingProduct.quantity += quantity;
    } else {
      cart.products.push({ product: productId, quantity });
    }
    await cart.save();
    res.send(cart);
  } catch (err) {
    next(err);
  }
};

export default createCart;