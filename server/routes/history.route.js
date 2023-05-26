const Router = require("express").Router();

const {
  getHistory,
  getHistoryById,
  createHistory,
} = require("../controllers/history.controller");

Router.get("/history", getHistory);
Router.get("/history/:id", getHistoryById);
Router.post("/history", createHistory);

module.exports = Router;
