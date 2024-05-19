import Color from "../../models/Color.js";

const updateColor = async (req, res, next) => {
  try {
    const colorId = req.params.colorId;
    const color = await Color.findById(colorId).exec();
    if (!color) {
      return res.status(404).json({ error: "Color not found" });
    }

    const { name, description, hex } = req.body;
    color.name = name || color.name;
    color.description = description || color.description;
    color.hex = hex || color.hex;

    await color.save();
    res.send(color);
  } catch (err) {
    next(err);
  }
};

export default updateColor;

/**
 * @swagger
 * /colors/{colorId}:
 *   patch:
 *     summary: Update the color
 *     security:
 *      - bearerAuth: []
 *     description: update the color
 *     responses:
 *       200:
 *         description: return the color
 */
