const express = require("express");
const cors = require("cors");
const {
  unhandledErrors,
  handledErrors,
} = require("./errorHandling/errorhandler");

const app = express();
app.use(cors());

app.use(express.json());

const {
  getUsers,
  getUserByUsername,
  patchUser,
} = require("./controller/controller");

app.get("/api/users", getUsers);

app.get("/api/users/:username", getUserByUsername);
app.patch("/api/users/:user_id", patchUser);

app.use(handledErrors);
app.use(unhandledErrors);

module.exports = app;
