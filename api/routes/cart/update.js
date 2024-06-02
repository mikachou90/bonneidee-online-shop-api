import Cart from "../../models/Cart.js";
import Product from "../../models/Product.js";

const updateCart = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { productId, quantity, colorId } = req.body;

    //Check if cart exists
    const cart = await Cart.findOne({ userId }).exec();
    if (!cart) {
      return res.status(404).json({ error: "Cart not found" });
    }

    //Check if product exists in cart
    const existingProduct = cart.products.find(
      (p) => p.product.toString() === productId,
    );
    if (!existingProduct) {
      return res.status(400).json({ error: "Product not found in cart" });
    }

    if (colorId) {
      //Check if color exists for product
      const product = await Product.findById(productId).exec();
      if (!product) {
        return res.status(400).json({ error: "Product not found" });
      }
      const colorExists = product.colors.find(
        (c) => c._id.toString() === colorId,
      );
      if (!colorExists) {
        return res
          .status(400)
          .json({ error: "Color not found for this product" });
      }
    }

    if (quantity && quantity === 0) {
      //remove product from cart if quantity is 0
      cart.products = cart.products.filter(
        (p) => p.product.toString() !== productId,
      );
    } else {
      // update product quantity and/or color
      cart.products = cart.products.map((p) => {
        if (p.product.toString() === productId) {
          return {
            product: productId,
            quantity: quantity || p.quantity,
            color: colorId || p.color,
          };
        } else {
          return p;
        }
      });
    }

    await cart.save();
    return res.send(cart);
  } catch (err) {
    next(err);
  }
};

export default updateCart;
