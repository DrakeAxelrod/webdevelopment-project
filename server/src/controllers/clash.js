const model = require("../models/index");
const validateClash = (req, res, next) => {
  const checkCaseOneExists = (one, clash) => {
    return one === String(clash.one._id) || one === String(clash.two._id);
  };
  const checkCaseTwoExists = (two, clash) => {
    return two === String(clash.one._id) || two === String(clash.two._id);
  };
  const notUnique = (one, two, clash) => {
    const first = checkCaseOneExists(one, clash);
    const second = checkCaseTwoExists(two, clash);
    return first && second;
  };
  const query = model.clash.find({}).exec();
  return query
    .then((clashes) => {
      const one = req.body.one;
      const two = req.body.two;
      let canMake = true;
      clashes.forEach((clash) => {
        if (notUnique(one, two, clash)) {
          canMake = false;
        }
      });
      return canMake;
    })
    .catch((err) => next(err));
};

const create = async (req, res, next) => {
  const canMake = await validateClash(req, res, next);
  if (canMake) {
    const newClash = new model.clash({
      one: req.body.one,
      two: req.body.two,
    });
    newClash.save((err) => {
      if (err) {
        return next(err);
      }
    });
    res.status(201).json(newClash);
  } else {
    res.status(400).json({ message: "not unique" });
  }
};

const read = (req, res, next) => {
  const query = model.clash
    .findById(req.params.id)
    .populate(["one", "two"])
    .exec();
  query
    .then((clash) => {
      res.status(200).json(clash);
    })
    .catch((err) => next(err));
};

const deleteClash = (req, res, next) => {
  const query = model.clash.findByIdAndDelete(req.params.id).exec();
  query
    .then((clash) => {
      res.status(200).json(clash);
    })
    .catch((err) => next(err));
};

const vote = (req, res, next) => {
  const clashId = req.params.id;
  const userId = req.body.userId;
  const clashQuery = model.clash.findById(clashId);
  const userQuery = model.user.findById(userId);
  Promise.all([clashQuery, userQuery])
    .then((results) => {
      const clash = results[0];
      const user = results[1];
      const one = clash.opinge.one;
      const two = clash.opinge.two;
      const vote = req.body.vote;
      const hasVoted =
        one.vote.positive.includes(userId) ||
        one.vote.negative.includes(userId) ||
        two.vote.positive.includes(userId) ||
        two.vote.negative.includes(userId);
      const voteType = hasVoted ? 0 : vote.type;
      if (voteType == 1) {
        if (vote.concept == "one") {
          one.upvote(user);
        } else {
          two.upvote(user);
        }
      } else if (voteType == -1) {
        if (vote.concept == "one") {
          one.downvote(user);
        } else {
          two.downvote(user);
        }
      } else {
        if (vote.concept == "one") {
          one.unvote(user);
        } else {
          two.unvote(user);
        }
      }
      clash.save((err) => {
        if (err) {
          return next(err);
        }
      });
      res.status(200).json({
        votes: {
          one: {
            up: one.upvotes(),
            down: one.downvotes(),
            total: one.upvotes() - one.downvotes(),
          },
          two: {
            up: two.upvotes(),
            down: two.downvotes(),
            total: two.upvotes() - two.downvotes(),
          },
        },
      });
    })
    .catch((err) => next(err));
};

const getVotes = async (req, res, next) => {
  const query = model.clash
    .findById(req.params.id)
    .populate(["one", "two"])
    .exec();
  query
    .then((clash) => {
      const one = clash.opinge.one;
      const two = clash.opinge.two;
      res.status(200).json({
        votes: {
          one: {
            total: one.upvotes() - one.downvotes(),
          },
          two: {
            total: two.upvotes() - two.downvotes(),
          },
        },
      });
    })
    .catch((err) => next(err));
};

const readAll = (req, res, next) => {
  if (req.query.one && req.query.two) {
    const query = model.clash
      .findOne({ one: req.query.one, two: req.query.two })
      .populate(["one", "two"]);
    query
      .then((clash) => {
        res.status(200).json(clash);
      })
      .catch((err) => next(err));
  } else {
    const query = model.clash.find({}).populate(["one", "two"]);
    query
      .then((clash) => {
        res.status(200).json(clash);
      })
      .catch((err) => next(err));
  }
};

const rewrite = async (req, res, next) => {
  const query = model.clash.findById(req.params.id);
  query
    .then((clash) => {
      if (req.body.one) {
        clash.one = req.body.one;
      }
      if (req.body.two) {
        clash.two = req.body.two;
      }
      clash.save((err) => {
        if (err) {
          return next(err);
        }
      });
      res.status(200).json(clash);
    })
    .catch((err) => next(err));
};

const dropClashes = async (req, res, next) => {
  model.clash.collection
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
  create,
  read,
  readAll,
  dropClashes,
  vote,
  getVotes,
  rewrite,
  deleteClash,
};
