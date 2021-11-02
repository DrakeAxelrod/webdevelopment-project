const mongoose = require("mongoose");

// // Variables
// const mongoURI = process.env.MONGODB_URI || "mongodb://localhost:27017/AG35";

// // Connect to MongoDB
// mongoose.connect(
//   mongoURI,
//   { useNewUrlParser: true, useUnifiedTopology: true },
//   (err) => {
//     if (err) {
//       console.error(`Failed to connect to MongoDB with URI: ${mongoURI}`);
//       console.error(err.stack);
//       process.exit(1);
//     }
//     console.log(`Connected to MongoDB with URI: ${mongoURI}`);
//   }
// );

module.exports = {
  user: require("./user"),
  concept: require("./concept"),
  clash: require("./clash"),
  comment: require("./comment"),
  profile: require("./profile")
};
