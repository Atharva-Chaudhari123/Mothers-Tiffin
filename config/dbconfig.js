const mongoose = require("mongoose");

const connectDB = async (url) => {
  try {
    await mongoose.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 5000, // Timeout after 5 seconds instead of 10 seconds
    });
    console.log("MongoDB connection successful");
  } catch (err) {
    console.error("Error connecting to database:", err.message);
    process.exit(1); // Exit the application if the database connection fails
  }
};

module.exports = { connectDB };
