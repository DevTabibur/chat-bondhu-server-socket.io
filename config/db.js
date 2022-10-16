const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`mongoose connected: ${conn.connection.host}`.cyan.underline)
  } catch (error) {
    console.log(`error: ${error.message}`.red.bold)
  }
};


module.exports = connectDB
