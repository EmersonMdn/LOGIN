const router = require("express").Router();
const passport = require("passport");
const Usuarios = require("../model/Usuarios.schema.js");
const { Strategy } = require("passport-local");
const bcrypt = require("bcryptjs");

//VERIFICAR QUE SE HAYA INICIADO SESION
const authMW = (req, res, next) => {
  req.isAuthenticated() ? next() : res.redirect("/login");
};
//ENCRIPTADO DE CONTRASEÑA CON bcrypt
const encryptPassword = (pass) => {
  return bcrypt.hashSync(pass, 9);
};
//COMPARAR QUE AMBAS CONTRASEÑAS COINCIDAN
const comparePassword = (pass1, pass2) => {
  return bcrypt.compareSync(pass1, pass2);
};

////////* PASSPORT /////////////

passport.use(
  "register",
  new Strategy({ passReqToCallback: true }, (req, username, password, done) => {
    const { email } = req.body;
    Usuarios.findOne({ username }, (err, usuario) => {
      if (usuario) return done(null, false);

      Usuarios.create(
        //CREACION DE USUARIO
        { username, password: encryptPassword(password), email },
        (err, usuario) => {
          if (err) return done(err);
          return done(null, usuario);
        }
      );
    });
  })
);

passport.use(
  "login",
  new Strategy({}, (username, password, done) => {
    Usuarios.findOne({ username }, (err, usuario) => {
      if (err) return done(err);
      if (!usuario) return done(null, false);
      if (!comparePassword(password, usuario.password))
        return done(null, false);
      done(null, usuario);
    });
  })
);

passport.serializeUser((usuario, done) => {
  done(null, usuario._id);
});

passport.deserializeUser((id, done) => {
  Usuarios.findById(id, done);
});

//////////* RUTAS ////////////

router.get("/", authMW, (req, res) => {
  res.render("index", { user: req.user.username });
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
