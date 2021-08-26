const express = require("express");
const apiRouter = express.Router();
const minionsRouter = require("./routes/minions.cjs");
const ideasRouter = require("./routes/ideas.cjs");

apiRouter.use("/minions", minionsRouter);
apiRouter.use("/ideas", ideasRouter);

module.exports = apiRouter;
