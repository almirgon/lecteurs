const express = require("express");
const routes = express.Router();

const UserController = require("./controllers/userController");

routes.get("/users", UserController.getUsers);

routes.get("/users/:id", UserController.getUserById);

routes.post("/users", UserController.createUser);

module.exports = routes


