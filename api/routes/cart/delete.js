import Cart from "../../models/Cart.js";

const deleteCart = async (req, res, next) => {
  try {
    const { productId } = req.body;
    const userId = req.user.id;

    //Validate body request
    const carts = await Cart.find({ userId, orderId: { $exists: false } })
      .populate("products.product")
      .exec();

    if (carts.length === 0) {
      return res.status(404).json({ error: "Cart not found" });
    }

    if (carts.length > 1) {
      //critical error, user has multiple active carts
      return res.status(400).json({ error: "Multiple active carts found" });
    }

    const cart = carts[0];

    //Remove product from cart
    if (productId) {
      //check if the product exists in cart
      const existingProduct = cart.products.find(
        (p) => p.product._id.toString() === productId,
      );
      if (!existingProduct) {
        return res.status(400).json({ error: "Product not found in cart" });
      }

      //remove products from cart
      cart.products = cart.products.filter(
        (p) => p.product._id.toString() !== productId,
      );
    } else {
      //remove all products from cart
      cart.products = [];
    }

    await cart.save();
    res.send(cart);
  } catch (err) {
    next(err);
  }
};

export default deleteCart;
