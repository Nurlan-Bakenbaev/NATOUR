const express = require('express');
const {
  postTour,
  getAll,
  getByID,
  updateById,
  deleteById,
} = require('./controllers/tourControllers');
const {
  getAllUsers,
  createUser,
  getUser,
  updateUser,
  deleteUser,
} = require('./controllers/userControllers');
const app = express();
const { tourRouter } = require('./routes/tourRoute');

//MIDDLEWARE
app.use(express.json());

//ROUTES
app.post('/api/tours', postTour);
app.use('/api/tours', tourRouter);
app.use('/api/tours/:id', tourRouter);
app.use('/api/tours/:id', tourRouter);
app.use('/api/tours/:id', tourRouter);


// USERS
app.get('/api/users', getAllUsers);
app.post('/api/users', createUser);
app.get('/api/users/:id', getUser);
app.patch('/api/users/:id', updateUser);
app.delete('/api/users/:id', deleteUser);

module.exports = app;
