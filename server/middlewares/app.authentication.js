const { StatusCodes } = require("http-status-codes");

const isAuthenticated = (req, res, next) => {
  const userId = req.session.userId;
  if (!userId) {
    return res.status(StatusCodes.UNAUTHORIZED).json({
      error: "You must be logged in to perform this action",
    });
  }
  next();
};

module.exports = {
  isAuthenticated,
};
