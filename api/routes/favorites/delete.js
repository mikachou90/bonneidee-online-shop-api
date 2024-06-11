import Favorite from "../../models/Favorite.js";

const deleteFavorite = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { productIds } = req.body;

    const favoriteList = await Favorite.findOne({ userId }).exec();
    if (!favoriteList) {
      //no favorite list found, let's create empty one
      const newFavorite = new Favorite({ userId, products: [] });
      await newFavorite.save();
      return res.json(newFavorite);
    }

    favoriteList.products = favoriteList.products.filter(
      (product) => !productIds.includes(product),
    );

    await favoriteList.save();

    res.send(favoriteList);
  } catch (err) {
    next(err);
  }
};

export default deleteFavorite;
