import Cart from "../../models/Cart.js";
import Product from "../../models/Product.js";
import updateCartFromProducts from "./utils/updateCart.js";

const updateCart = async (req, res, next) => {
  try {
    const userId = req.user.id;
    console.log("userId", userId);
    const { products } = req.body;

    //Check if cart exists
    const carts = await Cart.find({
      userId,
      orderId: { $exists: false },
    }).exec();

    if (carts.length === 0) {
      return res.status(404).json({ error: "Cart not found" });
    }
    if (carts.length > 1) {
      //critical error, user has multiple active carts
      return res.status(400).json({ error: "Multiple active carts found" });
    }

    const cart = carts[0];

    if (!cart || cart.userId.toString() !== userId) {
      //cart does not belong to user
      //but we do not want to expose the reason why the cart was not found
      return res.status(400).json({ error: "Cart error" });
    }

    if (cart.orderId) {
      return res.status(400).json({ error: "Cannot update a closed cart" });
    }

    // --- Check if the request is valid ---
    await Promise.all(
      products.map(async ({ productId, colorIds }) => {
        //find product with colors and check if color exists
        const product = await Product.find({
          productId,
          colorIds: { $in: colorIds },
        }).exec();

        if (!product) {
          throw "Product not found:" + productId + ", colors:" + colorIds;
        }
      }),
    );

    // --- Update the cart ---

    updateCartFromProducts(cart, products);

    console.log("Updated cart", cart);

    await cart.save();
    return res.send(cart);
  } catch (err) {
    next(err);
  }
};

export default updateCart;
