import Color from "../../models/Color.js";

const get = async (req, res, next) => {
  try {
    const colorId = req.params.colorId;
    const color = await Color.findById(colorId);
    if (!color) {
      return res.status(404).json({ error: "Color not found" });
    }
    res.json(color);
  } catch (err) {
    next(err);
  }
};

export default get;
