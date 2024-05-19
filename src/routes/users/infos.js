/**
 * @swagger
 * /user/info:
 *   get:
 *     description: get user more infos
 *     responses:
 *       200:
 *         description: Returns more data from auth0.
 */

const userInfo = async (req, res, next) => {
  try {
    res.json({
      user: req.user,
    });
  } catch (err) {
    next(err);
  }
};

export default userInfo;
