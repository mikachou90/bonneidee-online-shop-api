import Cart from "../../models/Cart.js";

const updateCart = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { productId, quantity } = req.body;
    const cart = await Cart.findOne({ userId }).exec();
    if (!cart) {
      return res.status(404).json({ error: "Cart not found" });
    }
    const existingProduct = cart.products.find(
      (p) => p.product.toString() === productId,
    );
    if (!existingProduct) {
      return res.status(404).json({ error: "Product not found in cart" });
    }
    if (quantity === 0) {
      cart.products = cart.products.filter(
        (p) => p.product.toString() !== productId,
      );
    } else {
      existingProduct.quantity = quantity;
    }

    await cart.save();
    return res.send(cart);
  } catch (err) {
    next(err);
  }
};

export default updateCart;

/**
 * @swagger
 * /cart:
 *   patch:
 *     summary: Update the user cart
 *     security:
 *      - bearerAuth: []
 *     parameters:
 *       - name: productId
 *         description: a valid product id.
 *         in: formData
 *         required: true
 *         type: string
 *       - name: quantity
 *         description: the product quantity.
 *         in: formData
 *         required: true
 *         type: number
 *     description: update the user cart data
 *     tags: [Cart]
 *     responses:
 *       200:
 *         description: return the cart
 */
