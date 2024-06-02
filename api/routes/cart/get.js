import Cart from "../../models/Cart.js";

const getCart = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const carts = await Cart.find({ userId, orderId: { $exists: false } })
      .populate("products.product")
      .exec();

    if (carts.length === 0) {
      const newCart = new Cart({ userId, products: [] });
      await newCart.save();
      return res.send(newCart);
    }

    if (carts.length === 1) {
      return res.send(carts[0]);
    }

    //critical error, user has multiple active carts
    return res.status(400).json({ error: "Multiple active carts found" });
  } catch (err) {
    next(err);
  }
};

export default getCart;
