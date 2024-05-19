import Cart from "../../models/Cart.js";

const deleteCart = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const cart = await Cart.findOne({ userId }).exec();
    if (!cart) {
      return res.status(404).json({ error: "Cart not found" });
    }
    cart.products = [];
    await cart.save();
    res.send(cart);
  } catch (err) {
    next(err);
  }
};

export default deleteCart;
