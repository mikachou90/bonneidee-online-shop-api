import Color from "../../models/Color.js";

const deleteColor = async (req, res, next) => {
  try {
    const colorId = req.params.colorId;
    await Color.findByIdAndDelete(colorId).exec();
    res.send({ message: "Color deleted" });
  } catch (err) {
    next(err);
  }
};

export default deleteColor;
