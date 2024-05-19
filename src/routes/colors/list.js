import Color from "../../models/Color.js";

const list = async (req, res, next) => {
  try {
    const colors = await Color.find().exec();
    res.json(colors);
  } catch (err) {
    next(err);
  }
};

export default list;
