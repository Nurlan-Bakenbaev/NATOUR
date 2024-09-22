const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

const app = require("./index");

const DB = process.env.MONGODB_DATA_BASE;

mongoose
  .connect(DB)
  .then(() => {
    console.log("Connected to MongoDB successfully");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err.message);
  });

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
