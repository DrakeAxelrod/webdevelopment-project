const mongoose = require("mongoose");
const Comment = require("./comment").schema;
const uniqueValidator = require("mongoose-unique-validator");
const voting = require("mongoose-voting");
const Schema = mongoose.Schema;

const voteSchema = new Schema({})
voteSchema.plugin(voting)

const clashSchema = new Schema({
  one: {
    type: Schema.Types.ObjectId,
    ref: "Concept",
    required: true,
  },
  two: {
    type: Schema.Types.ObjectId,
    ref: "Concept",
    required: true,
  },
  comments: [
    {
      type: Comment,
    },
  ],
  opinge: {
    one: {
      type: voteSchema,
      default: {}
    },
    two: {
      type: voteSchema,
      default: {}
    },
  },
});

clashSchema.plugin(uniqueValidator, { message: "is already created." });

module.exports = mongoose.model("Clash", clashSchema);
