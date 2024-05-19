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

/**
 * @swagger
 * /user/info:
 *   get:
 *     security:
 *     - bearerAuth: []
 *     summary: Get auth0 user data
 *     description: get user from auth0
 *     responses:
 *       200:
 *         description: Returns some user data.
 */
