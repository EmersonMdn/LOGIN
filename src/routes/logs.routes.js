const router = require("express").Router();
const passport = require("passport");
const Usuarios = require("../model/Usuarios.schema.js");
const { Strategy } = require("passport-local");

passport.use(
  "register",
  new Strategy({ passReqToCallback: true }, (req, username, password, done) => {
    const { email } = req.body;
    Usuarios.findOne({ username }, (err, user) => {
      if (user) return done(null, false);

      Usuarios.create({ username, password, email }, (err, usuarios) => {
        if (err) return done(err);
        console.log("creado");
        return done(null, usuarios);
      });
    });
  })
);

passport.use(
  "login",
  new Strategy({}, (username, password, done) => {
    Usuarios.findOne({ username, password }, (err, usuario) => {
      if (err) return done(err);
      if (!usuario) return done(null, false);
      done(null, usuario);
    });
  })
);

passport.serializeUser((user, done) => {
  done(null, user._id);
});

passport.deserializeUser((id, done) => {
  Usuarios.findOne({ id, done });
});

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
router.post(
  "/register",
  passport.authenticate("register", { failureRedirect: "/error" }),
  (req, res) => {
    const { username } = req.body;
    req.session.user = username;
    res.redirect("/");
  }
);

router.post(
  "/login",
  passport.authenticate("login", { failureRedirect: "/error" }),
  (req, res) => {
    const { username } = req.body;
    req.session.user = username;
    res.redirect("/");
  }
);

router.get("/logout", (req, res) => {
  req.session.destroy();
  res.redirect("/");
});

router.get("/error", (req, res) => {
  res.render("error");
});

module.exports = router;
