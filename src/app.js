const express = require("express");
const app = express();
const port = 8080;
const path = require("path");
const passport = require("passport");
const session = require("express-session");
const mongoose = require("mongoose");
const Config = require("./utils/config.js"); //Configuracion de mongoconst 


//MIDDLEWARES
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "../public")));

//SESSION
app.use(
  session({
    secret: "?topsecret_",
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
