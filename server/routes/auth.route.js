const Router = require("express").Router();

const { register, login } = require("../controllers/auth.controller");

Router.post("/auth/register", register);
Router.post("/auth/login", login);

module.exports = Router;
