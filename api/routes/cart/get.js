import Cart from "../../models/Cart.js";

const getCart = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const cart = await Cart.findOne({ userId })
      .populate("products.product")
      .exec();
    if (!cart) {
      return res.status(404).json({ error: "Cart not found" });
    }
    res.send(cart);
  } catch (err) {
    next(err);
  }
};

export default getCart;
