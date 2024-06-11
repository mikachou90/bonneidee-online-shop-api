import Favorite from "../../models/Favorite.js";

const get = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const favoriteList = await Favorite.findOne({ userId }).exec();
    if (!favoriteList) {
      //no favorite list found, let's create one
      const newFavorite = new Favorite({ userId, products: [] });
      await newFavorite.save();
      return res.json(newFavorite);
    }

    res.json(favoriteList);
  } catch (err) {
    next(err);
  }
};

export default get;
