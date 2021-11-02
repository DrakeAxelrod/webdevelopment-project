const passport = require("passport");
const jwt = require("jsonwebtoken");
const isProduction = process.env.NODE_ENV === "production";

exports.COOKIE_OPTIONS = {
  httpOnly: !isProduction, // was true
  // Since localhost is not having https protocol,
  signed: true,
  maxAge: eval(process.env.REFRESH_TOKEN_EXPIRY || 60 * 60 * 24 * 30) * 1000,
  sameSite: "none",
  // secure cookies do not work correctly (in postman)
  secure: isProduction,
};
exports.getToken = (user) => {
  const JWT_SECRET = process.env.JWT_SECRET || "jdhdhd-kjfjdhrhrerj-uurhr-jjge";
  return jwt.sign(user, JWT_SECRET, {
    expiresIn: eval(process.env.SESSION_EXPIRY || 60 * 15),
  });
};

exports.getRefreshToken = (user) => {
  const REFRESH_TOKEN_SECRET =
    process.env.REFRESH_TOKEN_SECRET || "fgkjddshfdjh773bdjsj84-jdjd774";
  return jwt.sign(user, REFRESH_TOKEN_SECRET, {
    expiresIn: eval(process.env.REFRESH_TOKEN_EXPIRY || 60 * 60 * 24 * 30),
  });
};

exports.verifyUser = passport.authenticate("jwt", { session: false });
