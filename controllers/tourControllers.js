const Tour = require('../models/tourModels');

const APIFeatures = require('../utils/apifeatures');

const postTour = async (req, res) => {
  try {
    const newTour = await Tour.create(req.body);
    res.status(201).json({ status: 'success', data: newTour });
  } catch (error) {
    res.status(404).json({ message: error });
  }
};
const alliasTopTours = (req, res, next) => {
  req.query.limit = '5';
  req.query.sort = '-ratingsAverage,price';
  req.query.fields = 'name,price,ratingsAverage.summory,difficulty';
  next();
};
const getAll = async (req, res) => {
  try {
    //Data
    const features = new APIFeatures(Tour.find(), req.query)
      .filter()
      .sort()
      .limitFields()
      .pagination();

    const allTours = await features.query;
    //check data
    if (allTours.length === 0) {
      return res.status(404).json({ status: 'error', data: allTours });
    }
    //Send data
    res
      .status(200)
      .json({ status: 'success', results: allTours.length, data: allTours });
  } catch (error) {
    res.status(404).json({ status: 'error', message: 'Page not found' });
  }
};
const getByID = async (req, res) => {
  try {
    const tour = await Tour.findById(req.params.id);
    res.status(200).json({ status: 'success', data: tour });
  } catch (error) {
    res.status(500).json({ status: 'error', message: 'Tour not found' });
  }
};
const updateById = async (req, res) => {
  try {
    const updatedTour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    res.status(200).json({ status: 'success', data: updatedTour });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error });
  }
};
const deleteById = async (req, res) => {
  try {
    await Tour.findByIdAndDelete(req.params.id);
    res.status(204);
  } catch (error) {
    res.status(500).json({ status: 'error', message: 'Tour not found' });
  }
};

const getTourStats = async (req, res) => {
  try {
    const stats = await Tour.aggregate([
      { $match: { ratingsAverage: { $gte: 4.5 } } },
      {
        $group: {
          _id: '$difficulty',
          numTours: { $sum: 1 },
          numRatings: { $sum: '$ratingQuantity' },
          avgRating: { $avg: '§ratingsAverage' },
          avgPrice: { $avg: '$price' },
          minPrice: { $min: '$price' },
          maxPrice: { $max: '$price' },
        },
      },
      { $sort: { avgPrice: 1 } },
    ]);
    res.status(200).json({ status: 'success', data: stats[0] });
  } catch (error) {
    res
      .status(500)
      .json({ status: 'error', message: 'Failed to calculate stats' });
  }
};

const getMonthPlan = async (req, res) => {
  try {
    const year = req.params.year * 1;
    const plan = await Tour.aggregate([
      {
        $unwind: '$startDates',
      },
      {
        $match: {
          startDates: {
            $gte: new Date(`${year}-01-01`),
            $lte: new Date(`${year}-12-31`),
          },
        },
      },
      {
        $group: {
          _id: { $month: '$startDates' },
          numTourStarts: { $sum: 1 },
          tours: { $push: '$name' },
        },
      },
      {
        $addFields: { month: '$_id' },
      },
      {
        $project: {
          _id: 0,
        },
      },
      {
        $sort: { month: -1 },
      },
    ]);
    res
      .status(200)
      .json({ status: 'success', length: plan.length, data: plan });
  } catch (err) {
    res.status(404).json({ error: err });
  }
};

module.exports = {
  getMonthPlan,
  getTourStats,
  getAll,
  postTour,
  getByID,
  updateById,
  deleteById,
  alliasTopTours,
};
