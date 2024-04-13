const mongoose = require("mongoose");

const config = require("config");

const db = config.get("mongoConnectionString");

const connectDB = async () => {
  await mongoose.connect(db);
  console.log("connecte to database successfuly");
};
module.exports = connectDB;
