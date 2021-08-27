const express = require("express");
const {
  addToDatabase,
  deleteFromDatabasebyId,
  getAllFromDatabase,
  getFromDatabaseById,
  updateInstanceInDatabase,
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

workRouter.param("workId", (req, res, next, id) => {
  const work = getFromDatabaseById("work", id);
  if (!work) {
    const err = new Error(`Work #${id} does not exist`);
    err.status = 404;
    return next(err);
  }

  req.work = work;
  next();
});

workRouter.put("/:workId", (req, res, next) => {
  try {
    const putWork = req.body;
    putWork.id = req.work.id;
    putWork.minionId = req.work.minionId;

    const updatedWork = updateInstanceInDatabase("work", putWork);
    res.status(200).json(updatedWork);
  } catch (err) {
    err.status = 400;
    next(err);
  }
});

workRouter.delete("/:workId", (req, res) => {
  deleteFromDatabasebyId("work", req.work.id);
  res.status(204).send();
});

module.exports = workRouter;
