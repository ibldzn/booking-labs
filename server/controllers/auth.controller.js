const { StatusCodes } = require("http-status-codes");
const User = require("../models/user.model");

const register = async (req, res) => {
  try {
    const { username, name, password } = req.body;

    if (await User.findOne({ username })) {
      return res
        .status(StatusCodes.CONFLICT)
        .json({ message: `Username '${username}' already exists` });
    }

    const user = await User.create({
      username,
      name,
      password,
    });
    res.status(StatusCodes.CREATED).json({ user });
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: error.message });
  }
};

const login = async (req, res) => {
  res.json({ message: "login" });
};

module.exports = {
  register,
  login,
};
