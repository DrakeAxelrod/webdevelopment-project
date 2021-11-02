const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Profile = new Schema(
  {
    about: {
      type: String,
      default: "Very interesting human",
    },
    city: {
      type: String,
      default: "never never land",
    },
    title: {
      type: String,
      default: "My Cool titel",
    },
    active: { type: Boolean, default: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Profile", Profile);
