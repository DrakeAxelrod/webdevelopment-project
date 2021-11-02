const controllers = require("../controllers/index");
const express = require("express");

const router = express.Router();

router.post("/", controllers.concept.create);
router.get("/:id", controllers.concept.read);
router.put("/:id", controllers.concept.remake);
router.patch("/:id", controllers.concept.rewrite);
router.get("/", controllers.concept.readAll);

router.post("/:id/comments", controllers.comment.create);
router.get("/:id/comments", controllers.comment.readAll);
router.get("/:id/comments/:commentId", controllers.comment.read);
router.delete("/:id/comments/:commentId", controllers.comment.remove);
router.put("/:id/comments/:commentId", controllers.comment.rewrite);

module.exports = router;
