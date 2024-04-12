const mongoose = require("mongoose");

const config = require("config");

const db = config.get("mongoConnectionString");

const connectDB = async () => {
  await mongoose.connect(db).then(() => {});
};
module.exports = connectDB;

const mongoose = require("mongoose");

const config = require("config");

const db = config.get("mongoConnectionString");

const connectDB = async () => {
  await mongoose.connect(db).then(() => {});
};
module.exports = connectDB;