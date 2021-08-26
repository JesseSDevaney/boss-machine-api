const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const errorhandler = require("errorhandler");
const app = express();

module.exports = app;

/* Do not change the following line! It is required for testing and allowing
 *  the frontend application to interact as planned with the api server
 */
const PORT = process.env.PORT || 4001;

// Add middleware for logging
app.use(morgan("tiny"));

// Add middleware for handling CORS requests from index.html
app.use(cors());

// Add middleware for parsing request bodies here:
app.use(express.json());

// Mount your existing apiRouter below at the '/api' path.
const apiRouter = require("./server/api.cjs");
app.use("/api", apiRouter);

// Add middleware for error handling
if (process.env.NODE_ENV === "development") {
  // only use in development
  app.use(errorhandler());
}

// This conditional is here for testing purposes:
if (!module.parent) {
  // Add your code to start the server listening at PORT below:
  app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
  });
}
