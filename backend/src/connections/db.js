const mongoose = require("mongoose");
require("dotenv");

const connectDb = async () => {
  try {
    const connect = await mongoose.connect(process.env.MONGODB_URI);
    console.log(`Connection established at ${connect.connection.host}`);
  } catch (error) {
    console.log("MongoDB connection Error",error);
  }
};

module.exports = connectDb;

