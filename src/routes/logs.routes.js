const router = require("express").Router();
const passport = require("passport");
const Usuarios = require("../model/Usuarios.schema.js");
const { Strategy } = require("passport-local");
const bcrypt = require("bcryptjs");

const authMW = (req, res, next) => {
  req.isAuthenticated() ? next() : res.redirect("/login");
};

passport.use(
  "register",
  new Strategy({ passReqToCallback: true }, (req, username, password, done) => {
    const { email } = req.body;
    const passwordBcrypt = bcrypt.hashSync(password, 9); // Encrypt password
    Usuarios.findOne({ username }, (err, usuario) => {
      if (usuario) return done(null, false);

      Usuarios.create({ username, passwordBcrypt, email }, (err, usuario) => {
        if (err) return done(err);
        return done(null, usuario);
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

passport.serializeUser((usuario, done) => {
  done(null, usuario._id);
});

passport.deserializeUser((id, done) => {
  Usuarios.findOne({ id, done });
});

router.get("/", authMW, (req, res) => {
  res.render("index", { user: req.usuario });
});
router.get("/login", (req, res) => {
  res.render("login");
});

router.get("/register", (req, res) => {
  res.render("register");
});
router.post(
  "/register",
  passport.authenticate("register", { failureRedirect: "/error" }),
  (req, res) => {
    res.redirect("/");
  }
);

router.post(
  "/login",
  passport.authenticate("login", { failureRedirect: "/error" }),
  (req, res) => {
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
