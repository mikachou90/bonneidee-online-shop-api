import Cart from "../../models/Cart.js";
import Product from "../../models/Product.js";

const createCart = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { productId, quantity, colorIds } = req.body;

    //Validate body request
    const product = await Product.findById(productId).exec();
    if (!product) {
      return res.status(400).json({ error: "Product not found" });
    }
    //check if colors exists in product
    const colorExists = colorIds.every((colorId) =>
      product.colors.some((color) => color._id.toString() === colorId),
    );
    if (!colorExists) {
      return res
        .status(400)
        .json({ error: "Color not found for this product" });
    }

    //check if the quantity is a number > 0
    if (!Number.isInteger(quantity) || quantity <= 0) {
      return res.status(400).json({ error: "Quantity must be a number > 0" });
    }

    //Add product to cart
    const openCarts = await Cart.find({
      userId,
      orderId: { $exists: false },
    }).exec();

    if (openCarts?.length > 1) {
      //critical error, user has multiple active carts
      return res.status(400).json({ error: "Multiple active carts found" });
    }

    const cart =
      openCarts?.length === 1
        ? openCarts[0]
        : new Cart({ userId, products: [] });

    const existingProduct = cart.products.find(
      (p) => p.product.toString() === productId,
    );

    if (existingProduct) {
      return res.status(400).json({ error: "Product already exists in cart" });
    } else {
      cart.products.push({
        product: productId,
        quantity,
        selectedColors: colorIds,
      });
    }
    await cart.save();
    res.send(cart);
  } catch (err) {
    next(err);
  }
};

export default createCart;
