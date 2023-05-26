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
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username }).select("+password");
    if (!user) {
      return res
        .status(StatusCodes.UNAUTHORIZED)
        .json({ message: "Invalid credentials" });
    }

    const isPasswordCorrect = await user.comparePassword(password);
    if (!isPasswordCorrect) {
      return res
        .status(StatusCodes.UNAUTHORIZED)
        .json({ message: "Invalid credentials" });
    }

    req.session.userId = user._id;
    res.status(StatusCodes.OK).json({ user });
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: error.message });
  }
};

const logout = async (req, res) => {
  try {
    req.session.destroy();
    res.status(StatusCodes.OK).json({ message: "Logged out" });
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: error.message });
  }
};

module.exports = {
  register,
  login,
  logout,
};
