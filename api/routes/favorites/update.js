import Favorite from "../../models/Favorite.js";
import Product from "../../models/Product.js";

const updateFavorite = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { productIds } = req.body;

    // -- Check if products exist --
    await Promise.all(
      productIds.map(async (product) => {
        const productExists = await Product.findById(product).exec();
        if (!productExists) {
          throw new Error("Product not found");
        }
      }),
    );

    // -- Update favorite list --

    const favoriteList = await Favorite.findOne({ userId }).exec();
    if (!favoriteList) {
      //no favorite list found, let's create one
      const newfavoriteList = new Favorite({ userId, products: productIds });
      await newfavoriteList.save();
      res.send(newfavoriteList);
    } else {
      favoriteList.products = favoriteList.products
        ? favoriteList.products
            .concat(productIds)
            .filter((value, index, self) => self.indexOf(value) === index)
        : productIds;

      await favoriteList.save();
      res.send(favoriteList);
    }
  } catch (err) {
    next(err);
  }
};

export default updateFavorite;
