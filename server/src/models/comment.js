const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Comment = new Schema({
  created: {
    type: Date,
    default: Date.now,
  },
  author: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    max: 500,
  },
  uploads: {
    type: Array,
    default: [],
  },
  reactions: {
    type: Array,
    default: [],
  },
  replies: [
    {
      type: Schema.Types.ObjectId,
      ref: "Comment",
    },
  ],
});

module.exports = mongoose.model("Comment", Comment);
