const Router = require("express").Router();

const { register, login } = require("../controllers/auth.controller");

Router.post("/register", register);
Router.post("/login", login);

module.exports = Router;
