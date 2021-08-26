const express = require("express");
const meetingsRouter = express.Router();
const {
  addToDatabase,
  createMeeting,
  getAllFromDatabase,
} = require("../db.cjs");

const isValidDate = (date) => !Number.isNaN(Date.parse(date));

meetingsRouter.get("/", (req, res) => {
  const meetings = getAllFromDatabase("meetings");
  res.status(200).json(meetings);
});

meetingsRouter.post("/", (req, res, next) => {
  try {
    const newMeeting = addToDatabase("meetings", createMeeting());
    res.status(201).json(newMeeting);
  } catch (err) {
    err.status = 400;
    next(err);
  }
});

module.exports = meetingsRouter;
