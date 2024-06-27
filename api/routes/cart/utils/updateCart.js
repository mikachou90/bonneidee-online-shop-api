const updateCart = async (cart, products) => {
  return products.map((product) => {
    const { productId, quantity, colorIds, cartItemId } = product;
    if (quantity && quantity === 0) {
      // filter out the product with the cartItemId
      cart.products = cart.products.filter(
        (p) => p._id.toString() !== cartItemId,
      );
    } else {
      // update product quantity and/or color, or add new product if color is different
      cart.products = cart.products.map((p) => {
        if (p._id.toString() === cartItemId) {
          //update product quantity and/or color, it is the same product
          console.log("Updating product in cart", p);
          console.log("Quantity", quantity);
          console.log("ColorIds", colorIds);
          console.log("returning", {
            product: productId,
            quantity: quantity ? quantity + p.quantity : p.quantity,
            selectedColors: colorIds || p.color,
          });
          return {
            product: productId,
            quantity: quantity || p.quantity,
            selectedColors: colorIds || p.color,
          };
        } else {
          return p;
        }
      });

      //add new product if color is different
      if (
        !cart.products.some(
          (p) =>
            p.product.toString() === productId &&
            p.selectedColors.every((c) => colorIds.includes(c)),
        )
      ) {
        // product not found, or color is different
        // add new product

        cart.products.push({
          product: productId,
          quantity,
          selectedColors: colorIds,
        });
      }
    }
  });
};

export default updateCart;
