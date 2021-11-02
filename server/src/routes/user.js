const express = require("express");
const router = express.Router();
const controller = require("../controllers/index");
const passport = require("passport");
const { verifyUser } = require("../../authenticate");

router.get("/me", verifyUser, (req, res, next) => res.send(req.user));
router.post("/refreshToken", controller.user.refreshToken);
router.post("/login", passport.authenticate("local"), controller.user.login);
router.get("/logout", verifyUser, controller.user.logout);
router.post("/register", controller.user.register);
router.get("/:id", controller.user.read);
router.get("/", controller.user.readAll);
router.patch("/:id", controller.user.update);
router.delete("/", controller.user.dropUsers);
router.delete("/:id", controller.user.deleteUser);

module.exports = router;
