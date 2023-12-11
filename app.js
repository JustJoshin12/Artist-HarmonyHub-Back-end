const express = require("express");
const mongoose = require("mongoose");
const errorHandler = require("./middleware/error-handler");

const app = express();

const { PORT = 3001 } = process.env;

mongoose
  .connect("mongodb://localhost:27017/ArtistHarmonyHub_db", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
  });

const routes = require("./routes");

app.use(express.json());
app.use(routes);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
