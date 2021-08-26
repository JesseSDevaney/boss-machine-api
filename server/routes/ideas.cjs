const express = require("express");
const ideasRouter = express.Router();
const { getAllFromDatabase } = require("../db.cjs");

ideasRouter.get("/", (req, res) => {
  const ideas = getAllFromDatabase("ideas");
  res.status(200).json(ideas);
});

module.exports = ideasRouter;
