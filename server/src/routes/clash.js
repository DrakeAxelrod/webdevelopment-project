const controllers = require("../controllers/index");
const express = require("express");

const router = express.Router();

router.post("/", controllers.clash.create);
router.get("/", controllers.clash.readAll);
router.put("/:id", controllers.clash.rewrite);
router.delete("/", controllers.clash.dropClashes);
router.delete("/:id", controllers.clash.deleteClash);
router.get("/:id", controllers.clash.read);
router.post("/:id/votes", controllers.clash.vote);
router.get("/:id/votes", controllers.clash.getVotes);

router.post("/:id/comments/", controllers.comment.create);
router.get("/:id/comments/", controllers.comment.readAll);
router.get("/:id/comments/:commentId", controllers.comment.read);
router.delete("/:id/comments/:commentId", controllers.comment.remove);
router.put("/:id/comments/:commentId", controllers.comment.rewrite);

module.exports = router;
