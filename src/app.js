const express = require("express");
const app = express();
const port = 8080;
const path = require("path");
const passport = require("passport");
const session = require("express-session");
const mongoose = require("mongoose");
const Config = require("./utils/config.js"); //Configuracion de mongoconst { Strategy } = require("passport-local");
const Usuarios = require("./model/Usuarios.schema.js");
const { Strategy } = require("passport-local");

//MIDDLEWARES
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "../public")));

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
  Usuarios.findOne({ id });
});

//SESSION
app.use(
  session({
    secret: "3fsgdf5",
    cookie: {
      maxAge: 6000,
    },
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());

//SETTINGS
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

//ROUTES
app.use(require("./routes/logs.routes.js"));

app.listen(port, () => {
  mongoose.connect(Config.mongoDB.url, Config.mongoDB.options, (error) => {
    if (error) {
      console.log("Can not connect.", error);
      return error;
    }
    console.log("mongoDB connected!");
  });
  console.log(`Conectado al puerto ${port}!`);
});
