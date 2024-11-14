/** @format */

const mongoose = require("mongoose");
require("dotenv").config();

exports.dbConnect = () => {
  const dbURI = process.env.MONGO_URI; // Use the MongoDB URI from .env
  console.log("Attempting to connect to:", dbURI);

  mongoose
    .connect(dbURI)
    .then(() => {
      console.log("Db connected successfully");
    })
    .catch((err) => {
      console.error("Error in db connection:", err.message);
    });
};
