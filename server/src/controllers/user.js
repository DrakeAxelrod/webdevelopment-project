const model = require("../models/index");
const jwt = require("jsonwebtoken");
const { verifyUser } = require("../../authenticate");

const {
  getToken,
  COOKIE_OPTIONS,
  getRefreshToken,
} = require("../../authenticate");

const User = model.user;

const refreshToken = (req, res, next) => {
  const signedCookies = req.signedCookies;
  const refreshToken = signedCookies.refreshToken;
  if (refreshToken) {
    try {
      const REFRESH_TOKEN_SECRET =
        process.env.REFRESH_TOKEN_SECRET || "fgkjddshfdjh773bdjsj84-jdjd774";
      const payload = jwt.verify(refreshToken, REFRESH_TOKEN_SECRET);
      const userId = payload._id;
      User.findOne({ _id: userId }).then(
        (user) => {
          if (user) {
            // Find the refresh token against the user record in database
            const tokenIndex = user.refreshToken.findIndex(
              (item) => item.refreshToken === refreshToken
            );

            if (tokenIndex === -1) {
              res.statusCode = 401;
              res.send({
                message: "Unauthorized",
                error: res,
              });
            } else {
              const token = getToken({ _id: userId });
              // If the refresh token exists, then create new one and replace it.
              const newRefreshToken = getRefreshToken({ _id: userId });
              user.refreshToken[tokenIndex] = { refreshToken: newRefreshToken };
              user.save((err, user) => {
                if (err) {
                  res.statusCode = 500;
                  res.send(err);
                } else {
                  res.cookie("refreshToken", newRefreshToken, COOKIE_OPTIONS);
                  res.send({ success: true, token });
                }
              });
            }
          } else {
            res.statusCode = 401;
            res.send("Unauthorized");
          }
        },
        (err) => next(err)
      );
    } catch (err) {
      res.statusCode = 401;
      res.send("Unauthorized");
    }
  } else {
    res.statusCode = 401;
    res.send("Unauthorized");
  }
};

const login = (req, res, next) => {
  const token = getToken({ _id: req.user._id });
  const refreshToken = getRefreshToken({ _id: req.user._id });
  User.findById(req.user._id).then(
    (user) => {
      user.refreshToken.push({ refreshToken });
      user.save((err, user) => {
        if (err) {
          res.statusCode = 500;
          res.send(err);
        } else {
          res.cookie("refreshToken", refreshToken, COOKIE_OPTIONS);
          const context = {
            admin: user.admin,
            id: user._id,
            email: user.email,
            username: user.username,
            profile: user.profile,
          };
          res.send({ success: true, user: context, token });
        }
      });
    },
    (err) => next(err)
  );
};

const logout = (req, res, next) => {
  const { signedCookies = {} } = req;
  const { refreshToken } = signedCookies;
  User.findById(req.user._id).then(
    (user) => {
      const tokenIndex = user.refreshToken.findIndex(
        (item) => item.refreshToken === refreshToken
      );

      if (tokenIndex !== -1) {
        user.refreshToken.id(user.refreshToken[tokenIndex]._id).remove();
      }

      user.save((err, user) => {
        if (err) {
          res.statusCode = 500;
          res.send(err);
        } else {
          res.clearCookie("refreshToken", COOKIE_OPTIONS);
          res.send({ success: true });
        }
      });
    },
    (err) => next(err)
  );
};

const register = (req, res, next) => {
  User.register(
    new User({
      email: req.body.email,
      username: req.body.username,
    }),
    req.body.password,
    (err, user) => {
      if (err) {
        res.statusCode = 500;
        res.send(err);
      } else {
        const token = getToken({ _id: user._id });
        const refreshToken = getRefreshToken({ _id: user._id });
        user.refreshToken.push({ refreshToken });
        user.save((err, user) => {
          if (err) {
            res.statusCode = 500;
            res.send(err);
          } else {
            const context = {
              admin: user.admin,
              id: user._id,
              email: user.email,
              username: user.username,
              profile: user.profile,
            };
            res.cookie("refreshToken", refreshToken, COOKIE_OPTIONS);
            res.status(201).send({ success: true, user: context, token });
          }
        });
      }
    }
  );
};

const readAll = (req, res, next) => {
  const username = req.query.username;
  if (username) {
    findByUsername(req, res, next);
  } else {
    const query = User.find({});
    query
      .then((users) => {
        res.status(200).json(users);
      })
      .catch((err) => next(err));
  }
};

const read = (req, res, next) => {
  const query = User.findById(req.params.id);
  query
    .then((user) => {
      res.status(200).json(user);
    })
    .catch((err) => next(err));
};
const deleteUser = (req, res, next) => {
  const query = User.findByIdAndDelete(req.params.id);
  query
    .then((user) => {
      res.status(200).json(user);
    })
    .catch((err) => next(err));
};

const findByUsername = (req, res, next) => {
  const query = User.findOne({ username: req.query.username });
  query
    .then((user) => {
      if (user) {
        res.status(200).json(user);
      } else {
        res
          .status(404)
          .json({ message: "user with that username does not exist" });
      }
    })
    .catch((err) => next(err));
};

const update = (req, res, next) => {
  console.log(req.params.id);
  const query = User.findById(req.params.id);
  query
    .then((user) => {
      if (req.body.about) {
        user.profile.about = req.body.about;
      }
      if (req.body.city) {
        user.profile.city = req.body.city;
      }
      if (req.body.title) {
        user.profile.title = req.body.title;
      }
      user.save((err) => {
        if (err) {
          return next(err);
        }
      });
      res.status(200).json(user.profile);
    })
    .catch((err) => next(err));
};

const dropUsers = async (req, res, next) => {
  model.user.collection
    .drop()
    .then(() => {
      res.status(200).json({ success: true });
    })
    .catch((err) => {
      if (err) {
        res.status(410).json({ message: "database is already empty" });
      }
    });
};

module.exports = {
  refreshToken,
  register,
  login,
  logout,
  readAll,
  read,
  update,
  dropUsers,
  deleteUser,
};
