const router = require("express").Router();
const passport = require("passport");
const { Strategy } = require("passport-local");
const Usuarios = require("../model/Usuarios.schema.js");



router.get("/", (req, res) => {
  if (req.session.user) {
    res.render("index", { user: req.session.user });
  } else {
    res.render("login");
  }
});
router.get("/login", (req, res) => {
  if (req.session.user) {
    res.redirect("/");
  } else {
    res.render("login");
  }
});

router.get("/register", (req, res) => {
  res.render("register");
});
router.post("/register", passport.authenticate("register"), (req, res) => {
  const { username } = req.body;
  req.session.user = username;
  res.redirect("/");
});

router.post("/login", passport.authenticate("login"), (req, res) => {
  const { username } = req.body;
  req.session.user = username;
  res.redirect("/");
});

router.get("/logout", (req, res) => {
  req.session.destroy();
  res.redirect("/");
});

module.exports = router;
