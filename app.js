require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const { errors } = require("celebrate");
const helmet = require('helmet');
const errorHandler = require("./middleware/error-handler");
const {requestLogger,errorLogger} = require("./middleware/logger");
const limiter = require("./middleware/rate-limiter");

const app = express();

const { PORT = 3001 } = process.env;
const dbURL = process.env.DATABASE_URL;

mongoose.connect(
  "mongodb://127.0.0.1:27017/ArtistHarmonyHub_db",
  (r) => {
    console.log("connected to DB", r);
  },
  (e) => console.log("DB error", e),
);

const routes = require("./routes");

app.use(helmet());
app.use(express.json());
app.use(cors());
app.use(requestLogger);
app.use(limiter);
app.use(routes);
app.use(errorLogger);
app.use(errors());
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
