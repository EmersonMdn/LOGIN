const express = require("express");
const app = express();
const port = process.env.PORT || 8080;
const path = require("path");
const session = require("express-session");
const mongoose = require("mongoose");
const Config = require("./utils/config.js"); //Configuracion de mongodb
const passport = require("passport");

//MIDDLEWARES
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "../public")));

//SESSION
app.use(
  session({
    secret: "?topsecret_",
    cookie: {
      maxAge: 60000,
    },
    resave: true,
    saveUninitialized: false,
  })
);

app.use(passport.initialize());
app.use(passport.session());

//SETTINGS
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs"); // ejs como plantilla a utilizar

//ROUTES
app.use(require("./routes/logs.routes.js"));

app.listen(port, () => {
  mongoose.connect(Config.mongoDB.url, Config.mongoDB.options, (error) => {
    //CONEXION CON MONGO
    if (error) {
      console.log("Can not connect.", error);
      return error;
    }
    console.log("mongoDB connected!");
  });
  console.log(`Conectado al puerto ${port}!`);
});
