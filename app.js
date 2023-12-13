require('dotenv').config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const { errors } = require("celebrate");
const errorHandler = require("./middleware/error-handler");
const { requestLogger, errorLogger } = require("./middleware/logger")

const app = express();

const { PORT = 3001 } = process.env;

mongoose.connect(
  "mongodb://127.0.0.1:27017/ArtistHarmonyHub_db",
  (r) => {
    console.log("connected to DB", r);
  },
  (e) => console.log("DB error", e),
);
app.use((req, res, next) => {
  req.user = {
    _id: '5d8b8592978f8bd833ca8133'// paste the _id of the test user created in the previous step
  };
  next();
});

const routes = require("./routes");

app.use(express.json());
app.use(cors());
app.use(requestLogger);
app.use(routes);
app.use(errorLogger);
app.use(errors());
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
