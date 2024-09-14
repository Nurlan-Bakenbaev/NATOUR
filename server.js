const dotenv = require('dotenv');
const mongoose = require('mongoose');

dotenv.config({ path: './config.env' });
const app = require('./index');

const DB = process.env.MONGODB_DATA_BASE;
mongoose.connect(DB).then((con) => {
  console.log(`Connected to DB`);
});

app.listen(`${process.env.PORT}`, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
