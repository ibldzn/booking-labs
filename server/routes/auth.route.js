const Router = require("express").Router();

const { register, login, logout } = require("../controllers/auth.controller");

Router.post("/auth/register", register);
Router.post("/auth/login", login);
Router.post("/auth/logout", logout);

module.exports = Router;
