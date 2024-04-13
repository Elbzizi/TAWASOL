const mongoose = require("mongoose");

const config = require("config");

const db = config.get("mongoConnectionString");

const connectDB = async () => {
  try {
    await mongoose.connect(db);
    console.log("connecte to database successfuly");
  } catch (error) {
    console.log(error.message);
  }
};
module.exports = connectDB;
