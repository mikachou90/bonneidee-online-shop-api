const getUserId = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const permissions = req.user.permissions;

    const canAdminWrite = permissions.includes("write:all");
    const canAdminDelete = permissions.includes("delete:all");
    res.send({
      userId,
      canAdminWrite,
      canAdminDelete,
      isAdmin: Boolean(canAdminDelete || canAdminWrite),
    });
  } catch (err) {
    next(err);
  }
};

export default getUserId;

/**
 * @swagger
 * /user:
 *   get:
 *     security:
 *      - bearerAuth: []
 *     summary: Get simple user data
 *     description: get user from auth0
 *     tags: [User]
 *     responses:
 *       200:
 *         description: Returns some user data.
 */
