const express = require("express");
const morgan = require("morgan");
const passport = require("passport");
const path = require("path");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const history = require("connect-history-api-fallback");
const routes = require("./src/routes/index.js");

const port = process.env.PORT || 3000;
// Create Express app
const app = express();
// Parse requests of content-type 'application/json'
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const COOKIE_SECRET = process.env.COOKIE_SECRET || "jhdshhds884hfhhs-ew6dhjd";
app.use(cookieParser(COOKIE_SECRET));

// get the jwt / local strategies (for log in) and our authenticate.js
require("./src/strategies/JwtStrategy");
require("./src/strategies/LocalStrategy");
require("./authenticate");

// connect the database
require("./src/utils/connectdb");

const corsConfig = {
  credentials: true,
  origin: true,
};

// HTTP request logger
app.use(morgan("dev"));
// Enable cross-origin resource sharing for frontend must be registered before api
app.options("*", cors(corsConfig));
app.use(cors(corsConfig));

// add passport to express
app.use(passport.initialize());

// our routes
app.use("/api", routes);

// Configuration for serving frontend in production mode
// Support Vuejs HTML 5 history mode
app.use(history());
// Serve static assets
const root = path.normalize(__dirname + "/..");
const client = path.join(root, "client", "dist");
app.use(express.static(client));
// Error handler (i.e., when exception is thrown) must be registered last
const env = app.get("env");
// eslint-disable-next-line no-unused-consts
app.use((err, req, res, next) => {
  console.error(err.stack);
  const err_res = {
    message: err.message,
    error: {},
  };
  if (env === "development") {
    // Return sensitive stack trace only in dev mode
    err_res["error"] = err.stack;
  }
  res.status(err.status || 500);
  res.json(err_res);
});
app.listen(port, (err) => {
  if (err) throw err;
  console.log(`Express server listening on port ${port}, in ${env} mode`);
  console.log(`Backend: http://localhost:${port}/api`);
  console.log(`Frontend (production): http://localhost:${port}/`);
});

module.exports = app;
