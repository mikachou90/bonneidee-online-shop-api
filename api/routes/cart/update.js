import Cart from "../../models/Cart.js";
import Product from "../../models/Product.js";

const updateProductInCart = async (productId, quantity, colors) => {
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
          color: colors || p.color,
        };
      } else {
        return p;
      }
    });
  }
};

const updateCart = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const products = req.body;

    if (!products || !Array.isArray(products)) {
      return res
        .status(400)
        .json({ error: "Invalid request: needs to be an array" });
    }

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
      //we do not want to expose the reason why the cart was not found
      return res.status(400).json({ error: "Cart error" });
    }

    if (cart.orderId) {
      return res.status(400).json({ error: "Cannot update a closed cart" });
    }

    //Get all products data
    const productsIds = products.map((p) => p.productId);
    const allProductsData = await Product.find({
      _id: { $in: productsIds },
    }).exec();

    if (!allProductsData?.length) {
      return res.status(400).json({ error: "Products not found" });
    }

    //map through products
    products
      .filter((p) => {
        //check if product exists
        return allProductsData.some(
          (product) => product._id.toString() === p.productId,
        );
      })
      .map(async ({ productId, quantity, colorIds }) => {
        //Check if products exists in cart
        const existingProduct = cart.products.some(
          (p) => p.product.toString() === productId,
        );

        if (!existingProduct) {
          return;
        }

        //check if colors exists in product
        if (colorIds) {
          const colorExists = colorIds.every((colorId) =>
            productData.colors.some(
              (color) => color._id.toString() === colorId,
            ),
          );
          if (!colorExists) {
            return;
          }
        }

        return updateProductInCart(productData, quantity, colorIds);
      });

    await cart.save();
    return res.send(cart);
  } catch (err) {
    next(err);
  }
};

export default updateCart;
