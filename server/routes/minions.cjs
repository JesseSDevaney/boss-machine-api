const express = require("express");
const {
  addToDatabase,
  getAllFromDatabase,
  getFromDatabaseById,
const { addToDatabase, getAllFromDatabase } = require("../db.cjs");
} = require("../db.cjs");
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

minionsRouter.param("minionId", (req, res, next, id) => {
  const minion = getFromDatabaseById("minions", id);
  if (!minion) {
    const err = new Error(`Minion #${id} does not exist`);
    err.status = 404;
    return next(err);
  }

  req.minion = minion;
  next();
});

minionsRouter.get("/:minionId", (req, res) => {
  res.status(200).json(req.minion);
});

module.exports = minionsRouter;
