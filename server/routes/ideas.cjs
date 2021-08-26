const express = require("express");
const ideasRouter = express.Router();
const {
  addToDatabase,
  deleteFromDatabasebyId,
  getAllFromDatabase,
  getFromDatabaseById,
  updateInstanceInDatabase,
} = require("../db.cjs");

ideasRouter.get("/", (req, res) => {
  const ideas = getAllFromDatabase("ideas");
  res.status(200).json(ideas);
});

ideasRouter.post("/", (req, res, next) => {
  try {
    const newIdea = addToDatabase("ideas", req.body);
    res.status(201).json(newIdea);
  } catch (err) {
    err.status = 400;
    next(err);
  }
});

ideasRouter.param("ideaId", (req, res, next, id) => {
  const idea = getFromDatabaseById("ideas", id);
  if (!idea) {
    const err = new Error(`Idea #${id} does not exist`);
    err.status = 404;
    return next(err);
  }

  req.idea = idea;
  next();
});

ideasRouter.get("/:ideaId", (req, res) => {
  res.status(200).json(req.idea);
});

ideasRouter.put("/:ideaId", (req, res, next) => {
  try {
    const putIdea = req.body;
    putIdea.id = req.idea.id;

    const updatedIdea = updateInstanceInDatabase("ideas", putIdea);
    res.status(200).json(updatedIdea);
  } catch (err) {
    err.status = 400;
    next(err);
  }
});

ideasRouter.delete("/:ideaId", (req, res) => {
  deleteFromDatabasebyId("ideas", req.idea.id);
  res.status(204).send();
});

module.exports = ideasRouter;
