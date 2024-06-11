import Cart from "../../models/Cart.js";
import Product from "../../models/Product.js";

const updateCart = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { products } = req.body;
    // const { productId, quantity, colorId } = req.body;

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
      products.map(async (product) => {
        const { productId, colorId } = product;

        //Check if products exists in cart
        const existingProduct = cart.products.find(
          (p) => p.product.toString() === productId,
        );
        if (!existingProduct) {
          throw "Product not found in cart:" + productId;
        }

        if (colorId) {
          //Check if color exists for product
          const product = await Product.findById(productId).exec();
          if (!product) {
            throw "Product not found:" + productId;
          }
          const colorExists = product.colors.find(
            (c) => c._id.toString() === colorId,
          );
          if (!colorExists) {
            throw "Color not found for this product:" + productId;
          }
        }
      }),
    );

    // --- Update the cart ---

    products.map((product) => {
      const { productId, quantity, colorId } = product;

      if (quantity && quantity === 0) {
        //remove product from cart if quantity is 0
        cart.products = cart.products.filter(
          (p) => p.product.toString() !== productId,
        );
      } else {
        // update product quantity and/or color
        cart.products = cart.products.map((p) => {
          if (p.product.toString() === productId) {
            return {
              product: productId,
              quantity: quantity || p.quantity,
              selectedColors: colorId || p.color,
            };
          } else {
            return p;
          }
        });
      }
    });

    await cart.save();
    return res.send(cart);
  } catch (err) {
    next(err);
  }
};

export default updateCart;
