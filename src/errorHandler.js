const handleServerError = (err, req, res, next) => {
  if (err) {
    console.error(err.stack);

    res.status(500).json({ code: 500, message: "Internal server error" });
  } else {
    next();
  }
};

const handleNotFoundError = (req, res) => {
  res.status(404).json({ code: 404, message: "Not found" });
};

export default { handleServerError, handleNotFoundError };
