import Order from "../../models/Order.js";

const getOrder = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const orderId = req.params.orderId;

    const order = await Order.findById(orderId).exec();
    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }

    if (order.userId.toString() !== userId) {
      return res
        .status(401)
        .json({ error: "You do not have access to this order" });
    }

    res.send(order);
  } catch (err) {
    next(err);
  }
};

export default getOrder;
