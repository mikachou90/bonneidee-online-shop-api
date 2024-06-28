import Order from "../../models/Order.js";
import Cart from "../../models/Cart.js";

const getOrder = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const orderId = req.params.orderId;

    const cart = await Cart.findOne({ userId, orderId: orderId })
      .populate("products.product")
      .exec();
    const order = await Order.findById(orderId).exec();
    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }

    if (cart.userId.toString() !== userId) {
      return res
        .status(401)
        .json({ error: "You do not have access to this order" });
    }

    res.send({ order, cart });
  } catch (err) {
    next(err);
  }
};

export default getOrder;
