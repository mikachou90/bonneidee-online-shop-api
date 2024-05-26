import Color from "../../models/Color.js";

const get = async (req, res, next) => {
  try {
    const colorId = req.params.colorId;
    const color = await Color.findById(colorId);
    res.json(color);
  } catch (err) {
    next(err);
  }
};

export default get;

/**
 * @swagger
 * /colors/{colorId}:
 *   get:
 *     summary: Get the color
 *     description: get the color
 *     tags: [Colors]
 *     responses:
 *       200:
 *         description: return the color
 */
