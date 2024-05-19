import Color from "../../models/Color.js";

const createColor = async (req, res, next) => {
  try {
    const { name, description, hex } = req.body;
    const newColor = new Color({ name, description, hex });
    await newColor.save();
    res.send(newColor);
  } catch (err) {
    next(err);
  }
};

export default createColor;
