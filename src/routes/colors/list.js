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

/**
 * @swagger
 * /colors:
 *   get:
 *     summary: List colors
 *     description: get colors list
 *     tags: [Colors]
 *     responses:
 *       200:
 *         description: return the colors
 */
