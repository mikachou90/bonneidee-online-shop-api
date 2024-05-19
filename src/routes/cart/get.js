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

/**
 * @swagger
 * /cart:
 *   get:
 *     summary: Get the user cart
 *     security:
 *      - bearerAuth: []
 *     description: get the user cart data
 *     responses:
 *       200:
 *         description: return the cart
 */
