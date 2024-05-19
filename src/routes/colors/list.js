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
 *     security:
 *      - bearerAuth: []
 *     description: get colors list
 *     responses:
 *       200:
 *         description: return the colors
 */
