import Cart from "../../models/Cart.js";

const getCart = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const cart = await Cart.findOne({ userId })
      .populate("products.product")
      .exec();
    if (cart) {
      return res.send(cart);
    } else {
      //create a new empty cart if it doesn't exist
      const newCart = new Cart({ userId, products: [] });
      await newCart.save();
      return res.send(newCart);
    }
  } catch (err) {
    next(err);
  }
};

export default getCart;
