const express = require("express");
const meetingsRouter = express.Router();
const { getAllFromDatabase } = require("../db.cjs");

meetingsRouter.get("/", (req, res) => {
  const meetings = getAllFromDatabase("meetings");
  res.status(200).json(meetings);
});

module.exports = meetingsRouter;
