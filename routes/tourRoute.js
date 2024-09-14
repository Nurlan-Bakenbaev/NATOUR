const express = require('express');
const {
  postTour,
  getAll,
  getByID,
  updateById,
  deleteById,
  alliasTopTours,
  getTourStats,
  getMonthPlan,
} = require('../controllers/tourControllers');

const tourRouter = express.Router();
tourRouter.route('/stats').get(getTourStats);
tourRouter.route('/mothly-plan/:year').get(getMonthPlan);
tourRouter.route('/top-5-tours').get(alliasTopTours, getAll);
tourRouter.route('/').post(postTour).get(getAll);
tourRouter.route('/:id').get(getByID).patch(updateById).delete(deleteById);
exports.tourRouter = tourRouter;
