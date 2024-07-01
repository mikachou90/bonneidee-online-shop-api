import Cart from "../../models/Cart.js";
import Order from "../../models/Order.js";

const listOrders = async (req, res, next) => {
  try {
    const userId = req.user.id;
    // find all carts for the user, with an orderId

    const cartsWithOrder = await Cart.find({
      userId,
      orderId: { $exists: true },
    }).exec();

    if (!cartsWithOrder) {
      return res.status(404).json({ error: "Carts not found" });
    }

    const ordersIdsFromCart = cartsWithOrder.map((c) => c.orderId);
    const orders = await Order.find({ _id: { $in: ordersIdsFromCart } }).exec();

    if (!orders || orders.length === 0) {
      return res.status(200).json([]);
    }
    res.send(orders);
  } catch (err) {
    next(err);
  }
};

export default listOrders;
