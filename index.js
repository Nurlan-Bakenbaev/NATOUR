const express = require("express");
const { postTour } = require("./controllers/tourControllers");
const {
  getAllUsers,
  createUser,
  getUser,
  updateUser,
  deleteUser,
} = require("./controllers/userControllers");
const app = express();
const { tourRouter } = require("./routes/tourRoute");

//MIDDLEWARE
app.use(express.json());

//ROUTES
app.post("/api/tours", postTour);
app.use("/api/tours", tourRouter);
app.use("/api/tours/:id", tourRouter);
app.use("/api/tours/:id", tourRouter);
app.use("/api/tours/:id", tourRouter);

// USERS
app.get("/api/users", getAllUsers);
app.post("/api/users", createUser);
app.get("/api/users/:id", getUser);
app.patch("/api/users/:id", updateUser);
app.delete("/api/users/:id", deleteUser);

//  на случай ошибки QUERRY

app.all("*", (req, res, next) => {
  const error = new Error(`Page ${req.originalUrl} not found!`);
  error.status = "fail";
  error.statusCode = 404;
  next(error);
});

app.use((err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";
  res.status(err.statusCode).json({ status: err.status, message: err.message }); // Response sent again here
});
module.exports = app;
