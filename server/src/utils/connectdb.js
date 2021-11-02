const mongoose = require("mongoose");

// Variables
const url = process.env.MONGODB_URI || "mongodb://localhost:27017/AG35";

// Connect to MongoDB
mongoose.connect(
  url,
  { useNewUrlParser: true, useUnifiedTopology: true },
  (err) => {
    if (err) {
      console.error(`Failed to connect to MongoDB with URI: ${url}`);
      console.error(err.stack);
      process.exit(1);
    }
    console.log(`Connected to MongoDB with URI: ${url}`);
  }
);
