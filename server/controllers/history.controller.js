const { StatusCodes } = require("http-status-codes");
const History = require("../models/history.model.js");

const getHistory = async (req, res) => {
  try {
    const history = await History.find();
    if (history?.length === 0) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ error: "No history found" });
    }
    return res.status(StatusCodes.OK).json(history);
  } catch (err) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: err.message });
  }
};

const getHistoryById = async (req, res) => {
  try {
    const history = await History.findById(req.params.id);

    if (!history) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ error: "History not found" });
    }

    return res.status(StatusCodes.OK).json(history);
  } catch (err) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: err.message });
  }
};

const createHistory = async (req, res) => {
  try {
    const history = await History.create(req.body);
    return res.status(StatusCodes.CREATED).json(history);
  } catch (err) {
    console.log(err);
    return res.status(StatusCodes.BAD_REQUEST).json({ error: err.message });
  }
};

module.exports = {
  getHistory,
  getHistoryById,
  createHistory,
};
