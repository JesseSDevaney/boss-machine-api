const express = require("express");
const ideasRouter = express.Router();
const { addToDatabase, getAllFromDatabase } = require("../db.cjs");

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

module.exports = ideasRouter;
