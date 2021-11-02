const mongoose = require("mongoose");
const Comment = require("./comment").schema;
const uniqueValidator = require("mongoose-unique-validator");

const Schema = mongoose.Schema;

const conceptSchema = new Schema({
  name: {
    type: String,
    required: [true, `can't be blank`],
    match: [/[a-z]*/, "is invalid"],
    unique: true,
  },
  content: {
    type: String,
  },
  img: {
    type: String,
  },
  alt: {
    type: String,
  },
  tags: {
    type: [{ type: String }],
  },
  comments: [{ type: Comment }],
});

conceptSchema.plugin(uniqueValidator, { message: "is already created." });

module.exports = mongoose.model("Concept", conceptSchema);
