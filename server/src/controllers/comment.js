const model = require("../models/index");

const findPathToComments = (req, res, next) => {
  if (req.baseUrl === "/api/concepts")
    return model.concept.findById(req.params.id).populate("comments", "author");
  if (req.baseUrl === "/api/clashes")
    return model.clash.findById(req.params.id).populate("comments", "author");
  return res
    .status(404)
    .json({ message: "you are not a search for a clash or a concept" });
};

const create = (req, res, next) => {
  const query = findPathToComments(req, res, next);
  query
    .then((obj) => {
      const newComment = new model.comment({
        author: req.body.author,
        content: req.body.content,
      });
      obj.comments.push(newComment);
      obj.save((err) => {
        if (err) {
          return next(err);
        }
        res.status(201).json(newComment);
      });
    })
    .catch(() => {
      res
        .status(400)
        .json({ message: "request body or path is incorrectly formatted" });
    });
};

const read = (req, res, next) => {
  const commentId = req.params.commentId;
  const query = findPathToComments(req, res, next);
  query
    .then((obj) => {
      const comment = obj.comments.id(commentId);
      res.status(200).json(comment);
    })
    .catch((err) => next(err));
};

const readAll = async (req, res, next) => {
  const query = findPathToComments(req, res, next);
  query
    .then((obj) => {
      res.status(200).json(obj.comments);
    })
    .catch((err) => next(err));
};

const remove = async (req, res, next) => {
  const commentId = req.params.commentId;
  const query = findPathToComments(req, res, next);
  query
    .then((obj) => {
      const comment = obj.comments.remove(commentId);
      obj.save((err) => {
        if (err) {
          return next(err);
        }
      });
      res.status(200).json(comment);
    })
    .catch((err) => next(err));
};

const rewrite = async (req, res, next) => {
  const commentId = req.params.commentId;
  const query = findPathToComments(req, res, next);
  query
    .then((obj) => {
      const comment = obj.comments.id(commentId);
      if (req.body.content !== "" || req.body.content !== comment.content) {
        comment.content = req.body.content;
        comment.author = req.body.author;
      } else {
        res.status(304).json({ message: "no change" });
      }
      obj.save((err) => {
        if (err) {
          return next(err);
        }
      });
      res.status(200).json(comment);
    })
    .catch((err) => next(err));
};

module.exports = {
  create,
  read,
  readAll,
  remove,
  rewrite,
};
