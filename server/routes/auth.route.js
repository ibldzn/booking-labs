const Router = require("express").Router();

const {
  register,
  login,
  logout,
  me,
} = require("../controllers/auth.controller");

Router.post("/auth/register", register);
Router.post("/auth/login", login);
Router.post("/auth/logout", logout);
Router.get("/auth/me", me);

module.exports = Router;
