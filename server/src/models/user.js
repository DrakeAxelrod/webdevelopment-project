const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");
const Schema = mongoose.Schema;
const passportLocalMongoose = require("passport-local-mongoose");

const mailFormat = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const usernameFormat = /^[a-zA-Z0-9]+$/;

const Session = new Schema({
  refreshToken: {
    type: String,
    default: "",
  },
});

const User = new Schema({
  admin: {
    type: Boolean,
    default: false,
    required: true,
  },
  email: {
    type: String,
    lowercase: true,
    required: true,
    match: [mailFormat, "is invalid"],
    unique: true,
  },
  username: {
    type: String,
    unique: true,
    required: [true, "can't be blank"],
    match: [usernameFormat, "is invalid"],
    index: true,
  },
  profile: {
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
  },
  authStrategy: {
    type: String,
    default: "local",
  },
  refreshToken: {
    type: [Session],
  },
});

//Remove refreshToken from the response
User.set("toJSON", {
  transform: (doc, ret, options) => {
    delete ret.refreshToken;
    return ret;
  },
});

const passValidator = (password, cb) => {
  /* 
  Should contain at least a capital letter
  Should contain at least a small letter
  Should contain at least a number
  Should contain at least a special character
  And minimum length
  */
  let regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*]).{8,}$/;
  if (process.env.NODE_ENV !== "production") {
    regex = /.*/;
  }

  console.log(password);
  if (!password.match(regex)) {
    return cb("Password is n");
  }
  return cb();
};

User.plugin(passportLocalMongoose, {
  usernameField: "email",
  passwordValidator: passValidator,
  errorMessages: {
    UserExistsError: "That email is already registered to an account",
  },
});
User.plugin(uniqueValidator);
module.exports = mongoose.model("User", User);
