const express = require("express");
const { getAllFromDatabase } = require("../db.cjs");
const minionsRouter = express.Router();

minionsRouter.get("/", (req, res) => {
  const allMinions = getAllFromDatabase("minions");
  res.status(200).json(allMinions);
});

module.exports = minionsRouter;
