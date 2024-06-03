import Order from "../../models/Order.js";
import Cart from "../../models/Cart.js";

const createOrder = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const {
      cartId,
      shippingAddress,
      paymentMethod,
      shippingName,
      shippingContactNumber,
    } = req.body;

    //Validate body request
    const cart = await Cart.findById(cartId).exec();
    if (!cart) {
      return res.status(400).json({ error: "Cart not found" });
    }
    if (cart.userId.toString() !== userId) {
      return res
        .status(401)
        .json({ error: "You do not have access to the cart" });
    }

    //Add order
    const order = new Order({
      shippingAddress,
      paymentMethod,
      shippingName,
      shippingContactNumber,
    });

    await order.save();

    //Update cart with an orderId
    try {
      cart.orderId = order._id;
      await cart.save();
    } catch (error) {
      //Rollback order creation
      await order.remove();
      next(error);
    }

    res.send(order);
  } catch (err) {
    next(err);
  }
};

export default createOrder;
