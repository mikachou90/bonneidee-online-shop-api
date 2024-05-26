import Color from "../../models/Color.js";

const deleteColor = async (req, res, next) => {
  try {
    const colorId = req.params.colorId;
    const color = await Color.findById(colorId).exec();
    if (!color) {
      return res.status(404).json({ error: "Color not found" });
    }
    await color.remove();
    res.send({ message: "Color deleted" });
  } catch (err) {
    next(err);
  }
};

export default deleteColor;

/**
 * @swagger
 * /colors/{colorsId}:
 *   delete:
 *     summary: Delete color
 *     security:
 *      - bearerAuth: []
 *     description: Delete color
 *     tags: [Admin]
 *     responses:
 *       200:
 *         description:
 */
