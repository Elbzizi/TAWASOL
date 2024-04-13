const express = require("express");
const route = express.Router();

route.get("/", (req, res) => {
  res.send("<h1>page de auth </h1>");
});

module.exports = route;
