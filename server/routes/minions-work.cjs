const express = require("express");
const { getAllFromDatabase, getFromDatabaseById } = require("../db.cjs");
const workRouter = express.Router({ mergeParams: true });

workRouter.get("/", (req, res) => {
  const allWork = getAllFromDatabase("work");
  const minionWork = allWork.filter(
    ({ minionId }) => minionId === req.minion.id
  );
  res.status(200).json(minionWork);
});

module.exports = workRouter;
