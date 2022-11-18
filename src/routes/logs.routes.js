const router = require("express").Router();
const session = require("express-session");
const path = require("path");

router.get("/", (req, res) => {
  if (req.session.isUser) {
    console.log(req.session.isUser);
    res.render("index", { user: req.session.isUser });
  } else {
    res.render("login");
  }
});

router.post("/login", (req, res) => {
  const { user } = req.body;
  req.session.isUser = user;
  res.redirect("/");
});

router.get("/logout", (req, res) => {
  req.session.destroy();
  res.redirect("/");
});

module.exports = router;
