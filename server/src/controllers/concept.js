const model = require("../models/index");

const create = (req, res, next) => {
  const reqBody = req.body;
  if (req.body.name) {
    reqBody.name = reqBody.name.toLowerCase();
  } else {
    res.status(400).json({ message: "concepts must have a name" });
  }
  const concept = new model.concept(reqBody);
  concept.save((err) => {
    if (err) {
      return next(err);
    }
  });
  res.status(201).json(concept);
};

// const update =  (req, res, next) => {
//   const updates = req.body;
//   model.concept.findByIdAndUpdate(
//     profileId,
//     { $set: updates },
//     { upsert: true, new: true },
//     (err, updates) => {
//       return err
//         ? res.status(400).json({ message: err.message })
//         : res.status(204).json(updates);
//     }
//   );
// };

const readAll = (req, res, next) => {
  const name = req.query.name;
  if (name) {
    findByName(req, res, next);
  } else {
    const query = model.concept.find({});
    query
      .then((concepts) => {
        res.status(200).json(concepts);
      })
      .catch((err) => next(err));
  }
};

const read = (req, res, next) => {
  const query = model.concept.findById(req.params.id);
  query
    .then((concept) => {
      res.status(200).json(concept);
    })
    .catch((err) => next(err));
};

const findByName = (req, res, next) => {
  const name = req.query.name;
  const query = model.concept.findOne({ name: name });
  query
    .then((concept) => {
      if (concept) {
        res.status(200).json(concept);
      } else {
        res
          .status(404)
          .json({ message: "no concept with that name could be found" });
      }
    })
    .catch((err) => next(err));
};

const rewrite = async (req, res, next) => {
  const query = model.concept.findById(req.params.id);
  query
    .then((concept) => {
      if (req.body.name) {
        concept.name = req.body.name;
      }
      concept.save((err) => {
        if (err) {
          return next(err);
        }
      });
      res.status(200).json(concept);
    })
    .catch((err) => next(err));
};

const remake = async (req, res, next) => {
  const query = model.concept.findById(req.params.id);
  query
    .then((concept) => {
      concept.name = req.body.name;
      concept.content = req.body.content;
      concept.img = req.body.img;
      concept.alt = req.body.alt;
      concept.tags = req.body.tags;
      concept.save((err) => {
        if (err) {
          return next(err);
        }
      });
      res.status(200).json(concept);
    })
    .catch((err) => next(err));
};

module.exports = {
  create,
  read,
  readAll,
  rewrite,
  remake,
};
