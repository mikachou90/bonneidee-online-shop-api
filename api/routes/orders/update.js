import Order from "../../models/Order.js";

const updateOrder = async (req, res, next) => {
  try {
    const { orderId } = req.params;
    const { shippingAddress, paymentMethod, status, paymentStatus } = req.body;

    //Validate body request
    const order = await Order.findById(orderId).exec();
    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }

    //Update order
    order.shippingAddress = shippingAddress || order.shippingAddress;
    order.paymentMethod = paymentMethod || order.paymentMethod;
    order.status = status || order.status;
    order.paymentStatus = paymentStatus || order.paymentStatus;

    await order.save();

    res.send(order);
  } catch (err) {
    next(err);
  }
};

export default updateOrder;
