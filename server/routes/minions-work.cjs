const express = require("express");
const {
  addToDatabase,
  getAllFromDatabase,
  getFromDatabaseById,
} = require("../db.cjs");
const workRouter = express.Router({ mergeParams: true });

workRouter.get("/", (req, res) => {
  const allWork = getAllFromDatabase("work");
  const minionWork = allWork.filter(
    ({ minionId }) => minionId === req.minion.id
  );
  res.status(200).json(minionWork);
});

workRouter.post("/", (req, res, next) => {
  try {
    req.body.minionId = req.minion.id;
    const newWork = addToDatabase("work", req.body);
    res.status(201).json(newWork);
  } catch (err) {
    err.status = 400;
    next(err);
  }
});

module.exports = workRouter;
