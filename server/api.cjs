const express = require("express");
const apiRouter = express.Router();
const minionsRouter = require("./routes/minions.cjs");
const ideasRouter = require("./routes/ideas.cjs");
const meetingsRouter = require("./routes/meetings.cjs");

apiRouter.use("/minions", minionsRouter);
apiRouter.use("/ideas", ideasRouter);
apiRouter.use("/meetings", meetingsRouter);

module.exports = apiRouter;
