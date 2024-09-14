const fs = require('fs');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

const Tour = require('../../models/tourModels');

dotenv.config({ path: './config.env' });

const DB = process.env.MONGODB_DATA_BASE;

mongoose.connect(DB).then(() => console.log('connected'));

//read file
const tours = fs.readFileSync(`${__dirname}/tours-simple.json`, 'utf-8');
//import to DB
const importData = async () => {
  try {
    await Tour.create(JSON.parse(tours));
    console.log('Data imported successfully');
    process.exit();
  } catch (error) {
    console.error(error);
  }
};
//delete all data
const deleteData = async () => {
  try {
    await Tour.deleteMany();
    console.log('Data deleted successfully');
    process.exit();
  } catch (error) {
    console.error(error);
  }
};

if (process.argv[2] === '--import') {
  importData();
} else {
  deleteData();
}
