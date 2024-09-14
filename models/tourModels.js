const mongoose = require('mongoose');

const slugify = require('slugify');

const tourSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'A tour must have a name'],
      unique: true,
      trim: true,
      maxlength: [40, 'The tour must have max name length to 50 characters'],
      minlength: [5, 'The tour must have mix name length to 10 characters'],
    },
    slug: String,
    duration: { type: Number, required: [true, 'A tour must have a duration'] },
    maxGroupSize: {
      type: Number,
      required: [true, 'A tour must have a group size'],
    },
    ratingQuantity: { type: Number, default: 0 },
    difficulty: {
      type: String,
      required: [true, 'A tour must have a difficulty'],
    },
    ratingsAverage: { type: Number, default: 4.5 },
    price: { type: Number, required: [true, 'A tour must have a price'] },
    priceDiscount: Number,
    summary: { type: String, trim: true, required: true },
    description: { type: String, trim: true },
    imageCover: { type: String, required: [true, 'A tour must have an Image'] },
    images: [String],
    createdAt: { type: Date, default: Date.now() },
    startDates: [Date],
    secretTour: {
      type: Boolean,
      default: false,
    },
  },
  { toJSON: { virtuals: true } },
  { toObject: { virtuals: true } },
);
tourSchema.virtual('durationWeeks').get(function () {
  return this.duration / 7;
});
//before command execution .save()  and .create()
tourSchema.pre('save', function (next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});
//before "find" query
tourSchema.pre(/^find/, function (next) {
  this.find({ secretTour: { $ne: true } });
  next();
});

//aggregation middleware
tourSchema.pre('aggregation', function (next) {
  this.pipeline().unshift({ $match: { $ne: true } });
  next();
});

//static method
const Tour = mongoose.model('Tour', tourSchema);
module.exports = Tour;
