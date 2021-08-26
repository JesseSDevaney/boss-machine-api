const express = require("express");
const { addToDatabase, getAllFromDatabase } = require("../db.cjs");
const minionsRouter = express.Router();

minionsRouter.get("/", (req, res) => {
  const allMinions = getAllFromDatabase("minions");
  res.status(200).json(allMinions);
});

minionsRouter.post("/", (req, res, next) => {
  try {
    const newMinion = addToDatabase("minions", req.body);
    res.status(201).json(newMinion);
  } catch (err) {
    err.status = 400;
    next(err);
  }
});

module.exports = minionsRouter;
