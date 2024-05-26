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
