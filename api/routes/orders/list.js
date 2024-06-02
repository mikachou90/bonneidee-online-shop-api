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

    if (!orders) {
      return res.status(404).json({ error: "Orders not found" });
    }
    if (orders.length === 0) {
      return res.status(404).json({ error: "No orders found" });
    }
    if (orders.find((order) => order.userId.toString() !== userId)) {
      return res
        .status(401)
        .json({ error: "You do not have access to these orders" });
    }
    res.send(orders);
  } catch (err) {
    next(err);
  }
};

export default listOrders;
